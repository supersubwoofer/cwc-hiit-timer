import { LitElement, customElement, property, TemplateResult } from 'lit-element';
import * as view from './presentation';
import { secToHMS, countDown } from './timerHelper';
import { currentRound, sprintCounter, restCounter, coolDownCounter } from './counterHelper';
import { Model, ControlState, GetControlState } from './stateHelper';

@customElement('hiit-timer')
export class HiitTimer extends LitElement {
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

    switch(controlState) {
      case ControlState.Standby: return view.standby(this.StartHandler);
      case ControlState.Warmup: 
        return view.warmUp(
        secToHMS(countDown(this.warmUp, this.counter), 'mm:ss'), 
        secToHMS(this.counter), this.PauseHandler);
      case ControlState.Sprint: return view.sprint(
        currentRound(this.counter, this.warmUp, this.sprint, this.rest),
        secToHMS(countDown(this.sprint, sprintCounter(this.counter, this.warmUp, this.sprint, this.rest)), 'mm:ss'), 
        secToHMS(this.counter), this.PauseHandler);
      case ControlState.Rest:
        return view.rest(
        currentRound(this.counter, this.warmUp, this.sprint, this.rest),
        secToHMS(countDown(this.rest, restCounter(this.counter, this.warmUp, this.sprint, this.rest)), 'mm:ss'), 
        secToHMS(this.counter), this.PauseHandler);
      case ControlState.Cooldown:
        return view.coolDown(
        secToHMS(countDown(this.coolDown, coolDownCounter(this.set, this.counter, this.warmUp, this.sprint, this.rest)), 'mm:ss'), 
        secToHMS(this.counter));
      case ControlState.Done:
        return view.done(secToHMS(this.counter));
      default:
        return view.error();
    }
  }

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
      case ControlState.Done: this.ClearInterval(this.timerID);
    }

  }

  StartHandler() : void {
    this.ClearInterval(this.timerID);
    this.timerID = setInterval(this.Increament, 1000, this);
    this.isPause = false;
  }
  PauseHandler() : void {
    this.ClearInterval(this.timerID);
    this.isPause = true;
  }
  ResetHandler() : void {
    this.ClearInterval(this.timerID);
    this.counter = 0;
    this.isPause = false;
  }

  Increament(self) : void {
    self.counter = self.counter + 1;
  }
  ClearInterval(timerID) : void {
    clearInterval(timerID);
  }

}