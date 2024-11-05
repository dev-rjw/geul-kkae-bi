// 임의의 닉네임을 생성
export function randomNickname() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nicknameLength = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
  let nickname = '';

  for (let i = 0; i < nicknameLength; i++) {
    nickname += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return nickname;
}
