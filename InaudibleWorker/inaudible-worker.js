window.InaudibleContext = window.OfflineAudioContext||window.AudioContext||window.webkitAudioContext||window.BaseAudioContext;
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
    exponentialBackOff=exponentialBackOff*1.01;
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
    while(true){
      await sleep(100);
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
    while(true){
      await sleep(100);
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
            this.audioContext = new InaudibleContext(1,1,44100);
            if(!window.OfflineAudioContext){
              await this.audioContext.resume();
            }
            await this.audioContext.audioWorklet.addModule("inaudible-processor.js");
            this.node=new AudioWorkletNode(this.audioContext, "inaudible-processor");
            return this.node;
      
    
  }
  
  
}
