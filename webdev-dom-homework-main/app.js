import { renderComments } from "./dom.js";
import { updateComments } from "./comment.js";
import { fetchComments } from "./api.js";
import "./events.js";

async function initializeApp() {
  const comments = await fetchComments();
  updateComments(comments);
  renderComments(comments);
}

initializeApp(); 
