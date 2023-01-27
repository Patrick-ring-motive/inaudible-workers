window.InaudibleContext = window.AudioContext||window.webkitAudioContext||window.BaseAudioContext||window.OfflineAudioContext;
window.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

  
window.gestureReady = async function(){
  let gestureAudioContext = new AudioContext();
  let exponentialBackOff = 100;
  while(gestureAudioContext.state=='suspended'){
    await sleep(exponentialBackOff);
    document.body.click();
    document.body.dispatchEvent(new Event('mousedown'));
    navigator.clipboard.write(navigator.clipboard.read());
    exponentialBackOff=exponentialBackOff*1.01;
    gestureAudioContext.resume();
    console.log(gestureAudioContext.state,exponentialBackOff);
  }
  return gestureAudioContext.close();
}

window.gestureReady();

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
