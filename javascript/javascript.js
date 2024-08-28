let currentDiscourse = null;

function speakContent() {
  // 如果有正在朗讀的內容，則先停止
  if (currentDiscourse) {
    window.speechSynthesis.cancel();
  }
  // 如果有正在朗讀的內容，則先停止
  let synth = window.speechSynthesis;
  // 獲取網頁內容
  let content = document.body.innerText;
  // 創建一個 SpeechSynthesisUtterance 對象
  currentDiscourse = new SpeechSynthesisUtterance(content);
  // 設置語音屬性（可選）
  currentDiscourse.lang = "zh-hk";
  // 播放聲音
  synth.speak(currentDiscourse);
  // 監聽頁面卸載事件
  window.addEventListener("beforeunload", stopSpeech);
}

function stopSpeech() {
  if (currentDiscourse) {
    window.speechSynthesis.cancel(); // 取消所有正在朗读的内容
  }
}

// 清理事件監聽器以避免內存泄漏
window.addEventListener("unload", function () {
  window.removeEventListener("beforeunload", stopSpeech);
});

//Map
function initMap() {
  // 創建地圖對象，並設置地圖的初始中心點和縮放級別
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 22.3360733, lng: 114.1765716 }, // 香港, 九龍 多福道
  });

  // 定義三個位置的坐標
  var locations = [
    { lat: 22.3036213, lng: 114.1892251, title: "培育教育中心 - 九龍黃埔" },
    { lat: 22.2855969, lng: 114.2166696, title: "培育教育中心 - 香港島康怡" },
    { lat: 22.500254, lng: 114.1317411, title: "培育教育中心 - 粉嶺中心 " },
  ];

  // 遍歷位置數組，添加標記到地圖上
  locations.forEach(function (location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.title,
    });
  });
}

let attempts = 0;
const maxAttempts = 5;
const loginForm = document.getElementById("loginForm");
let loginInput = document.getElementById("login");
let passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login_btn");

loginInput.addEventListener("input", function () {
  if (loginInput.value.trim() !== "") {
    loginInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        passwordInput.focus(); // 短暫延遲後將焦點移至密碼輸入字段
      }
    });
  }
});

passwordInput.addEventListener("input", function () {
  if (passwordInput.value.trim() !== "") {
    passwordInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        loginBtn.focus(); // 短暫延遲後將焦點移至登入按鈕
      }
    });
  }
});

//用於登入目的
const credentials = [
  { id: 1, username: "user1234", password: "pass1234" },
  { id: 2, username: "user2345", password: "pass2345" },
  // Add more users as needed
];

function checkCredentials(username, password) {
  const user = credentials.find(
    (user) => user.username === username && user.password === password
  );
  return user !== undefined;
}

loginBtn.addEventListener("click", function (e) {
  e.preventDefault(); // 阻止表单默认提交行为
  const username = loginInput.value.trim();
  const password = passwordInput.value.trim();

  if (checkCredentials(username, password)) {
    console.log("登入成功！");
    window.location.href = "./childFile.html";
  } else {
    console.log("憑證無效。請再試一次。");
    attempts++;
    document.getElementById("error-message").textContent =
      "使用者名稱或密碼不正確。";
    loginInput.value = "";
    passwordInput.value = "";

    setTimeout(() => {
      document.getElementById("error-message").textContent = "";
    }, 4000); // 延迟 4 秒

    if (attempts >= maxAttempts) {
      alert("失敗的嘗試太多了。重定向到主頁 && 請聯絡系統管理員以獲得支持!");

      window.location.href = "./index.html";
    }
  }
});
