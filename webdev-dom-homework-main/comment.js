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
  try {
    
    await postComment(escapeHtml(text), escapeHtml(name));
    comments = await fetchComments();
    renderComments(comments);
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
  }
}

export default comments;