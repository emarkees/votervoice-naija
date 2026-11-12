'use client';

import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Volume2, Globe, ShieldCheck, HelpCircle } from 'lucide-react';

interface USSDState {
  active: boolean;
  screenText: string;
  sessionStage: 'root' | 'language_selected' | 'pu_lookup' | 'ballot_guide' | 'legal_rights' | 'pwd_guide';
  selectedLang: string;
}

export default function PhoneSimulator() {
  const [dialedNumber, setDialedNumber] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [audioPrompt, setAudioPrompt] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [ussd, setUssd] = useState<USSDState>({
    active: false,
    screenText: '',
    sessionStage: 'root',
    selectedLang: 'English',
  });

  // Call timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  // Web Speech API Voice synthesis helper
  const speakText = (text: string, lang = 'en-US') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (num: string) => {
    if (ussd.active) {
      setInputVal((prev) => prev + num);
    } else if (callActive) {
      handleVoiceDTMF(num);
    } else {
      setDialedNumber((prev) => prev + num);
    }
  };

  const handleClear = () => {
    if (ussd.active) {
      setInputVal((prev) => prev.slice(0, -1));
    } else {
      setDialedNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleCall = () => {
    const trimmed = dialedNumber.trim();
    if (trimmed === '*384*24#' || trimmed === '*384#' || trimmed === '*24#') {
      // Start USSD session
      setUssd({
        active: true,
        sessionStage: 'root',
        selectedLang: 'English',
        screenText:
          'Welcome to VoterVoice Naija:\nSelect Language:\n1. Hausa\n2. Yoruba\n3. Igbo\n4. Pidgin\n5. English',
      });
      setInputVal('');
    } else if (trimmed === '0800' || trimmed.startsWith('0800') || trimmed === '123') {
      // Start IVR Voice Call
      setCallActive(true);
      const welcome =
        'Welcome to VoterVoice Naija Toll-Free Electoral Information. Barka da zuwa. E kaabo. Nno. Press 1 for Hausa, 2 for Yoruba, 3 for Igbo, 4 for Pidgin, 5 for English.';
      setAudioPrompt(welcome);
      speakText(welcome);
    } else {
      // Fallback hint
      setDialedNumber('*384*24#');
    }
  };

  const handleEndCall = () => {
    setCallActive(false);
    setUssd({
      active: false,
      screenText: '',
      sessionStage: 'root',
      selectedLang: 'English',
    });
    setAudioPrompt('');
    setInputVal('');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // USSD Menu State Machine
  const handleUssdSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const choice = inputVal.trim();
    setInputVal('');

    if (ussd.sessionStage === 'root') {
      let lang = 'English';
      let menuText = '';
      if (choice === '1') {
        lang = 'Hausa';
        menuText =
          'VoterVoice Hausa:\n1. Nemi Rumfar Zabe (Find PU)\n2. Yadda Ake Kada Kuri\'a (Ballot Guide)\n3. Dokar BVAS & Karfe 2:30 (Legal Rights)\n4. Taimakon PWD\n0. Koma Baya';
      } else if (choice === '2') {
        lang = 'Yoruba';
        menuText =
          'VoterVoice Yoruba:\n1. Wa Ibuso Idibo (Find PU)\n2. Bi a se n d\'ibo (Ballot Guide)\n3. Eto BVAS & Ago 2:30 (Legal Rights)\n4. Eto PWD\n0. Pada Seyin';
      } else if (choice === '3') {
        lang = 'Igbo';
        menuText =
          'VoterVoice Igbo:\n1. Chọta Ebe Ime Ndi (Find PU)\n2. Otu Esi Atụ Vootu (Ballot Guide)\n3. Iwu BVAS & Elekere 2:30 (Legal Rights)\n4. Nkwado PWD\n0. Laghachi';
      } else if (choice === '4') {
        lang = 'Pidgin';
        menuText =
          'VoterVoice Pidgin:\n1. Find Polling Unit\n2. How to Vote & Fold Ballot\n3. BVAS & 2:30 PM Law\n4. PWD Support\n0. Go Back';
      } else {
        lang = 'English';
        menuText =
          'VoterVoice English:\n1. Find Polling Unit\n2. Ballot Marking & Fold Guide\n3. BVAS & 2:30 PM Cutoff Right\n4. PWD Assistance\n0. Back';
      }
      setUssd({
        active: true,
        sessionStage: 'language_selected',
        selectedLang: lang,
        screenText: menuText,
      });
    } else if (ussd.sessionStage === 'language_selected') {
      if (choice === '1') {
        // Find Polling Unit
        setUssd((prev) => ({
          ...prev,
          sessionStage: 'pu_lookup',
          screenText:
            'POLLING UNIT LOOKUP:\nYour PU is: Ward 03, Polling Unit 008, Community Primary School.\nAccreditation: 8:30AM - 2:30PM.\nPress 0 to Back or # to Exit.',
        }));
      } else if (choice === '2') {
        // Ballot guide / Inward Vertical fold
        setUssd((prev) => ({
          ...prev,
          sessionStage: 'ballot_guide',
          screenText:
            'BALLOT FOLDING RULE:\n1. Thumbprint inside ONE party box only.\n2. Apply the INWARD VERTICAL FOLD (length-wise).\n3. Prevents ink smudging into another candidate box!\nPress 0 to Back.',
        }));
      } else if (choice === '3') {
        // Legal rights / BVAS
        setUssd((prev) => ({
          ...prev,
          sessionStage: 'legal_rights',
          screenText:
            'YOUR ELECTORAL RIGHTS:\n• Sec 56: If in queue by 2:30PM, you MUST be allowed to vote!\n• Sec 47: Insist on BVAS facial capture if fingerprint fails.\n• Sec 60: Wait for open PU count.\nPress 0 to Back.',
        }));
      } else if (choice === '4') {
        // PWD Support
        setUssd((prev) => ({
          ...prev,
          sessionStage: 'pwd_guide',
          screenText:
            'PWD ASSISTIVE GUIDE:\n• Priority queuing for elderly, nursing mothers & PWDs.\n• Form EC30PWD has pictorial guides for Deaf voters.\n• Blind voters have tactile guidance rights.\nPress 0 to Back.',
        }));
      } else if (choice === '0') {
        setUssd({
          active: true,
          sessionStage: 'root',
          selectedLang: 'English',
          screenText:
            'Welcome to VoterVoice Naija:\nSelect Language:\n1. Hausa\n2. Yoruba\n3. Igbo\n4. Pidgin\n5. English',
        });
      }
    } else {
      if (choice === '0') {
        setUssd({
          active: true,
          sessionStage: 'root',
          selectedLang: 'English',
          screenText:
            'Welcome to VoterVoice Naija:\nSelect Language:\n1. Hausa\n2. Yoruba\n3. Igbo\n4. Pidgin\n5. English',
        });
      } else {
        handleEndCall();
      }
    }
  };

  // IVR Voice DTMF Handler
  const handleVoiceDTMF = (digit: string) => {
    let response = '';
    if (digit === '1') {
      response =
        'Barka da zuwa VoterVoice Hausa. Don Allah a lura: a zabi dan takara daya kacal, sannan a ninke takardar kada kuri\'a a tsaye domin kiyaye bata kuri\'a. Kowa da ke kan layi kafin karfe biyu da rabi na rana yana da ikon kada kuri\'a.';
    } else if (digit === '2') {
      response =
        'E kaabo si VoterVoice Yoruba. E te ika si apoti egbe oselu kan soso. E kapa iwe ibo ni inaro lati d\'ena omi inki lati ba ibo je. Gbogbo eniyan ti o ba wa lori ila saaju ago meji abo osan ni eto lati dibo.';
    } else if (digit === '3') {
      response =
        'Nno na VoterVoice Igbo. Biko tinye mkpịsị aka gị n\'otu igbe nke pati ị chọrọ. Pịaji akwụkwọ vootu gị n\'ogologo ka ink wee ghara imetụ pati ọzọ. Onye ọ bụla nọ n\'ahịrị tupu elekere abụọ na ọkara nke ehihie nwere ikike ịtụ vootu.';
    } else if (digit === '4') {
      response =
        'Welcome to VoterVoice Naija Pidgin. Make sure say you thumbprint inside only one party box. Fold your ballot paper straight vertically make the wet ink no go touch another candidate box. If you dey queue by 2:30 PM, dem must allow you vote!';
    } else {
      response =
        'VoterVoice English Guide: Always fold your ballot paper vertically inward so that wet indelible ink does not smear onto an opposing candidate\'s box. Under Section 56 of the Electoral Act 2022, every voter in the queue by 2:30 PM must be accredited and allowed to vote.';
    }
    setAudioPrompt(response);
    speakText(response);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-4 max-w-5xl mx-auto">
      {/* 2G Feature Phone Hardware Shell */}
      <div className="w-[310px] bg-[#1E293B] rounded-[42px] p-4 shadow-2xl border-4 border-[#334155] relative">
        {/* Speaker grill */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-1.5 bg-[#475569] rounded-full"></div>
        </div>

        {/* LCD Screen Container */}
        <div className="bg-[#8FA882] border-4 border-[#0F172A] rounded-xl p-3 min-h-[175px] max-h-[175px] overflow-y-auto font-mono text-[#0F172A] shadow-inner text-xs leading-relaxed flex flex-col justify-between">
          {ussd.active ? (
            <div className="flex flex-col h-full justify-between">
              <div className="whitespace-pre-line font-bold">{ussd.screenText}</div>
              <form onSubmit={handleUssdSubmit} className="mt-2 flex gap-1 items-center border-t border-[#68825C] pt-1">
                <span className="text-[10px] font-bold">&gt;</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="reply..."
                  className="bg-transparent border-none outline-none text-xs font-mono font-bold w-full text-[#0F172A]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#0F172A] text-[#8FA882] px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                >
                  Send
                </button>
              </form>
            </div>
          ) : callActive ? (
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center text-[10px] border-b border-[#68825C] pb-1">
                  <span className="font-bold flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#0F172A] animate-pulse" />
                    CONNECTED (IVR)
                  </span>
                  <span>{Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="text-[11px] font-bold mt-2 text-[#0F172A] leading-tight">
                  {audioPrompt || 'Listening... Press 1-5 on keypad for language'}
                </div>
              </div>
              <div className="text-[10px] text-[#2C4A20] font-bold text-center mt-2 bg-[#7D9970] p-1 rounded">
                Press [1]Hausa [2]Yoruba [3]Igbo [4]Pidgin
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between text-[10px] border-b border-[#68825C] pb-1 font-bold">
                <span>MTN / GLO NG</span>
                <span>2G ●●●</span>
              </div>
              <div className="my-auto text-center">
                {dialedNumber ? (
                  <div className="text-sm font-bold tracking-wider break-all">{dialedNumber}</div>
                ) : (
                  <div>
                    <div className="font-extrabold text-sm tracking-wide text-[#0A3D18]">VOTERVOICE NAIJA</div>
                    <div className="text-[10px] text-[#24421A] mt-1">Dial *384*24# (USSD) or 0800 (Voice)</div>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-[9px] font-bold border-t border-[#68825C] pt-1">
                <span>Menu</span>
                <span>Names</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls (Call / End / Clear) */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <button
            onClick={handleCall}
            className="bg-[#008751] hover:bg-[#0A5A38] text-white p-2.5 rounded-lg flex items-center justify-center font-bold text-xs shadow"
            title="Dial Number / Start USSD"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="bg-[#334155] hover:bg-[#475569] text-white p-2.5 rounded-lg font-bold text-xs shadow flex items-center justify-center"
          >
            CLEAR
          </button>
          <button
            onClick={handleEndCall}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white p-2.5 rounded-lg flex items-center justify-center font-bold text-xs shadow"
            title="End Call / Close Session"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>

        {/* 12-Key Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: '1', sub: '.,' },
            { key: '2', sub: 'ABC' },
            { key: '3', sub: 'DEF' },
            { key: '4', sub: 'GHI' },
            { key: '5', sub: 'JKL' },
            { key: '6', sub: 'MNO' },
            { key: '7', sub: 'PQRS' },
            { key: '8', sub: 'TUV' },
            { key: '9', sub: 'WXYZ' },
            { key: '*', sub: 'USSD' },
            { key: '0', sub: '+' },
            { key: '#', sub: 'SEND' },
          ].map(({ key, sub }) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="bg-[#334155] hover:bg-[#475569] active:bg-[#64748B] text-white py-2 px-1 rounded-lg text-center shadow transition-all duration-75"
            >
              <div className="font-bold text-sm leading-none">{key}</div>
              <div className="text-[8px] text-gray-300 tracking-tighter mt-0.5">{sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Guide Panel Alongside Phone */}
      <div className="flex-1 max-w-md bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#DCFCE7] text-[#008751] font-bold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
            Live 2G Simulator
          </span>
          <span className="bg-[#FEF3C7] text-[#D97706] font-bold text-xs px-2.5 py-1 rounded-full">
            Zero Internet Needed
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">
          Test the Feature-Phone Experience
        </h3>
        <p className="text-xs text-[#475569] mb-4 leading-relaxed">
          This on-screen emulator replicates what millions of rural citizens in Sokoto, Ebonyi, Ondo, and Bayelsa experience on basic button phones with zero mobile data.
        </p>

        {/* Quick Dial Action Pills */}
        <div className="space-y-2 mb-4">
          <button
            onClick={() => {
              setDialedNumber('*384*24#');
              setUssd({
                active: true,
                sessionStage: 'root',
                selectedLang: 'English',
                screenText:
                  'Welcome to VoterVoice Naija:\nSelect Language:\n1. Hausa\n2. Yoruba\n3. Igbo\n4. Pidgin\n5. English',
              });
            }}
            className="w-full text-left bg-[#F1F5F9] hover:bg-[#E2E8F0] p-2.5 rounded-xl border border-gray-200 flex items-center justify-between transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Dial *384*24# (USSD Fast-Track)</div>
              <div className="text-[11px] text-[#64748B]">Simulate text menus on 2G feature phones</div>
            </div>
            <span className="text-xs font-bold text-[#008751]">Launch &rarr;</span>
          </button>

          <button
            onClick={() => {
              setDialedNumber('0800');
              setCallActive(true);
              const welcome =
                'Welcome to VoterVoice Naija. Press 1 for Hausa, 2 for Yoruba, 3 for Igbo, 4 for Pidgin.';
              setAudioPrompt(welcome);
              speakText(welcome);
            }}
            className="w-full text-left bg-[#F0FDF4] hover:bg-[#DCFCE7] p-2.5 rounded-xl border border-[#86EFAC] flex items-center justify-between transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-[#0A5A38]">Call 0800-VOTE-NG (Voice Call / IVR)</div>
              <div className="text-[11px] text-[#15803D]">Hear speech AI spoken in your native dialect</div>
            </div>
            <span className="text-xs font-bold text-[#008751]">Call &rarr;</span>
          </button>
        </div>

        {/* Electoral Protection Highlights */}
        <div className="bg-[#FAFBF9] border border-gray-200 rounded-xl p-3 text-xs space-y-1.5 text-[#334155]">
          <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#008751]" />
            What this simulator demonstrates:
          </div>
          <div>• <b>Valid Ballot Folding:</b> Vernacular guidance on the "Inward Vertical Fold" to eliminate ink smudge disqualifications.</div>
          <div>• <b>BVAS Statutory Defense:</b> Section 47 facial recognition rights when fingerprints fail.</div>
          <div>• <b>Queue Protection:</b> Section 56 guarantee ensuring voters in queue by 2:30 PM are accredited.</div>
        </div>
      </div>
    </div>
  );
}

