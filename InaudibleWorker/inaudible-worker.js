window.InaudibleContext = window.OfflineAudioContext||window.AudioContext||window.webkitAudioContext||window.BaseAudioContext;
window.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

  
window.gestureReady = async function(){
  let gestureAudioContext = new InaudibleContext(1,1,44100);
  let exponentialBackOff = 100;
  while(gestureAudioContext.state=='suspended'){
    await sleep(exponentialBackOff);
    document.body.click();
    document.body.dispatchEvent(new Event('mousedown'));
    exponentialBackOff=exponentialBackOff*1.01;
    gestureAudioContext.resume();
    console.log(gestureAudioContext.state,exponentialBackOff);
  }
  return gestureAudioContext.close();
}



window.InaudibleWorker = class InaudibleWorker {
 constructor(workerURL) {


  return this.buildWorker(workerURL)
}
  
  
   async buildWorker(workerURL){

           // await window.gestureReady();

            this.audioContext = new InaudibleContext(1,1,44100);
            //await this.audioContext.resume();
            await this.audioContext.audioWorklet.addModule("inaudible-processor.js");
  
    
        return new AudioWorkletNode(this.audioContext, "inaudible-processor");
    
  }
  
  
}
