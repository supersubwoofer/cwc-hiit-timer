export let sprintCounter = (counter, warmup, sprint, rest) : number => {
  return (counter - warmup) % (sprint + rest);
}
export let restCounter = (counter, warmup, sprint, rest) : number => {
  return sprintCounter(counter, warmup, sprint, rest) - sprint;
}
export let coolDownCounter = (sets, counter, warmup, sprint, rest) : number => {
  return (counter - warmup) - (sets * (sprint + rest));
}
export let currentRound = (counter, warmup, sprint, rest) : number => {
  if(counter <= warmup)
    return 1;
  else
    return Math.ceil((counter - warmup + 1)/(sprint + rest));
}