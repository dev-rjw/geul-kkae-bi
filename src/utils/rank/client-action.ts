import { createClient } from '../supabase/client';

// 랭킹 가져오기
export const fetchUserRank = async (user_id: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('rank').select('*').eq('user_id', user_id).single();

  return data;
};

// 랭킹 TOP 3
// TODO: week 2로 고정시키면 안됨
export const fetchRank3 = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from('rank')
    .select(`*, user(nickname)`)
    .eq('week', 2)
    .gte('total', 0)
    .order('total', { ascending: false })
    .limit(3);

  return data;
};
