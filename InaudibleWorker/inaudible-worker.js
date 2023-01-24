window.InaudibleContext = window.OfflineAudioContext||window.AudioContext||window.webkitAudioContext||window.BaseAudioContext;

window.InaudibleWorker = class WindowWorker {
 constructor(workerURL) {


  return this.buildWorker(workerURL)
}
  
  
    buildWorker(workerURL){
        if (!audioContext) {
          try {
            audioContext = new AudioContext();
            await audioContext.resume();
            await audioContext.audioWorklet.addModule("inaudible-processor.js");
          } catch (e) {
            return null;
          }
        }
        return new AudioWorkletNode(audioContext, "my-audio-processor");
    
  }
  
  
}
