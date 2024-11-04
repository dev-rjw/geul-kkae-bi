import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import QueryProvider from '@/utils/QueryProvider';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const yangjin = localFont({
  src: './fonts/yangjin.woff2',
  display: 'swap',
  weight: '400',
  variable: '--font-yangjin',
});

export const metadata: Metadata = {
  title: '글깨비',
  description: '글깨비',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang='en'>
        <body
          className={`${pretendard.variable} ${yangjin.variable} font-pretendard antialiased flex flex-col min-h-screen`}
        >
          <main className='grow'>{children}</main>
        </body>
      </html>
    </QueryProvider>
  );
}
