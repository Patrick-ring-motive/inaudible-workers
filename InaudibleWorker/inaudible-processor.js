class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    console.log('processor created');
  }
  
  this.port.onmessage=function(){console.log('port message received');};

  process(inputList, outputList, parameters) {
    return true;
  }
};

registerProcessor("inaudible-processor", MyAudioProcessor);
