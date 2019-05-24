// Model
export class Model{
  set: number
  warmUp: number
  sprint: number
  rest: number
  coolDown: number
  counter: number
  isPause: boolean
}

// Control States
export enum ControlState{
  Paused,
  Standby,
  Warmup,
  Sprint,
  Rest,
  Cooldown,
  Done,
  ErrorState
}

export let GetControlState = (model: Model): ControlState => {
  let sprintStart = model.counter - model.warmUp;
  let combineSprintRest = model.sprint + model.rest;
  let sprintCounter = sprintStart % combineSprintRest;
  let restCounter = sprintCounter - model.sprint;
  let totalSessionTime = (model.warmUp + model.coolDown) + (model.set * (model.sprint + model.rest));

  if(model.counter == 0)
    return ControlState.Standby;
  if(model.counter > 0 && model.counter < model.warmUp)
    return ControlState.Warmup;
  if((totalSessionTime - model.counter) <= 0)
    return ControlState.Done;
  if((sprintStart/combineSprintRest) >= model.set)
    return ControlState.Cooldown;
  if(sprintCounter < model.sprint)
    return ControlState.Sprint;
  if(restCounter < model.rest)
    return ControlState.Rest;
  
  return ControlState.ErrorState;
}