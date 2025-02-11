import { renderAddCommentForm } from "./dom.js";
import { registration, setName, setToken } from "./api.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = () => {
    const container = document.querySelector(".container");

    const registrationHtml = `
        <section class="add-form">
            <h1>Форма регистрации</h1>
            <input
        type="text"
        class="add-form-name"
        placeholder="Введите имя"
        id="name"
        required
        />
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
      ></input>
      <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">
             Зарегистрироваться</button>
        <u class="add-form-button-link registry">
          Войти
        </u>
        </fieldset>
        </section>
    `;

    container.innerHTML = registrationHtml;

    document.querySelector(".registry").addEventListener("click", () => {
        renderLogin(); 
    });

    const nameEl = document.querySelector("#name");
    const loginEl = document.querySelector("#login");
    const passwordEl = document.querySelector("#password");
    const submitButtonEl = document.querySelector(".button-main");

    submitButtonEl.addEventListener("click", (event) => {
          registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при регистрации');
                }
                return response.json();
            })
            .then((data) => {
                setToken(data.user.token);
                setName(data.user.name);
                renderAddCommentForm(data.user.name);
            })
            .catch(error => {
                alert(error.message);
            });
    });
};