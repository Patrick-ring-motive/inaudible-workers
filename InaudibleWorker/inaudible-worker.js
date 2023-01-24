window.InaudibleContext = window.AudioContext||window.webkitAudioContext||window.BaseAudioContext||window.OfflineAudioContext;

window.InaudibleWorker = class InaudibleWorker {
 constructor(workerURL) {


  return this.buildWorker(workerURL)
}
  
  
   async buildWorker(workerURL){
       
          try {
           document.currentScript.click();
            this.audioContext = new InaudibleContext();
            await this.audioContext.resume();
            await this.audioContext.audioWorklet.addModule("inaudible-processor.js");
          } catch (e) {
            return null;
          }
    
        return new AudioWorkletNode(this.audioContext, "inaudible-processor");
    
  }
  
  
}
