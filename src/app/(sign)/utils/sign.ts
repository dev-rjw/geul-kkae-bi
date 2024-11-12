// 랜덤 닉네임 생성
export function randomNickname() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nicknameLength = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
  const nickname = new Array(nicknameLength)
    .fill(0)
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('');

  return nickname;
}

// 로컬스토리지에 저장된 점수 가져오기
export const getLocalStorageValues = () => {
  if (typeof window !== 'undefined') {
    const checking = localStorage.getItem('checking') !== null ? Number(localStorage.getItem('checking')) : null;
    const speaking = localStorage.getItem('speaking') !== null ? Number(localStorage.getItem('speaking')) : null;
    const writing = localStorage.getItem('writing') !== null ? Number(localStorage.getItem('writing')) : null;

    return { checking, speaking, writing };
  }

  // 기본값 반환하여 컴파일 에러 방지
  return { checking: null, speaking: null, writing: null };
};

// 리다이렉션 주소
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // 이를 프로덕션 환경의 사이트 URL로 설정합니다.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Vercel에 의해 자동으로 설정됩니다.
    'http://localhost:3000/';
  // localhost가 아닌 경우 `https://`를 포함해야 합니다.
  url = url.startsWith('http') ? url : `https://${url}`;
  // 후행 `/`를 포함해야 합니다.
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
};
