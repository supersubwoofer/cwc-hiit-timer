import { html, TemplateResult } from 'lit-html';

export const layoutMain = (title:string, bodyTemplate:TemplateResult, buttonSectionTemplate?:TemplateResult) => html`
  <p class="hiit-title">${title}</p>
  ${bodyTemplate}
  ${buttonSectionTemplate}
  `;

const layoutBody = (subTitle:string, countDown:string, timer:string, roundNumber?:number) => html`
  <div class="hiit-body">
    ${roundNumber?
      html`<p>Round: ${roundNumber}</p>`:
      html``
    }
    <p>${subTitle}</p>
    <p>${countDown}</p>
    <p>${timer}</p>
  </div>
  `;

export const layoutButtons = (isPause:boolean, startActionHandler, pauseHandler, resetActionHandler) => html`
  <div class="hiit-buttons">
  <button @click="${startActionHandler}">Start</button>
  <button @click="${pauseHandler}">Pause</button>
  <button @click="${resetActionHandler}">Restart</button>
  </div>
  `;

export const standby = (workoutDescription:string, startActionHandler) => html`
  <p>${workoutDescription}</p>
  <button @click="${startActionHandler}">Start</button>
  `;

export const warmUp = (countDown:string, timer:string) => 
  layoutBody("Warm Up", countDown, timer);

export const sprint = (roundNumber:number, countDown:string, timer:string) => 
  layoutBody("Sprint", countDown, timer, roundNumber);

export const rest = (roundNumber:number, countDown:string, timer:string) => 
  layoutBody("Rest", countDown, timer, roundNumber);

export const coolDown = (countDown:string, timer:string) => 
  layoutBody("Cool Down", countDown, timer);

export const done = (timer:string, resetActionHandler) => html`
  <p>Done !</p>
  <p>You have finished a HIIT session of ${timer}.</p>
  <button @click="${resetActionHandler}">Restart</button>
  `;

export const error = () => html`<p>Error</p>`;