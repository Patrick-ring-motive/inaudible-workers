window.InaudibleContext = window.OfflineAudioContext||window.AudioContext||window.webkitAudioContext||window.BaseAudioContext;

window.InaudibleWorker = class InaudibleWorker {
 constructor(workerURL) {


  return this.buildWorker(workerURL)
}
  
  
   async buildWorker(workerURL){
       
          try {
           document.currentScript.click();
            this.audioContext = new InaudibleContext();
            await audioContext.resume();
            await audioContext.audioWorklet.addModule("inaudible-processor.js");
          } catch (e) {
            return null;
          }
    
        return new AudioWorkletNode(audioContext, "inaudible-processor");
    
  }
  
  
}
