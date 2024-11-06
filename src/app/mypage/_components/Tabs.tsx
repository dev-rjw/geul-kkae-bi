'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
      <div className='p-6'>
        <div className='flex border-b border-gray-300'>
          <button
            onClick={() => moveTabs('프로필 변경', '/mypage/information')}
            className={`px-4 py-2 text-gray-600 ${
              activeTab === '프로필 변경' ? 'border-b-2 border-blue-500 font-semibold text-gray-800' : 'hover:underline'
            }`}
          >
            프로필 변경
          </button>
          <button
            onClick={() => moveTabs('비밀번호 변경', '/mypage/change-password')}
            className={`px-4 py-2 text-gray-600 ${
              activeTab === '비밀번호 변경'
                ? 'border-b-2 border-blue-500 font-semibold text-gray-800'
                : 'hover:underline'
            }`}
          >
            비밀번호 변경
          </button>
          <button
            className='ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            onClick={() => router.push('/mypage')}
          >
            <span
              role='img'
              aria-label='search'
            >
              🔍
            </span>
            마이 페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
