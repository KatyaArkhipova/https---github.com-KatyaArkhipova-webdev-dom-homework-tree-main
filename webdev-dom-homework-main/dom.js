import { escapeHtml, formatDate } from "./utils.js";

export function getElements() {
  const commentsList = document.getElementById("comments-list");
  const addCommentButton = document.getElementById("add-comment-button");
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");

  return { commentsList, addCommentButton, nameInput, commentInput };
}

export function renderComments(comments) {
  const { commentsList } = getElements();
  commentsList.innerHTML = "";
  comments.forEach((comment, index) => {
    const li = document.createElement("li");
    li.className = "comment";

    const displayDate = formatDate(comment.date);

    li.innerHTML = ` <div class="comment-header"> 
    <div>${escapeHtml(comment.name)}</div> 
    <div>${displayDate}</div> 
    </div> 
    <div class="comment-body"> 
    <div class="comment-text">${escapeHtml(comment.text)}</div> 
    </div> 
    <div class="comment-footer"> 
    <div class="likes"> 
    <span class="likes-counter">${comment.likes}</span> 
    <button class="like-button ${comment.isLiked? "like-button-active-like" : ""}" data-index="${index}"></button> 
    </div> 
    </div> `;
    commentsList.appendChild(li);
  });
}
