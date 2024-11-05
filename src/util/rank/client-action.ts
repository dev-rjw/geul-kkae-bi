import { createClient } from '../supabase/client';

// 랭킹 가져오기
export const fetchUserRank = async (user_id: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('rank').select('*').eq('user_id', user_id).single();

  return data;
};
