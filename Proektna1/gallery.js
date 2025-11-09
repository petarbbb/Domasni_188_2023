document.addEventListener('DOMContentLoaded', function() {
   // Like
   document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', function() {
         const postId = this.getAttribute('data-post');
         const likeCount = this.querySelector('.like-count');
         likeCount.textContent = parseInt(likeCount.textContent) + 1;
      });
   });

   // Dislike
   document.querySelectorAll('.dislike-btn').forEach(button => {
      button.addEventListener('click', function() {
         const postId = this.getAttribute('data-post');
         const dislikeCount = this.querySelector('.dislike-count');
         dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
      });
   });

   // Comment
   document.querySelectorAll('.add-comment').forEach(button => {
      button.addEventListener('click', function() {
         const postId = this.getAttribute('data-post');
         const commentInput = document.querySelector(`.comment-input[data-post="${postId}"]`);
         const commentText = commentInput.value.trim();
         
         if (commentText) {
            const commentsContainer = document.querySelector(`.comments-container[data-post="${postId}"]`);
            const commentElement = document.createElement('div');
            commentElement.className = 'comment bg-light p-2 mb-2 rounded';
            commentElement.textContent = commentText;
            commentsContainer.appendChild(commentElement);
            commentInput.value = '';
         }
      });
   });

   // Enter preku tastatura za da se postavi komentarot
   document.querySelectorAll('.comment-input').forEach(input => {
      input.addEventListener('keypress', function(e) {
         if (e.key === 'Enter') {
            const postId = this.getAttribute('data-post');
            document.querySelector(`.add-comment[data-post="${postId}"]`).click();
         }
      });
   });
});