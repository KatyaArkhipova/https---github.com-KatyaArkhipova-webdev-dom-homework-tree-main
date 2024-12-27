
document.addEventListener("DOMContentLoaded", function () {
    const commentsList = document.getElementById("comments-list");
    const addCommentButton = document.getElementById("add-comment-button");
    const nameInput = document.querySelector(".add-form-name");
    const commentInput = document.querySelector(".add-form-text");

    const comments = [
      {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        likes: 3,
        liked: false,
      },
      {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        likes: 75,
        liked: true,
      },
    ];

    function renderComments() {
      commentsList.innerHTML = "";
      comments.forEach((comment, index) => {
        const li = document.createElement("li");
        li.className = "comment";
        li.innerHTML = `
              <div class="comment-header">
                  <div>${comment.name}</div>
                  <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                  <div class="comment-text">${comment.text}</div>
              </div>
              <div class="comment-footer">
                  <div class="likes">
                      <span class="likes-counter">${comment.likes}</span>
                      <button class="like-button ${
                        comment.liked ? "like-button-active-like" : ""
                      }" data-index="${index}"></button>
                  </div>
              </div>
          `;
        commentsList.appendChild(li);
      });
    }

    function toggleLike(index) {
      const comment = comments[index];
      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
      renderComments();
    }

    commentsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("like-button")) {
        const index = event.target.dataset.index;
        toggleLike(index);
      } else if (event.target.closest(".comment")) {
        const comment = event.target.closest(".comment");
        const index = Array.from(commentsList.children).indexOf(comment);
        const author = comments[index].name;
        const text = comments[index].text; 

        
        commentInput.value = `@${author}: ${text}`;
        nameInput.value = "";
        commentInput.focus();
      }
    });

    addCommentButton.addEventListener("click", function () {
      if (!nameInput.value || !commentInput.value) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      const currentDate = new Date().toLocaleString();

      const newComment = {
        name: escapeHtml(nameInput.value),
        date: currentDate,
        text: escapeHtml(commentInput.value),
        likes: 0,
        liked: false,
      };

      comments.push(newComment);
      renderComments();

      nameInput.value = "";
      commentInput.value = "";
    });

    function escapeHtml(unsafe) {
      return unsafe
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    renderComments();
  });