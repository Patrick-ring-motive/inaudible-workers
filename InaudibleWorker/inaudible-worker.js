window.InaudibleContext = window.OfflineAudioContext||window.AudioContext||window.webkitAudioContext||window.BaseAudioContext;
let audioContext = null;

async function createMyAudioProcessor() {
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
