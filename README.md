# 글깨비

## 👨‍👩‍👧‍👦 팀 소개

### 금오갤(Gold쪽이 Of Galaxy)

## 👨‍👩‍👧‍👦 팀원 소개

|   류지원   |      조아영      |        김진우         |      이보영      |     임기철     |    권현정    |    조애리    |
| :--------: | :--------------: | :-------------------: | :--------------: | :------------: | :----------: | :----------: |
|  **리더**  |    **부리더**    |       **팀원**        |     **팀원**     |    **팀원**    | **디자이너** | **디자이너** |
| 메인페이지 | 회원가입, 로그인 | 게임(wrting,checking) | 결과, 랭킹페이지 | 게임(speaking) |    디자인    |    디자인    |

## 👨‍🏫 프로젝트 소개

## 한국인을 위한 한국어 발음&맞춤법 공부 사이트

2030세대 문해력 논란을 있는 요즘 그들을 위한 맞춤법과 발음을 공부 할 수 있고 재밌게 접근하고자 게임적 요소도 들어간 사이트 입니다.

## 🚩 프로젝트 개요

- **프로젝트명** &nbsp; :&nbsp; **글깨비**
- **진행 기간** &nbsp;: &nbsp; **24.10.18 ~ 24.11.21**

- ## 📚 STACKS

<div align=Left>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/git actions-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/VERCEL-007ACC?style=for-the-badge&logo=VERCEL&logoColor=white">
<img src="https://img.shields.io/badge/SLACK-green?style=for-the-badge&logo=SLACK&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=for-the-badge&logo=java&logoColor=white">
</div>

## 설치 패키지

- 프로젝트 세팅 : npx create-next-app@latest
  - 실행 : pnpm dev
- tanstack query 설치 : pnpm add @tanstack/react-query @tanstack/react-query-devtools

## 🗂️ 기능 설명

#### 메인 페이지

- 메인 페이지
  기술 : 각 게임 별로 hover시 진하게 나타나도록 추가하였습니다.
  ```ts
  <Card
    key={id}
    className={`w-full min-h-[26.25rem] p-[2.375rem] border-0 rounded-[1.25rem] transition-all duration-500 bg-cover bg-right-bottom ${bg}
        ${hoveredCard === id ? 'scale-105 shadow-lg' : 'opacity-50'}
        ${hoveredCard === null || hoveredCard === id ? 'opacity-100' : 'opacity-50'}`}
    style={{ backgroundImage: `url(${bgImage})` }}
    onMouseEnter={() => setHoveredCard(id)}
    onMouseLeave={() => setHoveredCard(null)}
  >
  ```
  <img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/13e8d7c6-73e2-4a31-a84b-7794d94160ae">

#### 회원가입 페이지

- 회원가입 페이지
  기술 :

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/b0985a6e-ca7a-485c-aa3a-59e06ff17f97">

#### 로그인 페이지

- 로그인 페이지
  기술 :

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/c858f6d4-8daa-4c1b-b89e-d45d0f39e790">

#### 마이페이지 페이지

- 마이 페이지
  기술 : user API와 rank API를 가져와서 해당 유저의 정보를 가져온다. 프로필 변경에서는 스토리지를 활용해 이미지를 저장하고, 그 이미지를 스토리지에서 가져와 페이지에 반영해준다. 이후 이미지, 닉네임, 한 줄 소개를 user 테이블에 저장해준다.

  ```ts
  // 프로필 수정
  const updatehandler = (user: User) => {
    updateUserInfo(user.user_id, user.image, user.nickname, user.introduction);
    router.push('/mypage');
  };

  // 프로필 사진 storage에 저장 및 프로필 사진 storage에서 가져오기
  const uploadImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = await saveProfile(file!);
    const fullpath = await fetchProfile(name.toString());
    setUser({ ...user!, image: fullpath.publicUrl });
  };
  ```

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/a25b5385-d792-4e50-b303-c7fbaaca6af8">
<img width="500" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/c04d33a1-1a29-47c9-a7cb-f4cc1edde732">
<img width="500" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/421186f6-9f70-427c-88fd-f85700ebfd01">

#### 게임 페이지(speaking)

- 말하기 게임 페이지
  기술 : getuserMedia를 통해 유저의 마이크 접근 권한을 체크하여 변수에 담아 접근 권한 여부를 MediaRecorder 인수로 전달해주고 recorder라는 인스턴스 객체를 만들고 오디오 값을 저장해준다
  이후 new Blob을 통해 저장된 오디오 값을 저장하여 wit ai와 데이터 통신을 통해 텍스트로 변환받아 문제의 텍스트와 비교하여 정확도를 비교해주었다

```ts
// 사용자의 마이크 권한 여부를 확인하는 코드
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// 녹음을 가능하게 해주는 코드
const recorder = new MediaRecorder(stream, { audioBitsPerSecond: 8000 });
mediaRecorderRef.current = recorder;
// 녹음된 데이터가 준비되었을때 변수에 담는 코드
recorder.ondataavailable = (event) => {
  audioChunks.current = [event.data];
};
// 녹음이 종료 되었을때 new Blob을 통해 오디오를 저장하여 외부 API와 통신하여 텍스트를 변환 받는 코드
recorder.onstop = async () => {
  const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
  audioChunks.current = [];
  const pcmData = await convertAudioToPCM(audioBlob);
  const data = await sendToAudio(pcmData);
  if (data) {
    const jsonText = await data.trim().split(/\n(?={)/);
    const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
    const text = jsonArray[jsonArray.length - 1];
    await setText(text.text);
  }
  setIsLoading(false);
};
```

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/eb2f1686-2c84-4c06-bd3c-7c14df23e7dd">

#### 게임 페이지(writing)

- 빈칸 한 입 페이지
  기술 : Supabase에 저장된 퀴즈 문제를 불러와 문장 내 빈칸에 알맞은 단어를 사용자가 입력하도록 한다. 타이머가 제한 시간을 관리하며, 사용자가 입력한 답안을 정답과 비교해 점수를 부여하고, 최종 점수는 로그인 상태에 따라 Supabase 또는 로컬 스토리지에 저장된다.

  ```ts
  // 점수 저장 -  로그인 상태는 수퍼베이스에 저장, 비로그인 시 로컬 스토리지에 저장
  const saveScore = async () => {
    const startSeason = new Date(2024, 9, 27);
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;

    if (userId) {
      // 특정 사용자에 대한 랭크 데이터 존재 여부 확인
      const { data: currentScore, error: fetchError } = await browserClient
        .from('rank')
        .select('id, writing')
        .eq('user_id', userId)
        .eq('week', weekNumber);
      if (fetchError) {
        console.error('기존 랭크 데이터를 가져오는 중 오류가 발생했습니다.', fetchError);
        return;
      }
      if (currentScore.length > 0) {
        if (score > currentScore[0].writing || currentScore[0].writing === null) {
          // 기존 점수가 현재 점수보다 낮을 경우 업데이트
          const { error: updateError } = await browserClient
            .from('rank')
            .update({
              writing: score,
            })
            .eq('id', currentScore[0].id);

          if (updateError) {
            console.error('점수를 업데이트하지 못했습니다.', updateError);
          }
        }
      } else {
        // 기존 데이터가 없으면 새로 삽입
        const { error: insertError } = await browserClient.from('rank').insert({
          user_id: userId,
          writing: score,
          week: weekNumber,
        });

        if (insertError) {
          console.error('점수를 삽입하지 못했습니다.', insertError);
        }
      }
    } else {
      // 비로그인 시 로컬 스토리지에 점수 저장
      localStorage.setItem('writing', score.toString());
    }
  };
  ```

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/20f51193-6cda-4217-889a-8cfc9bf8b2ab">

#### 게임 페이지(checking)

- 틀린 말 게임 페이지
  기술 : Supabase에서 불러온 문장 중 틀린 맞춤법을 포함한 선택지를 보여주고, 사용자가 잘못된 단어를 선택하는 방식입니다. 맞춤법 오류가 있는 선택지 중 정답을 고르면 점수를 얻으며, 게임 종료 후 결과가 Supabase 또는 로컬 스토리지에 저장됩니다.

아래 코드는 현재 퀴즈 질문에서 특정 구문에 밑줄과 번호를 추가하여 사용자에게 강조된 텍스트를 보여준다.

```ts
const questionUnderLine = () => {
  const { question, correct } = questions[currentQuizIndex];
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // 'correct' 배열에 있는 각 택스트을 순회하며 위치와 스타일을 설정
  correct.forEach((phrase, index) => {
    const phraseIndex = question.indexOf(phrase, lastIndex);

    if (phraseIndex !== -1) {
      // phrase 전의 일반 텍스트 추가
      if (lastIndex < phraseIndex) {
        parts.push(<span key={lastIndex}>{question.slice(lastIndex, phraseIndex)}</span>);
      }

      // 선택된 텍스트에 밑줄과 번호 스타일을 추가
      const isSelected = selectedOption === phrase;
      parts.push(
        <span
          key={phraseIndex}
          className={`underline underline-offset-8 ${
            isSelected ? 'decoration-[#A07BE5]' : 'decoration-[#357EE7]'
          } relative`}
        >
          {phrase}
          <span
            className={`font-pretendard absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex w-[1.625rem] h-[1.625rem] ${
              isSelected ? 'bg-[#A07BE5]' : 'bg-[#357EE7]'
            } text-[1.3125rem] text-white items-center justify-center rounded-full`}
          >
            {index + 1} {/* 텍스트에 표시할 번호 */}
          </span>
        </span>,
      );

      lastIndex = phraseIndex + phrase.length; // 다음 텍스트 탐색을 위해 마지막 인덱스 업데이트
    }
  });

  // 마지막 남은 텍스트를 추가
  if (lastIndex < question.length) {
    parts.push(<span key='end'>{question.slice(lastIndex)}</span>);
  }

  return <p>{parts}</p>; // 강조된 텍스트를 포함한 전체 질문 반환
};
```

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/c14cdf39-f1fe-453d-adfc-f2706ebe369e">

#### 게임결과 페이지

- 게임 결과 페이지
  기술 : 회원은 supabase에서 비회원은 localstorage에서 데이터를 받아 옴으로써 회원은 server 비회원은 clinet로 페이지를 각각 구성하였습니다. 회원에 한해서 모든 게임(3문제)을 끝냈을 때에만 점수를 합산하여 supabase에 total점수를 업데이트 시켜줍니다.

```
  if (isDone) {
    const totalScore = userTable?.reduce(
      (acc, current) => {
        const total = (current.checking || 0) + (current.speaking || 0) + (current.writing || 0);
        return { user_id: current.user_id, id: current.id, total };
      },
      { total: 0 },
    );

    const updateTotalScore = async () => {
      const { data, error } = await serverClient.from('rank').upsert(totalScore);
      if (error) {
        console.error('Error posting score data', error);
        return;
      }
      console.log('Score data posted successfully ', data);
    };
    updateTotalScore();
  }
```

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/7796b29f-78c9-4e55-ba41-4b5a82a57259">

#### 랭크 페이지

- 랭크 페이지
  기술 : 이번주 모든 랭킹 리스트와 지난주 나의 랭킹 순위를 볼 수 있습니다. 이번주 랭킹 순위는 따로 supabase에 저장하지 않고 화면이 렌더링 될 때마다 순위를 매겨서 화면 ui에 그려주는 방식을 채택하였고 지난주 랭킹 같은 경우에는 supabase에 새로운 주차가 생길 때 새로운row가 생성되면서 지난주차row의 게임 total 점수의 변동이 일어나지 않는데, 그래서 새로운 주차가 시작했을 때 가장 처음 랭킹페이지를 들어오는 사람을 기준으로 지난주차 데이터를 가져와 total 점수를 기준으로 랭킹 순위를 매겨서 supabase에 넣어주고 난 뒤 지난주 나의 랭킹 순위를 supabase에서 불러오는 방식은 채택 하였습니다.

```
  if (latestWeekData && latestWeekData[0].week - 1 > 0) {
    const lastWeek = latestWeekData[0].week - 1;

    //지난주 테이블 모두 가져오는데 토탈점수가 높은거부터 내림차순 정렬
    const { data: lastWeekData } = await serverClient
      .from('rank')
      .select()
      .eq('week', lastWeek)
      .not('total', 'is', null)
      .order('total', { ascending: false });
    console.log('lastWeekData', lastWeekData);

    //지난주 테이블에 랭킹 기록이 없을시에 랭킹을 매겨주고 랭킹을 넣어줌
    if (lastWeekData?.[0].ranking === null) {
      const countRanking: Rank[] | null = lastWeekData?.map((item, index) => ({
        ...item,
        ranking: index + 1,
      }));
      const insertLastRankingData = async () => {
        const { data, error } = await serverClient.from('rank').upsert(countRanking);
        if (error) {
          console.error('Error posting Ranking data', error);
          return;
        }
        console.log('Ranking Data posted successfully', data);
      };
      insertLastRankingData();
    }
    //내 아이디랑 일치하는 지난 테이블 가져오는 로직
    const { data: myLastrank }: { data: Rank[] | null } = await serverClient
      .from('rank')
      .select()
      .eq('user_id', userId)
      .eq('week', lastWeek);
```

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/4804bffc-3f5e-4f01-8e55-2c7ac564b9d0">

---

## 💥 Trouble Shooting

#### Speaking <br/>

Trouble: 오디오 입력 값이 처음 시작시 빈 데이터를 저장하는 오류 발생 : MediaRecorder 객체를 생성해 오디오를 녹음하고 MediaRecorder 인스턴스를 변수 상태로 저장하면 리렌더링 시마다 새로 생성되어 녹음이 끊길 수 있다는걸 확인<br/>
solution: useRef를 사용하여 리렌더링이 발생해도 MediaRecorder 인스턴스는 그대로 유지되게 만들어 끊김 없이 안정적으로 녹음을 이어갈 수 있습니다.

<br/>

#### Ranking <br/>

Trouble: 랭킹 순위를 매길려면 supabase에서 total 점수가 가장 높은 것들을 기준으로 내림차순으로 정렬시켜서 데이터를 받아오는데 오류 발생<br/>
solution: 데이터를 내림차순으로 정렬시킬때 supabase에서 null을 가장 위로 정렬 시킨다는 것을 확인하여 데이터를 불러오는 조건에 ` .not('total', 'is', null)` 를 추가 시켜서 total점수에 null값이 있는 데이터를 걸러지게 하여 가장 높은 점수가 위로 가도록 하였습니다.

<br/>

#### Mypage <br/>

Trouble: useEffect를 남발하여 Input 값에 입력이 버벅이는 오류 발생<br/>
solution: useEffect 대신 setUser를 onChange에 삽입하여 useEffect를 모두 제거하였습니다.

```ts
useEffect(() => {
  setUser({ ...user!, nickname });
}, [nickname]);
useEffect(() => {
  setUser({ ...user!, introduction });
}, [introduction]);
useEffect(() => {
  setUser({ ...user!, image: img });
}, [img]);
```

<br/>

#### Checking <br>

Trouble: checkQuiz: lastIndex가 정확히 업데이트되지 않아 question 내 일부 텍스트가 예상 위치에 표시되지 않거나 텍스트 분할이 잘못되는 문제가 있었습니다.<br/>
solution: lastIndex를 각 구문 끝 위치로 정확히 업데이트하여 indexOf가 항상 올바른 위치에서 다음 텍스트을 찾도록 수정했습니다. 이를 위해 다음과 같은 코드를 사용했습니다:

```ts
lastIndex = phraseIndex + phrase.length; // phrase 끝 위치로 lastIndex 업데이트
```
