import { renderComments } from "./dom.js";
import { fetchComments } from "./api.js";
import "./events.js";

async function initializeApp() {
  const comments = await fetchComments();
  renderComments(comments);
}

initializeApp(); 