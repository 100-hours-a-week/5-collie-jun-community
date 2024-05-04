// login new.js
"use strict"; 
// 로그인 버튼 클릭 이벤트 처리
/*document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/main"; // 이동할 URL 지정
});*/

document.querySelector('.signup-link')
.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/signin"; // 이동할 URL 지정
});

document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginForm = document.querySelector('.login-form');
    const helperText = document.querySelector('.login-form h3');

    emailInput.addEventListener('input', function(event) {
        const email = event.target.value;
        if (!isValidEmail(email)) {
            helperText.textContent = '*올바른 이메일 주소 형식을 입력해 주세요.(예: example@example.com)';
        } else {
            helperText.textContent = '*helper text';
        }
    });

    function isValidEmail(email) {
        // 간단한 이메일 형식 검사를 수행하는 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    passwordInput.addEventListener('input', function(event) {
        const password = event.target.value;
        if (password.trim() === '') {
            helperText.textContent = '*비밀번호를 입력해 주세요';
        } else {
            helperText.textContent = '*helper text';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 제출 동작을 막음

        const enteredUsername = emailInput.value;
        const enteredPassword = passwordInput.value;

        // 서버로 로그인 요청을 보냄
        fetch("http://localhost:8081/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enteredUsername, enteredPassword })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('로그인에 실패했습니다.'); // 서버에서 오류 응답일 때
            }
            return response.json();
        })
        .then(data => {
            // 로그인 성공
            alert('로그인했습니다.');
            window.location.href = "/main";
        })
        .catch(error => {
            console.error('Error logging in:', error);
            // 서버 오류나 로그인 실패에 대한 처리
            alert ('로그인에 실패했습니다.');
        });
    });

});