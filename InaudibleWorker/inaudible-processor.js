class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    console.log('processor created');
  }

  process(inputList, outputList, parameters) {
    return true;
  }
};

registerProcessor("inaudible-processor", MyAudioProcessor);
