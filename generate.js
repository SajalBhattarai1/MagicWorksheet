const answerToggle = document.getElementById('toggleAnswers');
const body = document.body;

if (answerToggle) {
  answerToggle.addEventListener('change', () => {
    if (answerToggle.checked) {
      body.classList.add('show-answers');
    } else {
      body.classList.remove('show-answers');
    }
  });
}

// Editable worksheet title and lesson
const editableFields = document.querySelectorAll('[contenteditable], .editable');
editableFields.forEach(field => {
  field.addEventListener('blur', () => {
    console.log(`Updated: ${field.textContent}`);
    // Save to local storage or send to server if needed
  });
});

// Share functionality (mock)
document.querySelector('.btn.share')?.addEventListener('click', () => {
  alert('Share link copied to clipboard!');
  // Clipboard functionality can be added here
});

// Export functionality (mock)
document.querySelector('.btn.export')?.addEventListener('click', () => {
  window.print();
});

// Bottom action buttons (mock behavior)
document.querySelector('.btn.regen')?.addEventListener('click', () => {
  const feedback = document.querySelector('.feedback input').value;
  if (feedback.trim()) {
    alert('Thanks for the feedback! Regenerating worksheet...');
    // Insert regenerate logic here
  } else {
    alert('Please enter feedback before regenerating.');
  }
});
document.querySelector('.btn.download-doc')?.addEventListener('click', () => {
    alert('Preparing Word Document... (📝 Coming Soon)');
    // Add logic here later if needed
  });
  
  document.querySelector('.btn.download-pdf')?.addEventListener('click', () => {
    alert('Preparing PDF... (📄 Coming Soon)');
    // Add logic here later if needed
  });
  document.querySelector('.nav-btn.logout')?.addEventListener('click', () => {
    alert("Logging out...");
    // window.location.href = "logout.html";
  });
  
  