class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage=function(){console.log('port message received');};
    this.postMessage = this.port.postMessage;
    console.log('processor created');
  }
  
  set onmessage(msg){
  
  this.port.onmessage = msg;
  return this.port.onmessage;
  
  }
  
  
  process(inputList, outputList, parameters) {
    return true;
  }
};

registerProcessor("inaudible-processor", MyAudioProcessor);
