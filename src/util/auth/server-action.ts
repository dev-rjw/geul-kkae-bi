import { createClient } from '../supabase/server';

// 현재 사용자 조회
export const fetchCurrentUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error(error);
    return null;
  }

  return user;
};

// 이메일 중복확인
// export const checkEmailExists = async (email: string) => {
//   const supabase = createServerComponentSupabaseClient({ cookies });
//   const {
//     data: { users },
//     error,
//   } = await supabase.auth.admin.listUsers();

//   if (error) {
//     throw new Error('이메일 조회에 실패했습니다.');
//   }

//   return users.some((user) => user.email === email);
// };
