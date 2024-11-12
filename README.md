#  글깨비
'글을 깨우치자'는 의미로, 한국어 발음과 맞춤법 학습을 돕는 서비스입니다.

## 🔗 배포 링크
https://geul-kkae-bi.vercel.app/

---

## 👨‍🏫 프로젝트 소개

### 한국인을 위한 한국어 발음 & 맞춤법 학습 사이트
최근 2030세대의 문해력 문제가 주목받고 있는 가운데, 맞춤법과 어휘 그리고 발음을 재미있게 공부할 수 있도록 게임 요소를 가미한 사이트입니다.

## 🚩 프로젝트 개요

- **프로젝트명** &nbsp; :&nbsp; **글깨비**
- **진행 기간** &nbsp;: &nbsp; **24.10.18 ~ 24.11.21**

---

## 👨‍👩‍👧‍👦 팀 소개

### 금오갤(Gold쪽이 Of Galaxy)

| 류지원 | 조아영 | 송진우 | 이보영 | 임기철 | 권현정 | 조애리 |
| :--: | :--: | :--: | :--: | :--: | :--:| :--: |
| **리더** | **부리더** | **팀원** | **팀원** | **팀원** | **디자이너** | **디자이너** |
| 메인페이지 | 회원가입, 로그인 | 게임(wrting,checking) | 결과, 랭킹페이지 | 게임(speaking) | 디자인 | 디자인 |

---

## 📚 STACKS

![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![reactrouter](https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-666666?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-666666?style=for-the-badge)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

## ✔️ 설치 패키지

- 프로젝트 세팅 : npx create-next-app@latest
  - tailwindcss 포함
  - 실행 : pnpm dev
- tanstack query 설치 : pnpm add @tanstack/react-query @tanstack/react-query-devtools
- zustand 설치 : pnpm add zustand
- zod 설치 : pnpm add zod
- react-hook-form 설치 : pnpm add react-hook-form @hookform/resolvers
- shadcn/ui : pnpm add shadcn/ui

---

## 📦 프로젝트 파일 구조

<details>
  <summary><b>글깨비 파일 구조</b></summary>

```
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(find)
 ┃ ┃ ┃ ┣ 📂change-password
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂find-password
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜ChangePasswordForm.tsx
 ┃ ┃ ┃ ┃ ┗ 📜FindPasswordForm.tsx
 ┃ ┃ ┃ ┗ 📜layout.tsx
 ┃ ┃ ┣ 📂(sign)
 ┃ ┃ ┃ ┣ 📂signin
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┃ ┗ 📜randomNickname.ts
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜GoogleSignButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜KakaoSignButtton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SigninForm.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SignupForm.tsx
 ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂callback
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂games
 ┃ ┃ ┃ ┣ 📂(result)
 ┃ ┃ ┃ ┃ ┣ 📂guest
 ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜GuestPage.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ResultSide.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┃ ┣ 📂checking
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜QuizTimer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┃ ┣ 📂rank
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┃ ┣ 📂speaking
 ┃ ┃ ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┃ ┃ ┗ 📜audio.ts
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Question.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Speak.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Timer.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Tutorial.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┃ ┗ 📂writing
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ConsonantCard.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜QuizTimer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📂change-password
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂information
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┗ 📜Tabs.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜GameCards.tsx
 ┃ ┃ ┃ ┣ 📜MainCarousel.tsx
 ┃ ┃ ┃ ┗ 📜MainRank.tsx
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┣ 📜not-found.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜DefaultButton.tsx
 ┃ ┃ ┣ 📜DefaultInput.tsx
 ┃ ┃ ┣ 📜EmailInput.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜HeaderInfoChange.tsx
 ┃ ┃ ┣ 📜IconChevronRight.tsx
 ┃ ┃ ┣ 📜IconStar.tsx
 ┃ ┃ ┣ 📜Layout.tsx
 ┃ ┃ ┣ 📜NoLayout.tsx
 ┃ ┃ ┣ 📜PasswordInput.tsx
 ┃ ┃ ┣ 📜PasswordValidationInput.tsx
 ┃ ┃ ┗ 📜Providers.tsx
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂mock
 ┃ ┃ ┗ 📜speak.ts
 ┃ ┣ 📂mutations
 ┃ ┃ ┗ 📜speek-mutation.ts
 ┃ ┣ 📂queries
 ┃ ┃ ┣ 📜useAuth.ts
 ┃ ┃ ┗ 📜useGetSpeekQuery.ts
 ┃ ┣ 📂schemas
 ┃ ┃ ┣ 📜commonSchema.ts
 ┃ ┃ ┣ 📜findSchema.ts
 ┃ ┃ ┗ 📜signSchema.ts
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜speekStore.ts
 ┃ ┃ ┗ 📜timeStore.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜result.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂rank
 ┃ ┃ ┣ 📂supabase
 ┃ ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┃ ┣ 📜middleware.ts
 ┃ ┃ ┃ ┗ 📜server.ts
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┗ 📜QueryProvider.tsx
 ┃ ┗ 📜middleware.ts
 ┣ 📜.env.local
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜components.json
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.mjs
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜postcss.config.mjs
 ┣ 📜README.md
 ┣ 📜tailwind.config.ts
 ┗ 📜tsconfig.json
```

</details>
<br/>

## 📋 Supabase ERD 설계도
![Supabase ERD 설계도](https://github.com/user-attachments/assets/80b1cffc-b7ff-4dfe-a7dd-10ece2a49128)

---

## 🗂️ 기능 설명

### 메인 페이지
![메인페이지](https://github.com/user-attachments/assets/4fe77b94-991f-45e8-baee-35fb04f1c6d9)
각 게임 별로 hover시 진하게 나타나도록 추가하였습니다.
```tsx
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

### 회원가입
![회원가입](https://github.com/user-attachments/assets/12c7de58-0b44-45eb-a9bc-b20e4d188162)
비회원이 게임을 진행하면 종합 랭크에는 기록되지 않습니다. <br/>
하지만 사용자 경험을 개선하기 위해, 비회원 상태에서 진행한 게임 점수를 로컬 스토리지에 저장해 두었다가 회원가입 시 자동으로 반영했습니다.
```tsx
// 로컬스토리지에 저장된 점수 가져오기
const getLocalStorageValues = () => {
  if (typeof window !== "undefined") {
    const checking = localStorage.getItem("checking")
      ? Number(localStorage.getItem("checking"))
      : 0;
    const speaking = localStorage.getItem("speaking")
      ? Number(localStorage.getItem("speaking"))
      : 0;
    const writing = localStorage.getItem("writing")
      ? Number(localStorage.getItem("writing"))
      : 0;

    return { checking, speaking, writing };
  }

  // 기본값을 반환하여 컴파일 에러를 방지
  return { checking: 0, speaking: 0, writing: 0 };
};

const onSubmit = async (values: FieldValues) => {
  const { email, password, nickname } = values;
  const { checking, speaking, writing } = getLocalStorageValues();

  // 회원가입 진행
  const result = await signup({
    email,
    password,
    options: {
      data: {
        nickname,
        image: `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/profile/default_img.webp`,
      },
    },
  });

  // 방금 가입한 회원의 id
  const userId = result.user.id;
  const total = checking + speaking + writing;
  // week 계산
  const startSeason = new Date(2024, 9, 27);
  const now = new Date();
  const weekNumber =
    Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;
  const week = weekNumber;

  // 회원가입 시 rank 테이블에 정보 저장
  await addScores({ userId, checking, speaking, writing, total, week });

  // 점수 저장 후 로컬스토리지 데이터 삭제
  localStorage.removeItem("checking");
  localStorage.removeItem("speaking");
  localStorage.removeItem("writing");

  // 페이지 이동
  router.push("/");
};
```

### 로그인 페이지
![로그인](https://github.com/user-attachments/assets/798dfc5f-40b4-4cdc-9c94-42f2fd788659)
소셜 로그인 회원에게 랜덤 닉네임을 자동으로 부여하는 기능을 구현했습니다.<br/>
회원가입 시 /auth/callback 경로로 리다이렉션되며, 코드 작성 시 로컬 및 배포 환경 모두를 고려해 안정적으로 작동하도록 구성했습니다.
```tsx
// client-action.ts
// 소셜 회원가입 및 로그인
export const googleSignin = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // `/auth/callback`으로 리다이렉션
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    alert("로그인에 실패하였습니다.");
    return error;
  }

  return data;
};

// app/auth/callback/route.ts
const forwardedHost = request.headers.get("x-forwarded-host"); // 로드 밸런서 이전의 원래 원점
const isLocalEnv = process.env.NODE_ENV === "development";

// 현재 사용자 조회
const {
  data: { user },
  error,
} = await supabase.auth.getUser();

if (error || !user) {
  console.error(error);
}

if (isLocalEnv) {
  // 로컬환경
  // 닉네임, 프로필 이미지, Provider 추가
  if (user?.id) {
    await Promise.all([addNickname(user.id), addProfileImage(user.id), addProvider(user)]);
  }

  // 그 사이에 로드 밸런서가 없으므로 X-포워드 호스트를 지켜볼 필요가 없습니다
  return NextResponse.redirect(`${origin}${next}`);
} else if (forwardedHost) {
  // 배포환경
  // 닉네임, 프로필 이미지, Provider 추가
  if (user?.id) {
    await Promise.all([addNickname(user.id), addProfileImage(user.id), addProvider(user)]);
  }

  return NextResponse.redirect(`https://${forwardedHost}${next}`);
} else {
  return NextResponse.redirect(`${origin}${next}`);
}
```

### 마이페이지
![마이페이지](https://github.com/user-attachments/assets/39f2b479-8392-4fc6-836f-19055d401fda)
![마이페이지-프로필변경](https://github.com/user-attachments/assets/bf19a9e1-1ab4-4f35-b752-c1cdc15d2dd9)
![마이페이지-비밀번호변경](https://github.com/user-attachments/assets/48bb9d99-3af2-47cb-80cf-5352711813a9)
user API와 rank API를 가져와서 해당 유저의 정보를 가져온다.<br/>
프로필 변경에서는 스토리지를 활용해 이미지를 저장하고, 그 이미지를 스토리지에서 가져와 페이지에 반영해준다.<br/>
이후 이미지, 닉네임, 한 줄 소개를 user 테이블에 저장해준다.
```tsx
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

### 나야발음왕 페이지(speaking)
![나야발음왕](https://github.com/user-attachments/assets/9cfc0b4b-ddca-4ae5-9211-f216e5980f46)
getuserMedia를 통해 유저의 마이크 접근 권한을 체크하여 변수에 담아 접근 권한 여부를 MediaRecorder 인수로 전달해주고 recorder라는 인스턴스 객체를 만들고 오디오 값을 저장해준다.<br/>
이후 new Blob을 통해 저장된 오디오 값을 저장하여 wit ai와 데이터 통신을 통해 텍스트로 변환받아 문제의 텍스트와 비교하여 정확도를 비교해주었다.
```tsx
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

### 틀린말탐정단 페이지(checking)
![틀린말탐정단](https://github.com/user-attachments/assets/b1f040fe-e5e9-4d45-ad66-f6a44121bc62)
Supabase에서 불러온 문장 중 틀린 맞춤법을 포함한 선택지를 보여주고, 사용자가 잘못된 단어를 선택하는 방식입니다.<br/>
맞춤법 오류가 있는 선택지 중 정답을 고르면 점수를 얻으며, 게임 종료 후 결과가 Supabase 또는 로컬 스토리지에 저장됩니다.<br/>
아래 코드는 현재 퀴즈 질문에서 특정 구문에 밑줄과 번호를 추가하여 사용자에게 강조된 텍스트를 보여준다.
```tsx
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

### 빈칸한입 페이지(writing)
![빈칸한입](https://github.com/user-attachments/assets/0427b52b-632f-4c3c-b93a-08f44c4e0dcb)
Supabase에 저장된 퀴즈 문제를 불러와 문장 내 빈칸에 알맞은 단어를 사용자가 입력하도록 한다.<br/>
타이머가 제한 시간을 관리하며, 사용자가 입력한 답안을 정답과 비교해 점수를 부여하고, 최종 점수는 로그인 상태에 따라 Supabase 또는 로컬 스토리지에 저장된다.
```tsx
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

### 게임결과 페이지
![결과페이지](https://github.com/user-attachments/assets/e99adf73-f7af-4024-a273-293c8bcd9c6e)
회원은 supabase에서 비회원은 localstorage에서 데이터를 받아 옴으로써 회원은 server 비회원은 clinet로 페이지를 각각 구성하였습니다.<br/>
회원에 한해서 모든 게임(3문제)을 끝냈을 때에만 점수를 합산하여 supabase에 total점수를 업데이트 시켜줍니다.
```tsx
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

### 랭킹 페이지
![랭킹](https://github.com/user-attachments/assets/cbd80f2c-1568-4c66-a8e3-93c9aa670284)
이번주 모든 랭킹 리스트와 지난주 나의 랭킹 순위를 볼 수 있습니다.<br/>
이번주 랭킹 순위는 따로 supabase에 저장하지 않고 화면이 렌더링 될 때마다 순위를 매겨서 화면 ui에 그려주는 방식을 채택하였고 지난주 랭킹 같은 경우에는 supabase에 새로운 주차가 생길 때 새로운row가 생성되면서 지난주차row의 게임 total 점수의 변동이 일어나지 않는데, 그래서 새로운 주차가 시작했을 때 가장 처음 랭킹페이지를 들어오는 사람을 기준으로 지난주차 데이터를 가져와 total 점수를 기준으로 랭킹 순위를 매겨서 supabase에 넣어주고 난 뒤 지난주 나의 랭킹 순위를 supabase에서 불러오는 방식은 채택 하였습니다.
```tsx
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

---

## 💥 Trouble Shooting

#### Speaking
🔥 Trouble: 오디오 입력 값이 처음 시작시 빈 데이터를 저장하는 오류 발생 : MediaRecorder 객체를 생성해 오디오를 녹음하고 MediaRecorder 인스턴스를 변수 상태로 저장하면 리렌더링 시마다 새로 생성되어 녹음이 끊길 수 있다는걸 확인<br/>
solution: useRef를 사용하여 리렌더링이 발생해도 MediaRecorder 인스턴스는 그대로 유지되게 만들어 끊김 없이 안정적으로 녹음을 이어갈 수 있습니다.

#### Checking
🔥 Trouble: checkQuiz: lastIndex가 정확히 업데이트되지 않아 question 내 일부 텍스트가 예상 위치에 표시되지 않거나 텍스트 분할이 잘못되는 문제가 있었습니다.<br/>
solution: lastIndex를 각 구문 끝 위치로 정확히 업데이트하여 indexOf가 항상 올바른 위치에서 다음 텍스트을 찾도록 수정했습니다. 이를 위해 다음과 같은 코드를 사용했습니다:

```tsx
lastIndex = phraseIndex + phrase.length; // phrase 끝 위치로 lastIndex 업데이트
```

#### Ranking
🔥 Trouble: 랭킹 순위를 매길려면 supabase에서 total 점수가 가장 높은 것들을 기준으로 내림차순으로 정렬시켜서 데이터를 받아오는데 오류 발생<br/>
solution: 데이터를 내림차순으로 정렬시킬때 supabase에서 null을 가장 위로 정렬 시킨다는 것을 확인하여 데이터를 불러오는 조건에 ` .not('total', 'is', null)` 를 추가 시켜서 total점수에 null값이 있는 데이터를 걸러지게 하여 가장 높은 점수가 위로 가도록 하였습니다.


#### Login
🔥 Trouble: Vercel에 배포하는 과정에서 문제가 발생<br/>
localStorage는 브라우저에서만 사용할 수 있는 API이기 때문에, 서버에서 렌더링 시 접근하면 오류가 발생합니다.
typeof window !== "undefined"를 사용해 브라우저 환경에서만 실행되도록 수정했습니다.
``` tsx
const defaultValues = {
  // 컴포넌트가 브라우저에서만 렌더링되는지 확인하는 조건문을 추가
  email: typeof window !== 'undefined' ? localStorage.getItem('rememberedEmail') || '' : '',
  password: '',
};
```

#### Mypage
🔥 Trouble: useEffect를 남발하여 Input 값에 입력이 버벅이는 오류 발생<br/>
solution: useEffect 대신 setUser를 onChange에 삽입하여 useEffect를 모두 제거하였습니다.
```tsx
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

---

## ⏳ 고도화 작업 계획
- 반응형 구현
- 메신저 연동을 통한 공유 기능 추가
- 특정 목표 달성 시 사용자에게 뱃지 부여 기능
- 랭크 데이터 정확히 출력 검토
- 학습 페이지 및 틀린 문제 보여주는 페이지 추가
- 타이머 정확한 시간 흐름 개선
