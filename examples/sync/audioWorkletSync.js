void function WorkletBuilder(){
  if(!self.window){return;}
  window.SyncWorkletContext = window.OfflineAudioContext||window.AudioContext||window.webkitAudioContext||window.BaseAudioContext;
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
      exponentialBackOff=exponentialBackOff*1.1;
      gestureAudioContext.resume();
      console.log(gestureAudioContext.state,exponentialBackOff);
    }
    return gestureAudioContext.close();
  }
  
  
  
  window.InaudibleWorker = class InaudibleWorker {
   constructor(workerURL) {
    this.loaded=this.buildWorker(workerURL);
    return this;
  }
    
      postMessage(message, transfer) {
    try{
      return this.node.port.postMessage(message, transfer);
      }catch(e){
      this.tryPostMessage(message, transfer);
      }
    }
    
       async tryPostMessage(message, transfer) {
         let exponentialBackOff = 100;
      while(true){
        await sleep(exponentialBackOff);
          exponentialBackOff=exponentialBackOff*1.1;
        try{
        return this.node.port.postMessage(message, transfer);
        }catch(e){
        continue;
        }
        break;
      }
    
  
    }
    
    set onmessage(msg){
    try{
    this.node.port.onmessage = msg;
    return this.node.port.onmessage;
    }catch(e){
    this.trymessage(msg);
    }
    }
        
    async trymessage(msg){
         let exponentialBackOff = 100;
      while(true){
        await sleep(exponentialBackOff);
          exponentialBackOff=exponentialBackOff*1.1;
    try{
    this.node.port.onmessage = msg;
    return this.node.port.onmessage;
    }catch(e){
    continue;
    }
    break;
      }
    }
    
     async buildWorker(workerURL){

       
       
              if(!window.OfflineAudioContext){
                await window.gestureReady();
              }
              this.audioContext = new SyncWorkletContext(1,1,44100);
              if(!window.OfflineAudioContext){
                await this.audioContext.resume();
              }
              await this.audioContext.audioWorklet.addModule( document.currentScript );
              this.node=new AudioWorkletNode(this.audioContext, "sync-processor");
              return this.node;
        
      
    }
    
    
  }
}?.();

void function WorkletProcessor(){
  if(self.window){return;}
  
  class SyncAudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
  this.self=this;
  globalThis.self=this;
 // WORKLETSCRIPT
      console.log('processor created');
    }
    
    set onmessage(msg){
    
    this.port.onmessage = msg;
    return this.port.onmessage;
    
    }
    postMessage(message,transfer){
    
    return this.port.postMessage(message,transfer);
    
    }
    
    process(inputList, outputList, parameters) {
      return true;
    }
  };
  
  registerProcessor("sync-processor", SyncAudioProcessor);

}?.();
