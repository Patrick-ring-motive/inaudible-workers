window.InaudibleContext = window.AudioContext||window.webkitAudioContext||window.BaseAudioContext||window.OfflineAudioContext;
window.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
window.InaudibleWorker = class InaudibleWorker {
 constructor(workerURL) {


  return this.buildWorker(workerURL)
}
  
  
   async buildWorker(workerURL){

            
            while (document.readyState !== "complete") {
            document.currentScript.click();
            document.head.click();
            document.currentScript.dispatchEvent(new Event('mousedown'));
            await sleep(50);
            document.currentScript.click();
            document.head.click();
            document.currentScript.dispatchEvent(new Event('mousedown'));
             }
            this.audioContext = new InaudibleContext();
            await this.audioContext.resume();
            await this.audioContext.audioWorklet.addModule("inaudible-processor.js");
  
    
        return new AudioWorkletNode(this.audioContext, "inaudible-processor");
    
  }
  
  
}
