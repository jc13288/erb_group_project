let attempts = 0;
const maxAttempts = 5;

const CheckEmail = [
  {
    id: 1,
    username: "user1234",
    password: "pass1234",
    email: "user1234@123.com",
  },
  {
    id: 2,
    username: "user2345",
    password: "pass2345",
    email: "user2345@123.com",
  },
  // Add more users as needed
];

function resetInput() {
  document.getElementById("email").value = "";
}

const resetPasswordForm = document.getElementById("resetPasswordForm");

resetPasswordForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const user = CheckEmail.find((user) => user.email === email);

  if (user) {
    // Send email to the user
    console.log(`Email sent to ${user.email}`);
    const errorMessages = document.getElementById("error-messages");
    errorMessages.innerText = "電子郵件已發送至 " + user.email + "。";

    setTimeout(() => {
      document.getElementById("error-messages").textContent = "";
      document.getElementById("email").value = "";
    }, 4000); // 延迟 4 秒
  } else {
    // 顯示錯誤訊息
    const errorMessages = document.getElementById("error-messages");
    errorMessages.innerText = "錯誤：用戶名不正確。";
    attempts++;
    setTimeout(() => {
      document.getElementById("error-messages").textContent = "";
      document.getElementById("email").value = "";
    }, 4000); // 延迟 4 秒

    if (attempts >= maxAttempts) {
      alert("失敗的嘗試太多了。重定向到主頁 && 請聯絡系統管理員以獲得支持!");
      window.location.href = "./index.html";
    }
  }
});
