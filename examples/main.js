(()=>{
const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');
if (!globalThis.requestIdleCallback) {
   globalThis.requestIdleCallback = globalThis.requestAnimationFrame;
}
globalThis.nextIdle=function(){
  return new Promise((resolve) => {requestIdleCallback(resolve);});  
}
if (window.InaudibleWorker) {
  const myWorker = new InaudibleWorker("worker.js");
  void async function(){
    await myWorker.loaded;  
    while(true){
    try{
      console.log(myWorker.node.parameters.get('customGain'));
    }catch(e){
      console.log(e);
      await nextIdle();
      continue;
    }
    break;
    }
  }();
  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  }
} else {
  console.log('Your browser doesn\'t support Inaudible workers.');
}
})();
