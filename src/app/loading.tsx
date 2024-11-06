import React from 'react';
import { Loader2 } from 'lucide-react';

const loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Loader2 className='mr-2 h-12 w-12 animate-spin text-primary-400' />
    </div>
  );
};

export default loading;
