'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DefaultButton from '@/components/DefaultButton';
import { UserRound } from 'lucide-react';
import Link from 'next/link';

const Tabs = () => {
  const path = usePathname();
  const [activeTab, setActiveTab] = useState(path === '/mypage/information' ? '프로필 변경' : '비밀번호 변경');
  const router = useRouter();

  const moveTabs = (name: string, url: string) => {
    setActiveTab(name);
    router.push(url);
  };

  return (
    <div>
      <div className='pb-14 max-md:pb-7'>
        <div className='flex items-center justify-between border-b border-gray-200'>
          <div>
            <button
              onClick={() => moveTabs('프로필 변경', '/mypage/information')}
              className={`inline-flex items-center h-16 px-6 py-[0.625rem] -mb-[1px] body-24 text-gray-400 hover:bg-gray-100 transition-colors max-md:h-[2.375rem] max-md:p-[0.625rem] max-md:text-sm max-md:font-medium ${
                activeTab === '프로필 변경' && ' border-b-4 border-primary-400 text-gray-700 max-md:border-b-2'
              }`}
            >
              프로필 변경
            </button>
            <button
              onClick={() => moveTabs('비밀번호 변경', '/mypage/change-password')}
              className={`inline-flex items-center h-16 px-6 py-[0.625rem] -mb-[1px] body-24 text-gray-400 hover:bg-gray-100 transition-colors max-md:h-[2.375rem] max-md:p-[0.625rem] max-md:text-sm max-md:font-medium ${
                activeTab === '비밀번호 변경' && ' border-b-4 border-primary-400 text-gray-700 max-md:border-b-2'
              }`}
            >
              비밀번호 변경
            </button>
          </div>

          <DefaultButton
            asChild
            size='sm'
            className='max-md:hidden'
          >
            <Link href='/mypage'>
              <UserRound />
              마이 페이지
            </Link>
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
