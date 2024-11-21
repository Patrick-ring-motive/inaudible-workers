class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = function onmessage(){console.log('port message received');};
    this.postMessage = function postMessage(msg,transfer){return this.port.postMessage(msg,transfer);};
    console.log('processor created');
  }
  
  set onmessage(msg){
  
  this.port.onmessage = msg;
  return this.port.onmessage;
  
  }
  
  
  process(inputList, outputList, parameters) {
    return true;
  }


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

registerProcessor("inaudible-processor", MyAudioProcessor);
