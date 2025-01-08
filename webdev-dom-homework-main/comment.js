import { renderComments } from "./dom.js";
import { escapeHtml } from "./utils.js";

let comments = [
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

export function toggleLike(index) {
  const comment = comments[index];
  comment.liked = !comment.liked;
  comment.likes += comment.liked ? 1 : -1;
  renderComments(comments);
}

export function addNewComment(name, text) {
  const currentDate = new Date().toLocaleString();
  const newComment = {
    name: escapeHtml(name),
    date: currentDate,
    text: escapeHtml(text),
    likes: 0,
    liked: false,
  };
  comments.push(newComment);
  renderComments(comments);
}

export default comments;
