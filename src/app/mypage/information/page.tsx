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
      <div className='flex flex-col items-center p-8 bg-gray-50 min-h-screen'>
        {/* 프로필 이미지 업로드 */}
        <div className='relative'>
          {user?.image && (
            <Image
              src={user?.image}
              width={240}
              height={240}
              alt='Profile'
              className='w-60 h-60 rounded-full object-cover'
            />
          )}
          <button
            className='absolute top-0 right-0 w-11 h-11 bg-blue-500 p-2 rounded-full shadow-md'
            onClick={() =>
              setImg('https://sfdcyhvieqruoagzezzv.supabase.co/storage/v1/object/public/profile/default_img.png')
            }
          >
            <span className='text-2xl font-bold text-white'>×</span>
          </button>
        </div>

        <Input
          id='picture'
          type='file'
          className='hidden'
          onChange={(e) => uploadImgHandler(e)}
        />
        <label
          htmlFor='picture'
          className='flex mt-4 bg-gray-200 text-sm text-gray-600 py-1 px-3 rounded-md cursor-pointer'
        >
          사진 업로드 <Camera />
        </label>
        <p className='text-gray-400 text-xs mt-1'>
          사진은 240px X 240px 이상,
          <br /> PNG or JPG 파일로 업로드해주세요
        </p>

        {/* 닉네임 입력 */}
        <div className='mt-8 w-full max-w-md'>
          <label className='text-gray-700'>닉네임</label>
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
        <div className='mt-4 w-full max-w-md'>
          <label className='text-gray-700'>한줄소개</label>
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
          className='mt-8 bg-blue-500 text-white py-2 px-4 rounded-md'
          onClick={() => updatehandler(user!)}
        >
          버튼
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProfileEdit;
