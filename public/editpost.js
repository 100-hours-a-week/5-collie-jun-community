// main.js
"use strict"; 

document.querySelector('.beforebutton')
.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/main"; // 이동할 URL 지정
});
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

async function fetchPosts() {
    try {
        const response = await fetch('/postdata.json'); // JSON 파일 경로 수정
        const jsonData = await response.json();

        // urlParams 사용하지 않고, JSON 데이터로부터 바로 가져옴
        const postId = urlParams.get('postId'); 
        const post = jsonData.find(post => post.id === postId); // id와 일치하는 게시물 가져오기

        // 제목과 내용 필드 채우기
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// 페이지 로드 시 실행
window.onload = fetchPosts;
