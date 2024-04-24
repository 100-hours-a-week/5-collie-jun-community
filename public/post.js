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
async function fetchPosts(userId) { // userId를 파라미터로 받도록 수정
    try {
        const response = await fetch(`/postdata.json?userId=${userId}`); // 해당 userId의 게시물만 가져오도록 수정
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// URL에서 userId를 가져오는 함수
function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    return userId;
}

// 게시글 컨테이너
var postsContainer = document.querySelector('.posts-container');

// 페이지가 로드될 때 실행되는 함수
document.addEventListener("DOMContentLoaded", function() {
    // URL에서 userId 가져오기
    const userId = getUserIdFromUrl();

    // userId가 있을 때만 해당 유저의 게시물을 가져와서 화면에 표시
    if (userId) {
        fetchPosts(userId).then(function(jsonData) {
            // 게시글 컨테이너가 존재하는지 확인
            if (postsContainer) {
                jsonData.forEach(function(postData) {
                    var postElement = createPostElement(postData);
                    postsContainer.appendChild(postElement);
                });
            } else {
                console.error('게시글 컨테이너를 찾을 수 없습니다.');
            }
        });
    } else {
        console.error('사용자 ID가 없습니다.');
    }
});
