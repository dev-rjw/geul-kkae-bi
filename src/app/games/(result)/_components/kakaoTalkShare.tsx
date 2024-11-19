'use client';

const kakaoTalkShare = () => {
  const { Kakao, location } = window;
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '글깨비 - 한국인을 위한 한국어 발음&맞춤법 공부',
      description: '성인과 중/고등학생을 위한 한국어 학습 도구! 어휘력, 문해력 향상을 위한 최고의 선택!',
      imageUrl: '/og_image.jpg',
      link: {
        mobileWebUrl: location.href + '/share/url',
        webUrl: location.href + '/share/url',
      },
    },
  });
};

export default kakaoTalkShare;
