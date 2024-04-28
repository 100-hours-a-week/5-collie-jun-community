"use strict";

// 로그인 버튼 클릭 이벤트 처리
document.querySelector('.beforebutton').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/main"; // 이동할 URL 지정
});

document.querySelector('.edit-button').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/editpost"; // 이동할 URL 지정
});

// 이미지 클릭 이벤트
document.querySelector('.image').addEventListener('click', function(event) {
    event.stopPropagation(); // 부모 요소의 이벤트 전파 차단
    var dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.toggle('show');
});

// dropdown content 외 다른 곳 클릭 이벤트
document.addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdownContent');
    if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
    }
});

// 회원정보 수정 클릭 이벤트
document.querySelector('.dropdown-content a:nth-of-type(1)').addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/editprofile"; // 이동할 URL 지정
});

// 비밀번호 수정 클릭 이벤트
document.querySelector('.dropdown-content a:nth-of-type(2)').addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/editpassword"; // 이동할 URL 지정
});

// 로그아웃 클릭 이벤트
document.querySelector('.dropdown-content a:nth-of-type(3)').addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/login"; // 이동할 URL 지정
});

// 게시글 모달 관련 이벤트
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector('.modal');
    const withdrawalButton = document.querySelector('.delete-button');
    const modalCancelButton = document.querySelector('.modal-cancel');
    const modalCheckButton = document.querySelector('.modal-check');

    withdrawalButton.addEventListener('click', function() {
        modal.style.display = "flex";
    });

    modalCancelButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    modalCheckButton.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 제출 동작을 막음
        window.location.href = "/main"; // 이동할 URL 지정
    });
}); 

// 댓글 모달 관련 이벤트
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector('.modal');
    const withdrawalButton = document.querySelector('.comment-delete-button');
    const modalCancelButton = document.querySelector('.comment-modal-cancel');
    const modalCheckButton = document.querySelector('.comment-modal-check');

    withdrawalButton.addEventListener('click', function() {
        modal.style.display = "flex";
    });

    modalCancelButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    modalCheckButton.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 제출 동작을 막음
        window.location.href = "/main"; // 이동할 URL 지정
    });
}); 

// JSON 데이터를 가져오는 함수
async function fetchPosts() {
    const urlParams = new URLSearchParams(window.location.search); // 여기로 이동

    try {
        // id와 일치하는 게시물만 필터링
        const postId = urlParams.get('postId'); // postId 변수를 먼저 선언

        const response = await fetch('/postdata.json'); // JSON 파일 경로 수정
        const jsonData = await response.json();

        console.log(postId); // postId 출력
        console.log(urlParams); // urlParams 출력

        jsonData.map(post => {
            if (post.id == postId)
            { document.querySelector("#postTitle").innerHTML = post.title;
            document.querySelector(".post-author").innerHTML = post.nickname;
            document.querySelector(".gray-circle").innerHTML = `<img width='100%' height='100%' style='border-radius:100%' src=${post.profile_image}>`
            document.querySelector(".time").innerHTML = post.timestamp;
            document.querySelector(".post-image").innerHTML = `<img width='100%' height='100%' src=${post.post_image}>`
            document.querySelector(".post-text").innerHTML = post.content;
            document.querySelector(".post-count").innerHTML = `<div style="display: flex; flex-direction: column; align-items: center;"><strong>조회수</strong> ${post.views}</div>`;
            document.querySelector(".comment-count").innerHTML = `<div style="display: flex; flex-direction: column; align-items: center;"><strong>댓글</strong> ${post.comments}</div>`;
            document.querySelector('.edit-button').addEventListener('click', function(event) {
            event.preventDefault(); // 기본 이벤트 동작 막기
            const postId = urlParams.get('postId'); // 현재 게시물의 ID 가져오기
            window.location.href = `/editpost.html?postId=${postId}`; // 이동할 URL 지정
            
        });
            }  
            });

        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }};

// 게시글 컨테이너
var postsContainer = document.querySelector('.posts-container');
// JSON 데이터를 가져와서 게시글 생성 후 추가
fetchPosts().then(function(jsonData) {});
