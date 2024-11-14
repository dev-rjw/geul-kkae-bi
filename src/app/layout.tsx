import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import QueryProvider from '@/utils/QueryProvider';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

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
  title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
  description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
  openGraph: {
    title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
    description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
    url: 'https://geul-kkae-bi.vercel.app',
    images: [
      {
        url: '/og-image.jpg',
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
    images: '/og-image.jpg',
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
          className={`${pretendard.variable} ${yangjin.variable} font-pretendard antialiased flex flex-col min-h-screen bg-secondary-50`}
        >
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          {children}
          <div id='global-modal' />
        </body>
      </html>
    </QueryProvider>
  );
}
