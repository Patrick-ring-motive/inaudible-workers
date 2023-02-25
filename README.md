# inaudible-workers
Using the web audio api to run arbitrary code on the audio thread. 


You can view the basic example at [https://patrick-ring-motive.github.io/inaudible-workers/examples/index.html](https://patrick-ring-motive.github.io/inaudible-workers/examples/index.html) borrowed from them same mdn example for a basic worker [https://github.com/mdn/dom-examples/tree/main/web-workers/simple-web-worker](https://github.com/mdn/dom-examples/tree/main/web-workers/simple-web-worker).


A tiny and mostly spec-compliant [WebWorker](https://www.w3.org/TR/workers/)

This was mostly done as an example to explore how to the audio worklet in the most basic example possible. Could potentially be used as a light weight worker for applications that don't use audio. 




Usage
----


You can use it directly as a script tag:

```html
<script src="https://patrick-ring-motive.github.io/inaudible-workers/InaudibleWorker/inaudible-worker.js"></script>
```

Then it's available as `window.InaudibleWorker).





**Note:** inside the worker, you _must_ use the `self` variable instead 
of the implicit global object. I.e. do this:

```js
self.location
```

Not this:

```js
location
```

One interesting tidbit that I discovered is that chrome requires a user gesture before allowing us to instantiate an audio context. This gesture can be hard to detect so I use polling with exponential backoff. There is probably a better way but this only happens for a brief time during initialization.

