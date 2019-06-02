import { LitElement, customElement, property, TemplateResult } from 'lit-element';
import * as view from './presentation';
import { secToHMS, countDown } from './timerHelper';
import { currentRound, sprintCounter, restCounter, coolDownCounter } from './counterHelper';
import { Model, ControlState, GetControlState } from './stateHelper';

@customElement('hiit-timer')
export class HiitTimer extends LitElement {
  @property({type : String}) title = "Sprint-8";
  @property({type : String}) description = "Sprint-8 description ...";
  @property({type : Number}) set = 8;
  @property({type : Number}) warmUp = 300;
  @property({type : Number}) sprint = 20;
  @property({type : Number}) rest = 90;
  @property({type : Number}) coolDown = 300;
  @property({type : Number}) private counter = 0;
  @property({type : Number}) private timerID = -1;
  @property({type : Boolean}) private isPause = false;

  render() {
    let controlState = GetControlState({
      set: this.set,
      warmUp: this.warmUp,
      sprint: this.sprint,
      rest: this.rest,
      coolDown: this.coolDown,
      counter: this.counter,
      isPause: this.isPause
    });

    let buttonsTemplate = view.layoutButtons(
      this.isPause, this.StartHandler, this.PauseHandler, this.ResetHandler);

    return (controlState == ControlState.Standby || controlState == ControlState.Done)?
      view.layoutMain(this.title, this.GetBodyTemplate(controlState)) :
      view.layoutMain(this.title, this.GetBodyTemplate(controlState), buttonsTemplate); 
  }

  // Lifecycle hooks
  updated(changedProperties) {
    let controlState = GetControlState({
      set: this.set,
      warmUp: this.warmUp,
      sprint: this.sprint,
      rest: this.rest,
      coolDown: this.coolDown,
      counter: this.counter,
      isPause: this.isPause
    });

    switch(controlState) {
      case ControlState.Done: clearInterval(this.timerID);
    }

  }

  // Event Handlers & callbacks
  StartHandler() : void {
    clearInterval(this.timerID);
    this.timerID = setInterval(this.Increament, 1000, this);
    this.isPause = false;
  }
  PauseHandler() : void {
    clearInterval(this.timerID);
    this.isPause = true;
  }
  ResetHandler() : void {
    clearInterval(this.timerID);
    this.counter = 0;
    this.isPause = false;
  }

  Increament = (self) : void => self.counter = self.counter + 1;

  // Helpers
  GetBodyTemplate(controlState:ControlState){
    switch(controlState) {
      case ControlState.Standby: return view.standby(this.description, this.StartHandler);
      case ControlState.Warmup: 
        return view.warmUp(
        secToHMS(countDown(this.warmUp, this.counter), 'mm:ss'), 
        secToHMS(this.counter));
      case ControlState.Sprint: return view.sprint(
        currentRound(this.counter, this.warmUp, this.sprint, this.rest),
        secToHMS(countDown(this.sprint, sprintCounter(this.counter, this.warmUp, this.sprint, this.rest)), 'mm:ss'), 
        secToHMS(this.counter));
      case ControlState.Rest:
        return view.rest(
        currentRound(this.counter, this.warmUp, this.sprint, this.rest),
        secToHMS(countDown(this.rest, restCounter(this.counter, this.warmUp, this.sprint, this.rest)), 'mm:ss'), 
        secToHMS(this.counter));
      case ControlState.Cooldown:
        return view.coolDown(
        secToHMS(countDown(this.coolDown, coolDownCounter(this.set, this.counter, this.warmUp, this.sprint, this.rest)), 'mm:ss'), 
        secToHMS(this.counter));
      case ControlState.Done:
        return view.done(secToHMS(this.counter), this.ResetHandler);
      default:
        return view.error();
      }
  }
}