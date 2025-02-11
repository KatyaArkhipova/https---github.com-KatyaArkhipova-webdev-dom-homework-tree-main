import { escapeHtml, formatDate } from "./utils.js";
import { token } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { getComments } from "./comment.js";
import { addCommentEvent, replyEvent } from "./events.js";




export function getElements() {
    const commentsList = document.getElementById("comments-list");
    const addCommentButton = document.getElementById("add-comment-button");
    const nameInput = document.querySelector(".add-form-name");
    const commentInput = document.querySelector(".add-form-text");

    return { commentsList, addCommentButton, nameInput, commentInput };
}

/* export function renderComments(comments) {
    const commentsList = document.getElementById("comments-list");
    if (!commentsList) {
        console.error('Элемент #comments-list не найден в DOM');
        return;
    }
    commentsList.innerHTML = ""; // Очистить список комментариев

    comments.forEach((comment, index) => {
        const li = document.createElement("li");
        li.className = "comment";

        const displayDate = formatDate(comment.date);
        li.innerHTML = `
            <div class="comment-header"> 
                <div>${escapeHtml(comment.name)}</div> 
                <div>${displayDate}</div> 
            </div> 
            <div class="comment-body"> 
                <div class="comment-text">${escapeHtml(comment.text)}</div> 
            </div> 
            <div class="comment-footer"> 
                <div class="likes"> 
                    <span class="likes-counter">${comment.likes}</span> 
                    <button class="like-button ${comment.isLiked ? "like-button-active-like" : ""}" data-index="${index}"></button> 
                </div> 
            </div>`;
        commentsList.appendChild(li);
    });
} */


export function renderAddCommentForm(name, comments = getComments ()) {
  const container = document.querySelector(".container");

  const commentsHtml = comments.map((comment, index) => `
      <li class="comment">
          <div class="comment-header"> 
              <div>${escapeHtml(comment.name)}</div> 
              <div>${formatDate(comment.date)}</div> 
          </div> 
          <div class="comment-body"> 
              <div class="comment-text">${escapeHtml(comment.text)}</div> 
          </div> 
          <div class="comment-footer"> 
              <div class="likes"> 
                  <span class="likes-counter">${comment.likes}</span> 
                  <button class="like-button ${comment.isLiked ? "like-button-active-like" : ""}" data-index="${index}"></button> 
              </div> 
          </div>
      </li>
  `).join('');

  const addCommentsHtml = `
      <div class="add-form">
          <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            readonly
            value="${name}"
          />
          <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш комментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="add-comment-button">Написать</button>
          </div>
          <div class="form-loading" style="display: none; margin-top: 20px;">
              Комментарий добавляется...
          </div>
      </div>`;

  const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login">войдите</span></p>`;
  
  const baseHtml = `<ul class="comments" id="comments-list">${commentsHtml}</ul>`;
  container.innerHTML = `${baseHtml}${token ? addCommentsHtml : linkToLoginText}`;
  if (token) {
    replyEvent ()
    addCommentEvent ()
} 
  if (!token) {
      document.querySelector(".link-login").addEventListener("click", () => {
          renderLogin();
      });
  }
  

}