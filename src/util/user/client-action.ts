import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

// user_id로 게시글 정보 조회
export async function getPostByUserId(userId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(nickname, profile_img)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }

  return data;
}