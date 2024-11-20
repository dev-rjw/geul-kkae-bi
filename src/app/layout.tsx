import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import QueryProvider from '@/utils/QueryProvider';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import KakaoScript from './KakaoScript';
import Header from '@/components/Header';
import { Suspense } from 'react';

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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
  description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
  openGraph: {
    title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
    description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
    url: 'https://geul-kkae-bi.com/',
    images: [
      {
        url: '/og_image.jpg',
        width: 800,
        height: 400,
        alt: '글깨비',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
    description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
    images: '/og_image.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang='ko'>
        <body
          className={`${pretendard.variable} ${yangjin.variable} font-pretendard antialiased flex flex-col min-h-screen overflow-x-hidden bg-secondary-50 text-gray-800`}
        >
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          <Suspense>
            <Header />
          </Suspense>
          <main className='grow'>{children}</main>
          <div id='global-modal' />
        </body>
        <KakaoScript />
      </html>
    </QueryProvider>
  );
}
