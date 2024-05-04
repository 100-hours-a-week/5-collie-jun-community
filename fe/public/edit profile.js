"use strict";

// 수정 완료 버튼
document
  .querySelector(".edit-button")
  .addEventListener("click", function (event) {
    alert("수정 완료되었습니다. 메인 페이지로 이동합니다.");
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/main"; // 이동할 URL 지정
  });

// 수정하기 버튼
document
  .querySelector(".submit-button")
  .addEventListener("click", function (event) {
    alert("수정되었습니다.");
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/main"; // 이동할 URL 지정
  });

// 상단 드롭다운
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
  
// 이미지를 클릭하여 파일 선택창 열기
document.querySelector('.image1').addEventListener('click', function() {
  document.getElementById('profile-pic').click();
});

// 파일 입력(input) 요소에 change 이벤트 리스너 추가
document.getElementById('profile-pic').addEventListener('change', function(event) {
  const selectedFile = event.target.files[0]; // 선택한 파일 가져오기

  // 파일이 선택되었는지 확인
  if (selectedFile) {
      const reader = new FileReader(); // FileReader 객체 생성

      // 파일 읽기
      reader.readAsDataURL(selectedFile);

      // 읽기가 완료되었을 때의 이벤트 핸들러
      reader.onload = function() {
          const imageElement = document.querySelector('.image1'); // 화면에 표시할 이미지 요소 가져오기
          imageElement.src = reader.result; // 이미지 요소의 src 속성에 읽은 데이터(이미지) 할당하여 화면에 표시
          imageElement.classList.add('rounded-image'); // 이미지 요소에 동그랗게 보이도록 클래스 추가
      }
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("nickname");
  const nicknameHelperText = document.querySelector("#nickname-helper");

  nicknameInput.addEventListener("input", function (event) {
    const nickname = event.target.value;
    if (nickname.trim() === "") {
      nicknameHelperText.textContent = "*닉네임을 입력해주세요";
    } else if (nickname.includes(" ")) {
      nicknameHelperText.textContent = "*띄어쓰기를 없애주세요";
    } else if (nickname.length > 10) {
      nicknameHelperText.textContent =
        "*닉네임은 최대 10자까지 작성 가능합니다";
    } else {
      // 유효한 닉네임 형식이면 이메일 중복 확인
      checkNicknameDuplicate(nickname);
    }
  });

  //여기는 성공
  function checkNicknameDuplicate(nickname) {
    fetch("http://localhost:8081/users/check-nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.isDuplicate) {
          nicknameHelperText.textContent = "*중복된 닉네임입니다";
        } else {
          nicknameHelperText.textContent = "";
        }
      })
      .catch((error) =>
        console.error("Error checking nickname duplicate:", error)
      );
  }
});

// 문서 클릭 이벤트
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const withdrawalButton = document.querySelector(".withdrawal");

  withdrawalButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const modalCancelButton = document.querySelector(".modal-cancel");

  modalCancelButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
});

// modal 확인 버튼
document
  .querySelector(".modal-check")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    window.location.href = "/login"; // 이동할 URL 지정
  });