window.InaudibleContext = window.AudioContext||window.webkitAudioContext||window.BaseAudioContext||window.OfflineAudioContext;
window.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

window.gestureFailCount = 0;
window.gestureAttemptCount = 0;
if(!console.customWarn){
console.customWarn = function (...args){
console.log(arguments[0]);
  var messages = args.filter(e => typeof e == 'string');

  for(m in messages){
    if(messages[m].indexOf('gesture') != -1){
      window.gestureFaileCount++;
    };
  };

  return console.nativeWarn(...args);

};

console.nativeWarn = console.warn;

console.warn = console.customWarn;

}  
  
  
window.gestureState = async function(){
   var audioContext = new AudioContext();
  while(audioContext.state=='suspended'){
    await sleep(100);
   
    try{
    audioContext.resume();
    console.log(audioContext.state);
    }catch(e){
    console.log(e);
    }

  }
}

window.gestureState();

window.InaudibleWorker = class InaudibleWorker {
 constructor(workerURL) {


  return this.buildWorker(workerURL)
}
  
  
   async buildWorker(workerURL){

            
            while (document.readyState !== "complete") {
            document.head.click();
            document.head.dispatchEvent(new Event('mousedown'));
            await sleep(50);
            document.head.click();
            document.head.dispatchEvent(new Event('mousedown'));
             }
            try{
           // this.audioContext = new InaudibleContext();
            }catch(e){
            console.log(e.message);
            }
          //  await this.audioContext.resume();
         //   await this.audioContext.audioWorklet.addModule("inaudible-processor.js");
  
    
     //   return new AudioWorkletNode(this.audioContext, "inaudible-processor");
    
  }
  
  
}
