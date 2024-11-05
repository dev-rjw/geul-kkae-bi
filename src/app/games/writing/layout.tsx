import NoLayout from '@/components/NoLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NoLayout>{children}</NoLayout>;
}
