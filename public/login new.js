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

        // JSON 파일에서 사용자 데이터를 가져옴
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // 사용자 데이터에서 입력된 이메일과 일치하는 사용자를 찾음
                const user = data.users.find(user => user.email === enteredUsername);

                if (!user) {
                    // 사용자가 존재하지 않는 경우
                    helperText.textContent = '*등록되지 않은 이메일입니다';
                } else if (user.password !== enteredPassword) {
                    // 비밀번호가 일치하지 않는 경우
                    helperText.textContent = '*비밀번호가 다릅니다';
                } else {
                    // 로그인 성공
                    // 예: 다음 페이지로 리다이렉트
                    alert('로그인했습니다.');
                    window.location.href = "/main";
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });

});