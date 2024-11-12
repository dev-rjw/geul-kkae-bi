import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS 옵션 요청에 대한 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  try {
    // Authorization 헤더에서 사용자 인증 정보를 가져옵니다.
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return res.status(401).json({ error: '권한 헤더가 없습니다' });
    }

    // Supabase 클라이언트를 생성합니다.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authorization },
      },
    });

    // 인증된 사용자의 정보를 가져옵니다.
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return res.status(401).json({ error: '사용자가 인증되지 않았습니다' });
    }

    // 회원 정보를 가져옵니다.
    const { data: profiles, error: profileError } = await supabaseClient
      .from('user')
      .select('id, image')
      .eq('user_id', user.id)
      .single();
    if (profileError || !profiles) {
      return res.status(400).json({ error: '회원을 찾을 수 없습니다' });
    }

    const userId = profiles.id;
    const userAvatar = profiles.image;
    const defaultImage = 'default_img.webp';

    // Supabase 관리 클라이언트 (서비스 역할 키 사용)
    const supabaseAdmin = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!);

    // 프로필 이미지 삭제 (기본 이미지 제외)
    if (userAvatar && !userAvatar.includes(defaultImage)) {
      const { data: avatarDeletion, error: avatarError } = await supabaseAdmin.storage
        .from('profile')
        .remove([userAvatar]);
      if (avatarError) {
        return res.status(500).json({ error: avatarError.message });
      }
      console.log('프로필 이미지 삭제: ', avatarDeletion);
    }

    // 회원 삭제
    const { data: deletionData, error: deletionError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deletionError) {
      return res.status(500).json({ error: deletionError.message });
    }

    console.log('회원 삭제: ', deletionData);

    // 성공적으로 삭제된 경우
    return res.status(200).json({ message: '회원 및 프로필 이미지 삭제됨', data: deletionData });
  } catch (error) {
    console.error('회원 삭제 중 오류 발생: ', error);
    return res.status(500).json({ error: error });
  }
}
