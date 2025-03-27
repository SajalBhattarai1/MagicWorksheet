document.addEventListener("DOMContentLoaded", () => {
    // Show/hide password toggle
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("password");
  
    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.getAttribute("type") === "password";
      passwordInput.setAttribute("type", isPassword ? "text" : "password");
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  
    // Toggle OTP input visibility
    const otpBtn = document.querySelector(".btn.btn-secondary"); // The "Login with OTP" button
    const otpSection = document.getElementById("otp-section");
  
    otpBtn.addEventListener("click", () => {
      // Toggle display
      const isHidden = otpSection.style.display === "none" || otpSection.style.display === "";
      otpSection.style.display = isHidden ? "block" : "none";
  
      // Optional: Smooth scroll to OTP input
      if (isHidden) {
        otpSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
  