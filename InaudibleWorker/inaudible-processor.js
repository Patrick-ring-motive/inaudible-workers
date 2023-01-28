class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage=function(){console.log('port message received');};
    console.log('processor created');
  }
  

  process(inputList, outputList, parameters) {
    return true;
  }
};

registerProcessor("inaudible-processor", MyAudioProcessor);
