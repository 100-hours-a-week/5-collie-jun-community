// main.js
"use strict";
// 로그인 버튼 클릭 이벤트 처리
document
  .querySelector(".beforebutton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/main"; // 이동할 URL 지정
  });

// 이미지 클릭 이벤트
document.querySelector(".image").addEventListener("click", function (event) {
  event.stopPropagation(); // 부모 요소의 이벤트 전파 차단
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show");
});

// 문서 클릭 이벤트
document.addEventListener("click", function () {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.classList.contains("show")) {
    dropdownContent.classList.remove("show");
  }
});

// 회원정보 수정 클릭 이벤트
document
  .querySelector(".dropdown-content a:nth-of-type(1)")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/editprofile"; // 이동할 URL 지정
  });

// 비밀번호 수정 클릭 이벤트
document
  .querySelector(".dropdown-content a:nth-of-type(2)")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/editpassword"; // 이동할 URL 지정
  });

// 로그아웃 클릭 이벤트
document
  .querySelector(".dropdown-content a:nth-of-type(3)")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 링크 기본 동작 막음
    window.location.href = "/login"; // 이동할 URL 지정
  });

document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const helperText = document.getElementById("helper-text");

  // 제목 입력란 이벤트 처리
  titleInput.addEventListener("input", function (event) {
    const title = event.target.value;
    if (title.trim() === "") {
      helperText.textContent = "*제목을 입력해주세요.";
    } else {
      helperText.textContent = "*helper text";
    }
  });

  // 내용 입력란 이벤트 처리
  contentInput.addEventListener("input", function (event) {
    const content = event.target.value;
    if (content.trim() === "") {
      helperText.textContent = "*내용을 입력해주세요.";
    } else {
      helperText.textContent = "*helper text";
    }
  });

  // 폼 제출 이벤트 처리
  document
    .getElementById("post-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 기본 제출 동작을 막음

      // 입력된 제목과 내용을 가져옴
      const title = titleInput.value;
      const content = contentInput.value;

      // 제목과 내용이 모두 비어있으면 helper text를 변경
      if (title.trim() === "" && content.trim() === "") {
        helperText.textContent = "제목과 내용을 입력해주세요.";
      } else {
        helperText.textContent = "*helper text";
      }
    });
});

document
  .getElementById("post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    console.log("click form ");

    const formData = new FormData(); // 새로운 FormData 객체 생성

    const title = document.getElementById("title").value; // 제목 값 가져오기
    const content = document.getElementById("content").value; // 내용 값 가져오기
    const imageFile = document.getElementById("image").files[0]; // 이미지 파일 가져오기

    formData.append("title", title); // 제목을 FormData에 추가
    formData.append("content", content); // 내용을 FormData에 추가
    formData.append("image", imageFile); // 이미지 파일을 FormData에 추가

    fetch("http://localhost:8081/post/submit", {
      // 백엔드가 실행 중인 포트로 요청을 보냅니다.
      method: "POST",
      //headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // 서버에서 보낸 메시지를 표시합니다.
        window.location.href = "/main"; // 메인 페이지로 리디렉션합니다.
      })
      .catch((error) => console.error("에러:", error));
  });