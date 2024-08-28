document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.innerText = "";

    if (!validateForm(form, errorMessage)) {
      return;
    }

    const formData = new FormData(form);
    const formValues = {};

    for (let [key, value] of formData.entries()) {
      formValues[key] = value;
    }

    const jsonData = JSON.stringify(formValues);
    console.log(jsonData);
    errorMessage.innerText = "數據已被記錄。";

    setTimeout(() => {
      if (errorMessage) {
        errorMessage.textContent = "";
      }
      resetInput();
    }, 4000);

    // 您現在可以根據需要使用 jsonData，例如，將其傳送到伺服器
  });
});

function validateForm(form, errorMessage) {
  const isPasswordValid = checkPassword(
    form.password.value,
    form.ReCheckPassword.value
  );

  if (!isPasswordValid) {
    errorMessage.innerText = "密碼不匹配.";
    return false;
  }

  const inputDate = new Date(form.Birthdate.value);
  console.log("inputDate: " + inputDate);

  // 获取今天的日期
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log("today: " + today);

  const isDateValid = checkDate(today, inputDate);

  if (!isDateValid) {
    errorMessage.innerText = "出生日期不應晚於今天。";
    return false;
  }

  const formInputs = form.querySelectorAll("input, textarea, select");
  for (let input of formInputs) {
    if (input.hasAttribute("required") && input.value.trim() === "") {
      errorMessage.innerText = "請填寫所有必填欄位。.";
      return false;
    }

    if (!input.value) {
      errorMessage.innerText = "請填寫所有必填欄位。";
      return false;
    }
  }
  return true;
}

// Define checkPassword function
function checkPassword(password, reCheckPassword) {
  return password === reCheckPassword && password.trim() !== "";
}

function checkDate(today, inputDate) {
  if (inputDate > today) {
    // 修正了邏輯：檢查日期是否晚於今天
    return false;
  }
  return true;
}

// Define resetInput function
function resetInput() {
  const form = document.getElementById("myForm");
  form.reset();
}
