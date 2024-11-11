// 랜덤 닉네임 생성
export function randomNickname() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nicknameLength = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
  const nickname = new Array(nicknameLength)
    .fill(0)
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join();

  return nickname;
}

// 로컬스토리지에 저장된 점수 가져오기
export const getLocalStorageValues = () => {
  if (typeof window !== 'undefined') {
    const checking = localStorage.getItem('checking') ? Number(localStorage.getItem('checking')) : 0;
    const speaking = localStorage.getItem('speaking') ? Number(localStorage.getItem('speaking')) : 0;
    const writing = localStorage.getItem('writing') ? Number(localStorage.getItem('writing')) : 0;

    return { checking, speaking, writing };
  }

  // 기본값 반환하여 컴파일 에러 방지
  return { checking: 0, speaking: 0, writing: 0 };
};
