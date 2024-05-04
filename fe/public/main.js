"use strict";

// 등록하기 버튼 클릭시 makepost로 이동
document.querySelector('.post-list button').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/makepost"; // 이동할 URL 지정
});

// 이미지 클릭 이벤트
document.querySelector('.image').addEventListener('click', function(event) {
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


// JSON 데이터를 가져오는 함수
// JSON 데이터를 가져오는 함수
async function fetchPostsFromBackend() {
    try {
        const response = await fetch('http://localhost:8081/post/posts'); // 백엔드 API 엔드포인트 호출
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching posts from backend:', error);
        return [];
    }
}


// 게시글을 생성하는 함수
function createPostElement(postData) {
    var postElement = document.createElement('div');
    postElement.classList.add('post');

    // 게시글 제목 요소 생성
    var titleElement = document.createElement('h3');
    titleElement.textContent = postData.title;
    titleElement.classList.add('post-title'); // post-title 클래스 추가
    postElement.appendChild(titleElement);

    // 게시글 정보 추가
    var postInfo = document.createElement('div');
    postInfo.classList.add('post-info');

    // 좋아요, 댓글, 조회수 추가
    var likeComment = document.createElement('div');
    likeComment.classList.add('like-comment');

    var postLikes = document.createElement('span');
    postLikes.classList.add('post-likes');
    postLikes.textContent = '좋아요 ' + postData.likes;
    likeComment.appendChild(postLikes);

    var postComments = document.createElement('span');
    postComments.classList.add('post-comments');
    postComments.textContent = '댓글 ' + postData.comments;
    likeComment.appendChild(postComments);

    var postViews = document.createElement('span');
    postViews.classList.add('post-views');
    postViews.textContent = '조회수 ' + postData.views;
    likeComment.appendChild(postViews);

    postInfo.appendChild(likeComment);

    // 작성 일자 추가
    var postDate = document.createElement('span');
    postDate.classList.add('post-date');
    postDate.textContent = postData.timestamp;
    postInfo.appendChild(postDate);

    postElement.appendChild(postInfo);

    // 가로줄 추가
    var horizontalLine = document.createElement('hr');
    postElement.appendChild(horizontalLine);

    // 작성자 정보 추가
    var authorElement = document.createElement('div');
    authorElement.classList.add('author');

    // 작성자 프로필 이미지 추가
    var profileImageElement = document.createElement('img');
    profileImageElement.setAttribute('src', postData.profile_image);
    profileImageElement.classList.add('gray-circle'); // gray-circle 클래스 추가

    var profileImageContainer = document.createElement('div');
    profileImageContainer.appendChild(profileImageElement);
    authorElement.appendChild(profileImageContainer);

    // 작성자 이름 추가
    var authorName = document.createElement('p');
    authorName.classList.add('post-author');
    authorName.textContent = postData.nickname;
    authorElement.appendChild(authorName);

    postElement.appendChild(authorElement);

    return postElement;
}

// 게시글 컨테이너
var postsContainer = document.getElementById('posts-container');

// JSON 데이터를 가져와서 게시글 생성 후 추가
fetchPostsFromBackend().then(function(jsonData) {
    // 게시글 컨테이너가 존재하는지 확인
    if (postsContainer) {
        jsonData.forEach(function(postData) {
            var postElement = createPostElement(postData);
            postsContainer.appendChild(postElement);

            // 이벤트 핸들러 등록
            postElement.addEventListener('click', () => {
                const postId = postData.id;
                window.location.href = `/post.html?postId=${postId}`; // 이동할 URL 지정
            });
        });
    } else {
        console.error('게시글 컨테이너를 찾을 수 없습니다.');
    }
});
