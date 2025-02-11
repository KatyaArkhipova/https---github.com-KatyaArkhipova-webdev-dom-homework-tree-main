import { login, setName, setToken } from "./api.js";
import { renderAddCommentForm } from "./dom.js";
import { renderRegistration } from "./renderRegistration.js";

export function renderLogin() {
  const container = document.querySelector(".container");

  
  const loginHtml = `
  <section class="add-form">
      <h1>Форма входа</h1>
      <input
          type="text"
          class="add-form-name"
          placeholder="Введите логин"
          id="login"
          required
      />
      <input
          type="password"
          class="add-form-name"
          placeholder="Введите пароль"
          id="password"
          required
      />
      <fieldset class="add-form-registry">
          <button class="add-form-button-main button-main" type="submit">
              Войти
          </button>
          <u class="add-form-button-link registry">Зарегистрироваться</u>
      </fieldset>
  </section>`;

  container.innerHTML = loginHtml;

  
  document.querySelector(".registry").addEventListener("click", () => {
      renderRegistration();
  });

  const loginEl = document.querySelector("#login");
  const passwordEl = document.querySelector("#password");
  const submitButtonEl = document.querySelector(".button-main");

  
  submitButtonEl.addEventListener("click", (event) => {
      event.preventDefault();

      
      login(loginEl.value, passwordEl.value)
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Ошибка при авторизации");
              }
              return response.json();
          })
          .then((data) => {
              setToken(data.user.token);
              setName(data.user.name);
              renderAddCommentForm(data.user.name);
          })
          .catch((error) => {
              alert(error.message);
          });
  });
}