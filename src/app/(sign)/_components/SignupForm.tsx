'use client';

import { useRouter } from 'next/navigation';
import { signup } from '@/utils/auth/client-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { translateErrorMessage } from '@/schemas/commonSchema';
import { signupSchema } from '@/schemas/signSchema';
import PasswordInput from '@/components/PasswordInput';
import Swal from 'sweetalert2';
import PasswordValidationInput from '@/components/PasswordValidationInput';
import DefaultButton from '@/components/DefaultButton';
import EmailInput from '@/components/EmailInput';
import DefaultInput from '@/components/DefaultInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { addScoresRank } from '@/utils/rank/client-action';
import { AuthError } from '@supabase/supabase-js';

const SignupForm = () => {
  const router = useRouter();

  // 유효성 검사
  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    agreeToTerms: false,
  };

  const getLocalStorageValues = () => {
    if (typeof window !== 'undefined') {
      const checking = localStorage.getItem('checking') ? Number(localStorage.getItem('checking')) : 0;
      const speaking = localStorage.getItem('speaking') ? Number(localStorage.getItem('speaking')) : 0;
      const writing = localStorage.getItem('writing') ? Number(localStorage.getItem('writing')) : 0;

      return { checking, speaking, writing };
    }

    // 기본값을 반환하여 컴파일 에러를 방지
    return { checking: 0, speaking: 0, writing: 0 };
  };

  const form = useForm<z.infer<typeof signupSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues,
  });
  const { getFieldState, watch } = form;
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = async (values: FieldValues) => {
    const { email, password, nickname } = values;
    const { checking, speaking, writing } = getLocalStorageValues();

    const result = await signup({
      email,
      password,
      options: {
        data: {
          nickname,
          image: `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/profile/default_img.png`,
        },
      },
    });

    // 에러 체크
    if (result instanceof AuthError || !result.user) {
      Swal.fire(
        translateErrorMessage(result instanceof AuthError ? result.message : '알 수 없는 오류가 발생했습니다.'),
      );
      return;
    }

    const userId = result.user.id;
    const total = checking + speaking + writing;
    // week 계산
    const startSeason = new Date(2024, 9, 27);
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;
    const week = weekNumber;

    await addScoresRank({ userId, checking, speaking, writing, total, week });

    // 점수 저장 후 로컬스토리지 데이터 삭제
    localStorage.removeItem('checking');
    localStorage.removeItem('speaking');
    localStorage.removeItem('writing');

    // 페이지 이동
    router.push('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='form-items'>
          <div className='form-item'>
            <div className='form-label'>
              <div className='form-title'>
                아이디
                <span className='form-dot' />
              </div>
            </div>
            <div className='form-field'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <EmailInput
                        field={field}
                        domainOptions={['gmail.com', 'naver.com', '직접 입력']}
                      />
                    </FormControl>
                    <FormMessage className='text-sm font-bold' />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='form-item'>
            <div className='form-label'>
              <div className='form-title'>
                닉네임
                <span className='form-dot' />
              </div>
            </div>
            <div className='form-field'>
              <FormField
                control={form.control}
                name='nickname'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DefaultInput
                        type='text'
                        placeholder='사용하실 닉네임'
                        {...field}
                      />
                    </FormControl>
                    {!getFieldState('nickname').invalid && field.value ? (
                      <FormMessage className='text-primary-400'>사용 가능한 닉네임입니다.</FormMessage>
                    ) : (
                      <FormMessage className='text-sm font-bold' />
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='form-item'>
            <div className='form-label'>
              <div className='form-title'>
                비밀번호
                <span className='form-dot' />
              </div>
            </div>
            <div className='form-field'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordValidationInput
                        placeholder='비밀번호'
                        field={field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='form-item'>
            <div className='form-label'>
              <div className='form-title'>
                비밀번호 확인
                <span className='form-dot' />
              </div>
            </div>
            <div className='form-field'>
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder='비밀번호 확인'
                        field={field}
                      />
                    </FormControl>
                    {(passwordValue === confirmPasswordValue || !getFieldState('confirmPassword').invalid) &&
                    passwordValue !== '' &&
                    field.value !== '' ? (
                      <div className='caption-14 text-primary-400'>비밀번호가 일치합니다.</div>
                    ) : (
                      <FormMessage className='text-sm font-bold' />
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className='mt-[2.5rem]'>
          <FormField
            control={form.control}
            name='agreeToTerms'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center gap-2 mb-4'>
                    <Checkbox
                      id='agreeToTerms'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor='agreeToTerms'
                      className='body-20 text-gray-400 cursor-pointer'
                    >
                      <span className='text-gray-900'>[필수]</span> 글깨비 이용약관 동의
                    </label>
                  </div>
                </FormControl>
                <FormMessage className='text-sm font-bold' />
                <ScrollArea className='h-[10rem] w-full rounded-lg py-5 px-6 bg-[#F2F2F2]'>
                  <div className='caption-14 text-gray-400'>
                    제1장 총칙
                    <br />
                    제1조 (목적)이 약관은 글깨비 (이하 &quot;회사&quot;)가 온라인으로 제공하는 국어 문해력 테스트 및
                    이에 부수된 제반 서비스(이하 &quot;테스트 서비스&quot;)의 이용과 관련하여 회사와 회원 간의 권리,
                    의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                    <br />
                    <br />
                    제2조 (용어의 정의)① 이 약관에서 사용하는 정의는 다음과 같습니다.
                    <br />
                    &quot;회사&quot;라 함은 온라인을 통하여 테스트 서비스를 제공하는 글깨비를 의미합니다.
                    <br />
                    &quot;회원&quot;이라 함은 본 약관에 동의하고 테스트 서비스 이용 자격을 부여받은 자를 의미합니다.
                    <br />
                    &quot;테스트 서비스&quot;라 함은 회사가 회원에게 온라인으로 제공하는 국어 문해력 테스트 및 이에
                    부수된 제반 서비스를 의미합니다.
                    <br />
                    &quot;문해력 테스트&quot;라 함은 회원이 국어 문해력을 평가하기 위해 참여하는 테스트를 의미합니다.
                    <br />
                    &quot;계정(ID)&quot;이라 함은 회원의 식별과 테스트 서비스 이용을 위하여 회원이 선정하고 회사가
                    부여하는 문자, 숫자 또는 특수문자의 조합을 의미합니다.
                    <br />
                    &quot;계정정보&quot;라 함은 회원의 계정, 비밀번호, 성명 등 회원이 회사에 제공한 일반정보 및 테스트
                    이용정보, 이용 요금 결제상태 등 생성정보를 통칭합니다.
                    <br />
                    &quot;결과물&quot;이라 함은 회원이 테스트에 참여한 후 생성되는 평가 결과 및 관련 정보를 의미합니다.
                    <br />
                    &quot;비밀번호&quot;라 함은 회원이 부여받은 계정과 일치되는 회원임을 확인하고 회원의 정보 및 권익
                    보호를 위해 회원 자신이 선정하여 비밀로 관리하는 문자, 숫자 또는 특수문자의 조합을 의미합니다.
                    <br />
                    &quot;게시물&quot;이라 함은 회원이 서비스를 이용함에 있어 회원이 게시한 문자, 문서, 그림, 음성, 영상
                    또는 이들의 조합으로 이루어진 모든 정보를 말합니다.
                    <br />
                    &quot;로그인&quot;이라 함은 회원이 등록한 계정정보를 입력하여 테스트 서비스에 접근하는 것을
                    의미합니다.
                    <br />
                    &quot;간편 회원가입&quot;이라 함은 구글 또는 카카오 계정을 이용하여 신속하게 회원가입을 완료하는
                    절차를 의미합니다.
                    <br />
                    &quot;마이 페이지&quot;라 함은 회원이 자신의 프로필을 설정하고 정보를 수정할 수 있는 개인화된
                    페이지를 의미합니다.
                    <br />
                    &quot;랭킹 페이지&quot;라 함은 회원의 문해력 테스트 결과에 기반한 순위를 확인할 수 있는 페이지를
                    의미합니다.
                    <br />
                    ② 이 약관에서 사용하는 용어의 정의는 제1항 각호에서 정하는 것을 제외하고는 관계법령 및 기타 일반적인
                    상관례에 의합니다.
                    <br />
                    <br />
                    제2장 회원가입 및 이용
                    <br />
                    제1조 (회원가입)
                    <br />
                    회원가입은 로그인, 구글과 카카오를 통한 간편 회원가입, 이메일 회원가입의 방법으로 이루어질 수
                    있습니다.
                    <br />
                    회원가입을 희망하는 자는 본 약관에 동의하고 회사가 요구하는 정보(이메일 주소, 비밀번호 등)를
                    제공해야 합니다.
                    <br />
                    제2조 (테스트 서비스 이용)
                    <br />
                    회원은 회사가 제공하는 3가지 게임(주어진 문장 읽기, 틀린 것 맞추기, 빈 칸 채우기)에 참여할 수
                    있습니다.
                    <br />
                    각 게임의 이용방법 및 규칙은 회사가 별도로 정한 내용에 따라야 합니다.
                    <br />
                    제3조 (마이 페이지 및 랭킹 페이지)
                    <br />
                    회원은 마이 페이지를 통해 자신의 프로필을 설정하고 정보를 수정할 수 있습니다.
                    <br />
                    회원은 랭킹 페이지에서 자신의 문해력 테스트 결과에 따른 순위를 확인할 수 있습니다.
                  </div>
                </ScrollArea>
              </FormItem>
            )}
          />
        </div>
        <hr className='border-t-1 border-gray-200 mt-[3.125rem]' />
        <div className='flex justify-center mt-14'>
          <DefaultButton className='w-full max-w-[15rem]'>확인</DefaultButton>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
