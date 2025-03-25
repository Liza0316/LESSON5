document.getElementById("contactform").addEventListener("submit", function (e) {
    e.preventDefault();
  
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  
    let isValid = true;
  
    const nameField = document.getElementById("name");
    const ageField = document.getElementById("age");
    const emailField = document.getElementById("email");
    const siteField = document.getElementById("company");
    const msgField = document.getElementById("message");
  
    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ -]{2,30}$/;
    if (!nameRegex.test(nameField.value.trim())) {
      showError(nameField, "*Мінімцм від 2 до 30 літер.");
      isValid = false;
    }
  
    const age = parseInt(ageField.value, 10);
    if (isNaN(age) || age < 18 || age > 130) {
      showError(ageField, "*число в діапазоні 18-130.");
      isValid = false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      showError(emailField, "*Невірний формат електронної пошти.");
      isValid = false;
    }
  
    if (siteField.value.trim() !== "") {
      try {
        new URL(siteField.value);
      } catch {
        showError(siteField, "*Введіть коректну URL-адресу або залиште поле порожнім.");
        isValid = false;
      }
    }
  
    const messageText = msgField.value.trim();
    if (messageText.length < 10 || messageText.length > 350) {
      showError(msgField, "*Повідомлення має містити від 10 до 350 символів.");
      isValid = false;
    }
  
    if (isValid) {
      alert("Форма успішно пройдена!"); 
    }
  });
  
  function showError(field, message) {
    field.classList.add("invalid");
  
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
  
    field.parentNode.appendChild(error);
  
    field.addEventListener("focus", function handler() {
      field.classList.remove("invalid");
      const msg = field.parentNode.querySelector(".error-message");
      if (msg) msg.remove();
      field.removeEventListener("focus", handler); 
    });
  }
