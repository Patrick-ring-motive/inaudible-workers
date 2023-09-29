
  
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
              await this.audioContext.audioWorklet.addModule( workerURL );
              this.node=new AudioWorkletNode(this.audioContext, "sync-processor");
              return this.node;
        
      
    }
    
    
  }
void function WorkletBuilder(){
  if(!globalThis.window){return;}
  console.log('WorkletBuilder');
  const myWorker = new InaudibleWorker(document.currentScript);
}?.();

void function WorkletProcessor(){
  if(globalThis.window){return;}
    console.log('WorkletProcessor');
  class SyncAudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
  this.self=this;
  globalThis.self=this;
      
self.onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    self.postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    self.postMessage(workerResult);
  }
}
      console.log('processor created');
    }
    
    set onmessage(msg){
    
    this.port.onmessage = msg;
    return this.port.onmessage;
    
    }
    postMessage(message,transfer){
    
    return this.port.postMessage(message,transfer);
    
    }
    
  process(inputs, outputs, parameters) {
    // take the first output
    const output = outputs[0];
    // fill each channel with random values multiplied by gain
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        // generate random value for each sample
        // Math.random range is [0; 1); we need [-1; 1]
        // this won't include exact 1 but is fine for now for simplicity
        console.log('processor'+i);
        channel[i] =
          (Math.random() * 2 - 1) *
          // the array can contain 1 or 128 values
          // depending on if the automation is present
          // and if the automation rate is k-rate or a-rate
          (parameters["customGain"].length > 1
            ? parameters["customGain"][i]
            : parameters["customGain"][0]);
      }
    });
    // as this is a source node which generates its own output,
    // we return true so it won't accidentally get garbage-collected
    // if we don't have any references to it in the main thread
    return true;
  }
  // define the customGain parameter used in process method
  static get parameterDescriptors() {
    return [
      {
        name: "customGain",
        defaultValue: 1,
        minValue: 0,
        maxValue: 1,
        automationRate: "a-rate",
      },
    ];
  }
  };
  
  registerProcessor("sync-processor", SyncAudioProcessor);

}?.();
