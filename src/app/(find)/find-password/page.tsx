import React from 'react';
import FindForm from '../_components/FindForm';

const FindPasswordPage = () => {
  return (
    <div className='max-w-96 mx-auto my-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>비밀번호 찾기</h2>
      <p>가입하신 이메일을 입력하시면 비밀번호 변경을 위한 메일을 발송해드리겠습니다.</p>
      <FindForm />
    </div>
  );
};

export default FindPasswordPage;
