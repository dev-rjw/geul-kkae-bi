let intervalId;

onmessage = function (e) {
  if (e.data === 'start') {
    let timeLeft = 40;

    // 기존 타이머가 있으면 초기화
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      timeLeft -= 1;
      postMessage(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        postMessage('timeover');
      }
    }, 1000);
  }

  if (e.data === 'stop') {
    clearInterval(intervalId);
  }
};
