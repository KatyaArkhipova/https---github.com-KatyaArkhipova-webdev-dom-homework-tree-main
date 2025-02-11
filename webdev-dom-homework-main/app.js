import { renderAddCommentForm } from "./dom.js";
import { updateComments } from "./comment.js";
import { fetchComments, name } from "./api.js";
import "./events.js"




async function initializeApp() {
const comments = await fetchComments();
updateComments(comments);
//renderComments(comments);
renderAddCommentForm(name, comments)

}

initializeApp(); 