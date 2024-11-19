'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/queries/useAuth';

const MainRankViewAllButton = () => {
  const { data: user } = useAuth();

  return (
    <>
      {user?.id && (
        <Link
          className='inline-flex items-center text-sm font-bold text-gray-500'
          href='/games/rank'
        >
          전체보기
          <ChevronRight className='w-4 h-4 text-gray-600' />
        </Link>
      )}
    </>
  );
};

export default MainRankViewAllButton;
