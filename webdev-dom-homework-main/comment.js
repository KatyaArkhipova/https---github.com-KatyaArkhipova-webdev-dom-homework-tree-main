import { renderComments } from "./dom.js";
import { escapeHtml } from "./utils.js";
import { fetchComments, postComment } from "./api.js";

let comments = [];

export const updateComments = (newComments) => {
  comments = newComments;
};


export function toggleLike(index) {
  const comment = comments[index];
  comment.isLiked = !comment.isLiked;
  comment.likes += comment.isLiked ? 1 : -1;
  renderComments(comments);
}


export async function addNewComment(name, text) {

  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');

  
  const originalName = nameInput.value;
  const originalText = textInput.value;

  const formLoadingElement = document.querySelector(".form-loading");
  const addFormElement = document.querySelector(".add-form");

  try {
    await postComment(escapeHtml(text), escapeHtml(name));
    comments = await fetchComments();
    renderComments(comments);

    nameInput.value = '';
    textInput.value = '';

    formLoadingElement.style.display = "none";
    addFormElement.style.display = "flex";
  } 
  catch (error)  {
    formLoadingElement.style.display = "none";
    addFormElement.style.display = "flex";

    nameInput.value = originalName;
    textInput.value = originalText;

    if (error.message === "Failed to fetch") {
      alert("Кажется, у вас сломался интернет, попробуйте позже")
    }

    if (error.message === "Ошибка сервера") {
      alert("Ошибка сервера")
    }

    if (error.message === "Неверный запрос") {
      alert("Имя и комментарий должны быть не менее 3-х символов")
    }
  
  }
}

export default comments;
