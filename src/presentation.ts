import { html } from 'lit-html';

export const error = () => html`<p>Error</p>`;
export const standby = (title, startActionHandler) => html`
  <p>${title}</p>
  <button @click="${startActionHandler}">Start</button>
  `;

export const warmUp = (countDown, timer, pauseHandler) => html`
  <p>Warm up</p>
  <p>${countDown}</p>
  <p>${timer}</p>
  <button @click="${pauseHandler}">Pause</button>
  `;

export const sprint = (roundNumber, countDown, timer, pauseHandler) => html`
  <p>Round: ${roundNumber}</p>
  <p>Sprint</p>
  <p>${countDown}</p>
  <p>${timer}</p>
  <button @click="${pauseHandler}">Pause</button>
  `;

export const rest = (roundNumber, countDown, timer, pauseHandler) => html`
  <p>Round: ${roundNumber}</p>
  <p>Rest</p>
  <p>${countDown}</p>
  <p>${timer}</p>
  <button @click="${pauseHandler}">Pause</button>
  `;

export const coolDown = (countDown, timer) => html`
  <p>Cool Down</p>
  <p>${countDown}</p>
  <p>${timer}</p>
  `;

export const done = (timer) => html`
  <p>Done !</p>
  <p>You have finished a HIIT session of ${timer}.</p>
  `;