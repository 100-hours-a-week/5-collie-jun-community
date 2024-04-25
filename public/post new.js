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


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

fetch('/postdata.json')
  .then((response) => response.json())
  .then((data) => {
    function formatViews(views) {
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
      } else if (views >= 100000) {
        return (views / 1000).toFixed(0) + 'k';
      } else if (views >= 10000) {
        return (views / 1000).toFixed(1) + 'k';
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k';
      } else {
        return views.toString();
      }
    }

    const post = data[postId];
    if (post) {
      const postDetails = `
      <div class="posts-container">
      <div class="post">
          <div class="post-header">
              <h2>${post.title}</h2>
              <div class="post-details">
                  <div class="author">
                      <div class="gray-circle" style="background-image: url(${post.profile_image})"></div>
                      <p class="post-author">${post.author}</p>
                      <div class="date">
                          <span>${post.timestamp}</span>
                      </div>
                  </div>
                  <div class="buttons">
                      <button class="edit-button">수정</button>
                      <button class="delete-button">삭제</button>
                  </div>
              </div>
              <hr>
          <div class="post-content">
            <div class="post-image" style="width: 544px; height: 306px; overflow: hidden;">
            <img src="${post.post_image}" alt="Post Image" style="width: 100%; height: auto;">
            </div>
              <div class="post-text">
              ${post.content}
              </div>
          </div>
      </div>
      `;
      document.getElementById('posts-container').innerHTML = postDetails;
    };
});
