function handleLogin() {
   const email = document.getElementById('loginEmail').value;
   const password = document.getElementById('loginPassword').value;
   
   if (email && password) {
      alert('Successfully logged in! Welcome back!\nEmail: '+email);
      
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      modal.hide();
      
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPassword').value = '';
   } else {
      alert('Please enter both email and password.');
   }
}

function handleFeedback() {
   const name = document.getElementById('feedbackName').value;
   const email = document.getElementById('feedbackEmail').value;
   const message = document.getElementById('feedbackMessage').value;
   const experience = document.querySelector('input[name="experience"]:checked');
   
   if (name && email && message && experience) {
      alert(`Thank you for your ${experience.value} feedback!`);
      const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
      modal.hide();
      
      document.getElementById('feedbackName').value = '';
      document.getElementById('feedbackEmail').value = '';
      document.getElementById('feedbackMessage').value = '';
      
      document.querySelectorAll('input[name="experience"]').forEach(radio => {
         radio.checked = false;
      });
   } else {
      alert('Please fill in all fields and select an experience rating.');
   }
}