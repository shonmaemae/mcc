document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page from refreshing

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!fullname || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Save to localStorage
  localStorage.setItem("mcc_fullname", fullname);
  localStorage.setItem("mcc_email", email);
  localStorage.setItem("mcc_password", password);

  alert("Registration successful! You can now log in.");
  window.location.href = "loginpage.html"; // Redirect to login
});
