import React from 'react';
import Header from './Header';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className='grow'>{children}</main>
    </>
  );
};

export default Layout;
