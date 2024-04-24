"use strict"; 

//등록하기 버튼 클릭시 makepost로 이동
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
async function fetchPosts() {
    try {
        const response = await fetch('postdata.json'); // JSON 파일 경로 수정
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// 게시글을 생성하는 함수
function createPostElement(postData) {
    var postElement = document.createElement('div');
    postElement.classList.add('post');

    // click event
    postElement.addEventListener('click', () => {
        window.location.href = `/post/${postData.id}`; // 이동할 URL 지정
    });

    // 게시글 이미지 추가
    var imageElement = document.createElement('img');
    imageElement.classList.add('post-image');
    imageElement.setAttribute('src', postData.post_image); // post_image 속성 추가
    postElement.appendChild(imageElement);

    // 게시글 제목 추가
    var titleElement = document.createElement('h2');
    titleElement.textContent = postData.title;
    postElement.appendChild(titleElement);

    // 작성자 정보 추가
    var authorDiv = document.createElement('div');
    authorDiv.classList.add('author');

    // 작성자 프로필 이미지 추가
    var profileImage = document.createElement('div');
    profileImage.classList.add('gray-circle');

    var profileImageElement = document.createElement('img');
    profileImageElement.setAttribute('src', postData.profile_image);
    profileImageElement.classList.add('profile-image'); // 추가된 부분

    profileImage.appendChild(profileImageElement);
    authorDiv.appendChild(profileImage);

    // 작성자 닉네임 추가
    var authorName = document.createElement('p');
    authorName.classList.add('post-author');
    authorName.textContent = postData.nickname;
    authorDiv.appendChild(authorName);

    // 작성 일자 추가
    var dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.textContent = postData.timestamp;
    authorDiv.appendChild(dateSpan);

    postElement.appendChild(authorDiv);

    // 게시글 내용 추가
    var postContent = document.createElement('div');
    postContent.classList.add('post-content');

    // 게시글 내용이 많으므로 간략하게 줄입니다.
    var postText = document.createElement('p');
    postText.textContent = postData.content.substring(0, 100) + '...';
    postContent.appendChild(postText);
    postElement.appendChild(postContent);

    // 댓글, 조회수 추가
    var postComments = document.createElement('div');
    postComments.classList.add('post-comments');

    var postCount = document.createElement('div');
    postCount.classList.add('post-count');
    postCount.textContent = postData.views + '조회수';
    postComments.appendChild(postCount);

    var commentCount = document.createElement('div');
    commentCount.classList.add('comment-count');
    commentCount.textContent = postData.comments + '댓글';
    postComments.appendChild(commentCount);

    postElement.appendChild(postComments);

    return postElement;
}


// 게시글 컨테이너
var postsContainer = document.getElementById('posts-container');

// JSON 데이터를 가져와서 게시글 생성 후 추가
fetchPosts().then(function(jsonData) {
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
