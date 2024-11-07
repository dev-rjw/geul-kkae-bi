# 글깨비

## 👨‍👩‍👧‍👦 팀 소개

### 금오갤(Gold쪽이 Of Galaxy)

## 👨‍👩‍👧‍👦 팀원 소개

|         류지원         |      조아영      |        김진우         |      이보영      |     임기철     |    권현정    |    조애리    |
| :--------------------: | :--------------: | :-------------------: | :--------------: | :------------: | :----------: | :----------: |
|        **리더**        |    **부리더**    |       **팀원**        |     **팀원**     |    **팀원**    | **디자이너** | **디자이너** |
| 메인페이지, 마이페이지 | 회원가입, 로그인 | 게임(wrting,checking) | 결과, 랭킹페이지 | 게임(speaking) |    디자인    |    디자인    |

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
  기술 :

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

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/a25b5385-d792-4e50-b303-c7fbaaca6af8">
<img width="500" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/c04d33a1-1a29-47c9-a7cb-f4cc1edde732">
<img width="500" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/421186f6-9f70-427c-88fd-f85700ebfd01">

#### 게임 페이지(speaking)

- 말하기 게임 페이지
  기술 : getuserMedia를 통해 유저의 마이크 접근 권한을 체크하여 변수에 담아 접근 권한 여부를 MediaRecorder 인수로 전달해주고 recorder라는 인스턴스 객체를 만들고 오디오 값을 저장해준다
  이후 new Blob을 통해 저장된 오디오 값을 저장하여 wit ai와 데이터 통신을 통해 텍스트로 변환받아 문제의 텍스트와 비교하여 정확도를 비교해주었다

```
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
  기술 :

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/20f51193-6cda-4217-889a-8cfc9bf8b2ab">

#### 게임 페이지(checking)

- 틀린 말 게임 페이지
  기술 :

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/c14cdf39-f1fe-453d-adfc-f2706ebe369e">

#### 게임결과 페이지

- 게임 결과 페이지
  기술 :

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/7796b29f-78c9-4e55-ba41-4b5a82a57259">

#### 랭크 페이지

- 랭크 페이지
  기술 :

<img width="1151" alt="스크린샷 2024-10-17 오전 4 58 17" src="https://github.com/user-attachments/assets/4804bffc-3f5e-4f01-8e55-2c7ac564b9d0">

---

## 💥 Trouble Shooting

- 오디오 입력 값이 처음 시작시 빈 데이터를 저장하는 오류 발생 : MediaRecorder 객체를 생성해 오디오를 녹음하고 MediaRecorder 인스턴스를 변수 상태로 저장하면 리렌더링 시마다 새로 생성되어 녹음이 끊길 수 있다는걸 확인
  그래서 useRef를 사용하여 리렌더링이 발생해도 MediaRecorder 인스턴스는 그대로 유지되게 만들어 끊김 없이 안정적으로 녹음을 이어갈 수 있습니다.

- useEffect를 남발하여 Input 값에 입력이 버벅이는 오류 발생: useEffect 대신 setUser를 onChange에 삽입하여 useEffect를 모두 제거하였습니다.

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
