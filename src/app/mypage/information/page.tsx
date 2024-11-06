'use client';
import { useAuth } from '@/queries/useAuth';
import { fetchCurrentUserInfo, fetchProfile, saveProfile, updateUserInfo } from '@/utils/user/client-action';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Tabs from '../_components/Tabs';

export type User = {
  user_id: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  email: string;
  created_at: string;
};

const ProfileEdit = () => {
  const [user, setUser] = useState<User>();
  const [img, setImg] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const { data } = useAuth();
  const router = useRouter();

  if (data === null) {
    router.push('/');
  }

  useEffect(() => {
    if (data) {
      const email = data?.user_metadata.email;
      fetchCurrentUserInfo(email).then((elemant) => setUser(elemant));
    }
  }, [data]);

  useEffect(() => {
    setUser({ ...user!, nickname });
  }, [nickname]);
  useEffect(() => {
    setUser({ ...user!, introduction });
  }, [introduction]);
  useEffect(() => {
    setUser({ ...user!, image: img });
  }, [img]);

  const updatehandler = (user: User) => {
    updateUserInfo(user.user_id, user.image, user.nickname, user.introduction);
    router.push('/mypage');
  };

  const uploadImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = await saveProfile(file!);
    const fullpath = await fetchProfile(name.toString());
    setImg(fullpath.publicUrl);
  };

  return (
    <>
      <Header />
      <Tabs />
      <div className='flex flex-col p-8 bg-gray-50 min-h-screen'>
        {/* 프로필 이미지 업로드 */}
        <div className='relative flex'>
          {user?.image && (
            <Image
              src={user?.image}
              width={176}
              height={176}
              alt='Profile'
              className='w-44 h-44 ml-[100px] rounded-full object-cover'
            />
          )}
          <button
            className='top-0 right-0 w-8 h-8 bg-[#649CED] ml-[-40px] rounded-full shadow-md'
            onClick={() =>
              setImg('https://sfdcyhvieqruoagzezzv.supabase.co/storage/v1/object/public/profile/default_img.png')
            }
          >
            <span className='text-2xl text-white'>×</span>
          </button>

          <Input
            id='picture'
            type='file'
            className='hidden'
            onChange={(e) => uploadImgHandler(e)}
          />
          <label
            htmlFor='picture'
            className='h-[2.688rem] w-[115px] mt-4 ml-[50px] border-2 text-sm text-gray-600 py-1 px-3 rounded-xl cursor-pointer'
          >
            <div className='flex'>
              사진 업로드 <Camera />
            </div>
          </label>
          <p className='mt-[80px] ml-[-110px] text-gray-400 text-xs'>
            사진은 240px X 240px 이상,
            <br /> PNG or JPG 파일로 업로드해주세요
          </p>
        </div>

        <hr className='mt-10' />

        {/* 닉네임 입력 */}
        <div className='flex mt-8 w-full max-w-md ml-[100px]'>
          <label className='text-gray-700  mr-[115px] mt-3'>닉네임</label>
          <div className='flex items-center mt-1'>
            <input
              type='text'
              className='flex-1 border border-gray-300 rounded-md p-2'
              value={user?.nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        {/* 한줄소개 입력 */}
        <div className='flex mt-4 w-full max-w-md ml-[100px]'>
          <label className='text-gray-700 mr-[100px] mt-3'>한줄소개</label>
          <div className='flex items-center mt-1'>
            <input
              type='text'
              className='flex-1 border border-gray-300 rounded-md p-2'
              value={user?.introduction?.trim()}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          className='mt-8 bg-blue-500 text-white py-2 px-4 rounded-md w-[20%] self-center'
          onClick={() => updatehandler(user!)}
        >
          저장하기
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProfileEdit;
