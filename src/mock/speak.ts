const TextData = [
  '강장공장 공장장과 장장공장 공장장',
  '백 번 뺨을 맞아도 밥 한 번 먹는 것이 낫다',
  '갑판 위에 있는 갑판장 갑옷을 입는다',
  '청평 촌장 천 촌장님',
  '서산 서쪽 석양에 서른 서낙지를 사러 가요',
  '우유를 유리잔에 따르면 우유잔',
  '철수는 철창을 청소하러 철창으로 간다',
  '장수 장사가 장장 장사를 한다',
  '사장님 사랑해요, 사랑은 사장님의 사정이죠',
  '송송 썰어 소금을 쏟지 말고 소담하게 썰어라',
  '산삼 산에 살면 삼산 산삼 산다',
  '종종 종종걸음 치며 종이를 주워 종로로 가다',
  '기러기 기러기 날개 기리듯 기리다',
  '북쪽 벽장에 박쥐가 박혀 있다',
  '평평한 평야에 피어난 파란 파란 꽃',
  '우리 집 앞 우체국에 우편함이 없어요',
  '달달한 달고나를 달달하게 먹는다',
  '긴긴 겨울밤에 긴 고드름이 길게 매달린다',
  '김밥을 김으로 감싸서 김밥이 됐다',
  '장작 장군이 장작을 잘 자른다',
  '바닷가 바위 밑에서 바람이 분다',
  '삼삼한 삼색 솜사탕을 사서 삼삼하게 먹는다',
  '술집 술장수가 술을 술술 따른다',
  '김칫국을 김칫국그릇에 담아라',
  '차차차 타고 차차를 타고 차이나로',
  '칠판에 분필로 칠판장을 그린다',
  '달달한 달달함이 달려오네',
  '하얀 한라산에 한라봉 한 상자',
  '벌떡 일어난 벌꿀벌이 벌꿀을 벌레에 준다',
  '청천벽력처럼 철수는 천천히 청소한다',
  '천장에 천천히 창문을 연다',
  '나뭇잎이 나무에서 나뭇가지에 붙어 있다',
  '불가사리를 불쏘시개로 쓴다',
  '시계바늘이 시침과 분침을 따라 돈다',
  '동네 당나귀가 당나귀 타고 당당히 지나간다',
  '지구를 지구인들이 지켜야 한다',
  '핑핑 돌아가는 팽이 팽이 돌듯 돈다',
  '배고픈 배고양이 배불리 밥을 먹다',
  '초콜릿 초코칩 쿠키를 초코숍에서 산다',
  '추운 추위에 처녀가 처량히 춤을 춘다',
  '코끼리 코끝이 코끼리 꼬리를 감는다',
  '푸른 풀이 풀밭에서 풀려난다',
  '눈이 오면 눈사람을 눈처럼 만든다',
  '밤하늘에 별빛이 반짝반짝 빛난다',
  '고양이가 곶감 먹고 골골골',
  '물방울이 물병에서 똑똑 떨어진다',
  '바람이 불어오면 바람개비가 돈다',
  '뚱뚱한 뚱이뚱이가 뚱뚱뚱 걸어간다',
  '바나나가 바나나무에서 바나나처럼 맺힌다',
  '동동 뜨는 동전이 동전통에 담긴다',
  '앵앵거리는 앵무새가 앵앵앵 소리친다',
  '기차가 기찻길을 따라 기차처럼 간다',
  '달걀을 달걀판에 담아 달걀같이 놓는다',
  '두더지가 두더지굴에서 두더지답게 움직인다',
  '나비가 나비꽃에 날개를 펼친다',
  '물개가 물속에서 물처럼 유영한다',
  '징징거리는 징이 징소리같이 울린다',
  '뱀이 뱀굴에서 뱀처럼 스르륵 나간다',
  '쌀을 씻어서 쌀밥을 쌀밥그릇에 담는다',
  '눈을 감고 눈사람을 눈처럼 만든다',
  '주전자에서 주전자가 끓는다',
  '감자튀김을 감자전처럼 튀긴다',
  '고추장이 고추처럼 매콤하다',
  '시계가 시계처럼 시침을 돌린다',
  '가랑비가 가로수 아래로 가볍게 내린다',
  '숲속에서 새들이 새소리를 낸다',
  '모래사장에서 모래성을 쌓는다',
  '빨간 토마토가 빨갛게 익어간다',
  '장미꽃이 장미향을 내뿜는다',
  '풀숲에서 파리들이 파닥거린다',
  '나무에서 나비가 날개짓을 한다',
  '바람이 바람처럼 부는 날 바람개비를 돌린다',
  '작은 집에서 작은 새가 지저귄다',
  '비가 내리면 비옷을 입고 비를 맞는다',
  '개미가 개미굴에서 개미같이 일한다',
  '달빛이 달처럼 환하게 비춘다',
  '마당에 마당쇠가 마당을 쓸고 간다',
  '거북이가 거북이처럼 느릿느릿 간다',
  '아침이 밝으면 아침햇살이 비친다',
  '돌고래가 돌고래처럼 물속에서 놀다',
  '배가 부른 배꼽이 배꼽처럼 튀어나왔다',
  '장난감 기차가 장난감 선로를 따라 돈다',
  '병아리가 병아리처럼 삐약거린다',
  '가위가 가위처럼 종이를 자른다',
  '노을이 노을처럼 하늘에 붉게 번진다',
  '파도가 파도처럼 바닷가에 밀려온다',
  '모닥불이 모닥불처럼 타오른다',
  '구름이 구름처럼 하늘에 둥둥 뜬다',
  '얼음이 얼음처럼 차가워졌다',
  '새벽이 오면 새벽하늘에 별이 사라진다',
  '구슬이 구슬통에서 구르듯 떨어진다',
  '동화책이 동화처럼 재미있게 읽힌다',
  '바람소리가 바람처럼 속삭인다',
  '강물이 강줄기를 따라 흐른다',
  '뱀장어가 뱀장어처럼 미끄덩거린다',
  '하늘이 하늘처럼 푸르게 열린다',
  '가로수가 가로수 길에 줄지어 서 있다',
  '창문을 열면 창밖으로 찬바람이 들어온다',
  '쌀알이 쌀처럼 하얗게 빛난다',
  '자전거가 자전거길을 따라 달린다',
];

export default TextData;
