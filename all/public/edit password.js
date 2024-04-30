// main.js
"use strict"; 

// 이미지 클릭 이벤트
document.querySelector('.image')
.addEventListener('click', function(event) {
    event.stopPropagation(); // 부모 요소의 이벤트 전파 차단
    var dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.toggle('show');
});

// 문서 클릭 이벤트
document.addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdownContent');
    if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
    }
});

// 회원정보 수정 클릭 이벤트
document.querySelector('.dropdown-content a:nth-of-type(1)')
.addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/editprofile"; // 이동할 URL 지정
});

// 비밀번호 수정 클릭 이벤트
document.querySelector('.dropdown-content a:nth-of-type(2)')
.addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/editpassword"; // 이동할 URL 지정
});

// 로그아웃 클릭 이벤트
document.querySelector('.dropdown-content a:nth-of-type(3)')
.addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/login"; // 이동할 URL 지정
});

document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('confirm-password');
    const passwordHelperText = document.querySelector('#password-helper');
    const confirmPasswordHelperText = document.querySelector('#confirm-password-helper');
    const nicknameHelperText = document.querySelector('#nickname-helper');

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

    document.querySelector('.submit-button')
    .addEventListener('click', function(event) {
        event.preventDefault(); // 기본 제출 동작을 막음
    
        const password = passwordInput.value;
        const confirmPassword = passwordConfirmInput.value;

        const isPasswordValid = password.trim() !== '';
        const isConfirmPasswordValid = confirmPassword === password;

        if ( isPasswordValid && isConfirmPasswordValid) {
            // 유효성 검사를 모두 통과한 경우, 회원가입 처리를 수행하고 로그인 페이지로 이동
            window.location.href = "/login";
        } else {
            console.log('입력한 정보가 올바르지 않습니다.');
            // 필요한 경우 사용자에게 알림을 추가할 수 있습니다.
        }
    });
});
