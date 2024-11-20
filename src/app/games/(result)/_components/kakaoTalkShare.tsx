'use client';

const kakaoTalkShare = (key: string, score: string, nickname: string) => {
  const { Kakao } = window;
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
      description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
      imageUrl: 'https://sfdcyhvieqruoagzezzv.supabase.co/storage/v1/object/public/icon/224_224.png',
      link: {
        mobileWebUrl: `https://geul-kkae-bi.com/share/url?key=${key}&score=${score}&nickname=${nickname}`,
        webUrl: `https://geul-kkae-bi.com/share/url?key=${key}&score=${score}&nickname=${nickname}`,
      },
    },
  });
};

export default kakaoTalkShare;
