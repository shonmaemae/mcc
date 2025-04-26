  document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents page from refreshing

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Get user details from localStorage
  const storedEmail = localStorage.getItem("mcc_email");
  const storedPassword = localStorage.getItem("mcc_password");
  const storedName = localStorage.getItem("mcc_fullname");

  // Default admin account
  const defaultEmail = "admin@mcc.com.ph";
  const defaultPassword = "admin123";
  const defaultName = "Maemae";

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Check if input matches stored account or default admin account
  if (
    (email === storedEmail && password === storedPassword) ||
    (email === defaultEmail && password === defaultPassword)
  ) {
    const userName = (email === defaultEmail) ? defaultName : storedName;
    window.location.href = `mcc-homepage-log.html?user=${encodeURIComponent(userName)}`;
  } else {
    const verifiedText = document.querySelector(".verified");
    verifiedText.style.color = "red";
    verifiedText.textContent = "Invalid email or password!";
  }
});
