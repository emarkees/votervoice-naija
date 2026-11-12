import React from 'react';
import Link from 'next/link';
import PhoneSimulator from '@/components/PhoneSimulator';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-6xl mx-auto">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#008751] inline-block animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008751]">
              #AI4Elections Hackathon • Track 3
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mt-1 tracking-tight">
            VoterVoice Naija
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Inclusive, Multilingual &amp; Offline-Resilient Civic Technology for All Nigerians
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://ai4elections.risenetworks.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold bg-[#E0F2FE] text-[#0369A1] px-3.5 py-2 rounded-xl hover:bg-[#BAE6FD] transition-colors"
          >
            Hackathon Portal &rarr;
          </a>
        </div>
      </header>

      {/* Main Interactive Demo Section */}
      <section className="py-8">
        <PhoneSimulator />
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
        <div>
          &copy; 2026 VoterVoice Naija. Built for the #AI4Elections Initiative (Rise Networks &amp; Partners).
        </div>
        <div className="flex gap-4">
          <span>Zero-Internet Telephony</span>
          <span>•</span>
          <span>Hausa / Yoruba / Igbo / Pidgin</span>
          <span>•</span>
          <span>PWD Assistive Tech</span>
        </div>
      </footer>
    </main>
  );
}

