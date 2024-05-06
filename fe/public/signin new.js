"use strict";

// 비포 버튼 클릭 이벤트 처리
document.querySelector('.beforebutton')
.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/login"; // 이동할 URL 지정
});

// 로그인하러 가기 클릭 이벤트 처리
document.querySelector('.login-link')
.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/login"; // 이동할 URL 지정
});

document.getElementById('profile-pic').addEventListener('change', function() {
    var file = this.files[0]; // 선택된 파일 가져오기
    var reader = new FileReader(); // 파일 리더 객체 생성

    reader.onload = function(e) {
        // 파일을 읽어오는 데 성공하면 실행되는 함수
        var image = new Image(); // 이미지 객체 생성
        image.src = e.target.result; // 이미지 경로 설정

        // 이미지 로딩이 완료되면 실행되는 함수
        image.onload = function() {
            var MAX_WIDTH = 150; // 최대 너비 설정
            var MAX_HEIGHT = 150; // 최대 높이 설정

            var canvas = document.createElement('canvas'); // 캔버스 생성
            var ctx = canvas.getContext('2d'); // 캔버스 컨텍스트 가져오기

            var width = image.width; // 이미지 너비 가져오기
            var height = image.height; // 이미지 높이 가져오기

            // 이미지 크기 조정
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            // 캔버스 크기 설정
            canvas.width = width;
            canvas.height = height;

            // 캔버스에 원형 모양으로 이미지 그리기
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(image, 0, 0, width, height);

            // 원형 모양으로 잘린 이미지를 프로필 이미지 영역에 추가
            var profileArea = document.querySelector('.profile-picture .profile');
            profileArea.innerHTML = '';
            profileArea.appendChild(canvas);
        };
    };

    reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환
    console.log(readAsDataURL);
});

document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('confirm-password');
    const nicknameInput = document.getElementById('nickname');
    const emailHelperText = document.querySelector('#email-helper');
    const passwordHelperText = document.querySelector('#password-helper');
    const confirmPasswordHelperText = document.querySelector('#confirm-password-helper');
    const nicknameHelperText = document.querySelector('#nickname-helper');
    const profileHelperText = document.querySelector('#profile-helper');

    emailInput.addEventListener('input', function(event) {
        const email = event.target.value;
        if (!isValidEmail(email)) {
            emailHelperText.textContent = '*올바른 이메일 주소 형식을 입력해 주세요.(예: example@example.com)';
        } else {
            // 유효한 닉네임 형식이면 이메일 중복 확인
            checkEmailDuplicate(email);
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function checkEmailDuplicate(email) {
        fetch("http://localhost:8081/users/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.isDuplicate) {
              emailHelperText.textContent = "*중복된 이메일입니다";
            } else {
              emailHelperText.textContent = "";
            }
          })
          .catch((error) =>
            console.error("Error checking email duplicate:", error)
          );
      }
      
    passwordInput.addEventListener('input', function(event) {
        const password = event.target.value;
        if (password.trim() === '') {
            passwordHelperText.textContent = '*비밀번호를 입력해 주세요';
        } else {
            passwordHelperText.textContent = '';
        }
    });

    passwordConfirmInput.addEventListener('input', function(event) {
        const confirmPassword = event.target.value;
        const password = passwordInput.value;
        if (confirmPassword.trim() === '') {
            confirmPasswordHelperText.textContent = '*비밀번호를 다시 입력해 주세요';
        } else if (confirmPassword !== password) {
            confirmPasswordHelperText.textContent = '*비밀번호가 다릅니다';
        } else {
            confirmPasswordHelperText.textContent = '';
        }
    });

    nicknameInput.addEventListener('input', function(event) {
        const nickname = event.target.value;
        if (nickname.trim() === '') {
            nicknameHelperText.textContent = '*닉네임을 입력해주세요';
        } else if (nickname.includes(' ')) {
            nicknameHelperText.textContent = '*띄어쓰기를 없애주세요';
        } else if (nickname.length > 10) {
            nicknameHelperText.textContent = '*닉네임은 최대 10자까지 작성 가능합니다';
        } else {
            // 유효한 이메일 형식이면 이메일 중복 확인
            checkNicknameDuplicate(nickname);
        }
    });

    //여기는 성공
  function checkNicknameDuplicate(nickname) {
    fetch("http://localhost:8081/users/check-nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.isDuplicate) {
          nicknameHelperText.textContent = "*중복된 닉네임입니다";
        } else {
          nicknameHelperText.textContent = "";
        }
      })
      .catch((error) =>
        console.error("Error checking nickname duplicate:", error)
      );
  }

  document.querySelector('.submit').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음

    // 각 입력 필드의 값을 가져옴
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = passwordConfirmInput.value;
    const nickname = nicknameInput.value;

    // 각 입력 필드의 유효성을 검사
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = password.trim() !== '';
    const isConfirmPasswordValid = confirmPassword === password;
    const isNicknameValid = nickname.trim() !== '' && !nickname.includes(' ') && nickname.length <= 10;

    // 모든 유효성을 통과했는지 확인
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isNicknameValid) {
        // 데이터를 JSON 형식으로 묶어서 서버로 전송
        const userData = {
            email: email,
            password: password,
            nickname: nickname
        };

        // 서버로 데이터를 전송하는 POST 요청
        fetch('http://localhost:8081/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                // 회원가입이 성공했을 때, 로그인 페이지로 이동
                alert ('회원가입했습니다.');
                window.location.href = '/login';
            } else {
                console.error('회원가입에 실패했습니다.');
                // 필요한 경우 사용자에게 실패 메시지를 보여줄 수 있습니다.
            }
        })
        .catch(error => {
            console.error('Error registering user:', error);
            // 필요한 경우 사용자에게 오류 메시지를 보여줄 수 있습니다.
        });
    } else {
        console.log('입력한 정보가 올바르지 않습니다.');
        // 필요한 경우 사용자에게 알림을 추가할 수 있습니다.
    }
});

    // 프로필 사진 입력 필드
    const profilePicInput = document.getElementById('profile-pic');

    // 프로필 사진 입력 필드의 change 이벤트를 감지하여 처리
    profilePicInput.addEventListener('change', function(event) {
        if (!event.target.files || event.target.files.length === 0) {
            // 파일이 선택되지 않았을 때, 프로필 사진 추가 안내를 표시
            profileHelperText.textContent = '*프로필 사진을 추가해 주세요';
        } else {
            // 파일이 선택되었을 때, 프로필 사진 추가 안내를 삭제
            profileHelperText.textContent = '';
        }
    });

});