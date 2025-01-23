import { renderComments } from "./dom.js";
import { updateComments } from "./comment.js";
import { fetchComments } from "./api.js";
import "./events.js";

document.querySelector(".comments").innerHTML =
"Пожалуйста подождите, загружаю комментарий..."

async function initializeApp() {
const comments = await fetchComments();
updateComments(comments);
renderComments(comments);

}

initializeApp(); 
