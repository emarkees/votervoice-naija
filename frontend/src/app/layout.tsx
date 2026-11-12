import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoterVoice Naija | Inclusive & Multilingual Civic Technology',
  description:
    'Bridging Nigeria\'s democratic divide with zero data telephony (USSD & IVR), conversational speech AI in Hausa, Yoruba, Igbo & Pidgin, and PWD assistive tools.',
  keywords: [
    'AI4Elections',
    'Nigeria Elections',
    'Civic Tech',
    'USSD',
    'IVR',
    'Hausa',
    'Yoruba',
    'Igbo',
    'Pidgin',
    'PWD Accessibility',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFBF9] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
