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

    // JSON 데이터에서 이메일 중복 확인
    function checkEmailDuplicate(email) {
        fetch('data.json') // 경로를 올바르게 수정해야 합니다.
            .then(response => response.json())
            .then(data => {
                const duplicateEmail = data.users.some(user => user.email === email);
                if (duplicateEmail) {
                    emailHelperText.textContent = '*중복된 이메일입니다';
                } else {
                    emailHelperText.textContent = '';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
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

    function checkNicknameDuplicate(nickname) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const duplicateNickname = data.users.some(user => user.nickname === nickname);
                if (duplicateNickname) {
                    nicknameHelperText.textContent = '*중복된 닉네임입니다';
                } else {
                    nicknameHelperText.textContent = '';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    document.querySelector('.submit')
    .addEventListener('click', function(event) {
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
            // 유효성 검사를 모두 통과한 경우, 회원가입 처리를 수행하고 로그인 페이지로 이동
            window.location.href = "/login";
        } else {
            console.log('입력한 정보가 올바르지 않습니다.');
            // 필요한 경우 사용자에게 알림을 추가할 수 있습니다.
        }
    })

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
