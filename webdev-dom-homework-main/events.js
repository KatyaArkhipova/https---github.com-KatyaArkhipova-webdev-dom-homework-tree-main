import { getElements, renderComments } from "./dom.js";
import { toggleLike, addNewComment } from "./comment.js";
import comments from "./comment.js";


const { commentsList, addCommentButton, nameInput, commentInput } =
  getElements();

commentsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("like-button")) {
    const index = parseInt(event.target.dataset.index);
    toggleLike(index);
  } else if (event.target.closest(".comment")) {
    const comment = event.target.closest(".comment");
    const index = Array.from(commentsList.children).indexOf(comment);
    const author = comments[index].name;
    const text = comments[index].text;
    console.log(`Replying to comment from ${author}: ${text}`);

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

  document.querySelector(".form-loading").style.display = "block"
  document.querySelector(".add-form").style.display = "none" 

  addNewComment(nameInput.value, commentInput.value);
  
  nameInput.value = "";
  commentInput.value = "";
});

