import React from 'react';

const NoLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className='grow'>{children}</main>;
};

export default NoLayout;
