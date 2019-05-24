export let padTime = (time:number) => { return time.toString().padStart(2, '0') }
export let countDown = (count, current) => { return count - current; }
export let secToHMS = (sec:number, format?:string) => {
  var h, m, s; 
  s = sec % 60;
  m = Math.floor(sec/60); 
  h = Math.floor(m/60); 
  
  if(format){
    let formatLower = format.toLowerCase();
    if(formatLower == 'hh:mm:ss')
      return padTime(h % 24) + ":" + padTime(m % 60) + ":" + padTime(s);
    if(formatLower == 'hh:mm')
      return padTime(h % 24) + ":" + padTime(m % 60);
    if(formatLower == 'mm:ss')
      return padTime(m % 60) + ":" + padTime(s);
    if(formatLower == 'ss')
      return padTime(s);

    return padTime(h % 24) + ":" + padTime(m % 60) + ":" + padTime(s);
  }
  return padTime(h % 24) + ":" + padTime(m % 60) + ":" + padTime(s);
}