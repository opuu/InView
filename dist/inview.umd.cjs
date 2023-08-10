(function(o,n){typeof exports=="object"&&typeof module!="undefined"?module.exports=n():typeof define=="function"&&define.amd?define(n):(o=typeof globalThis!="undefined"?globalThis:o||self,o.InView=n())})(this,function(){"use strict";class o{constructor(e){this.items=null,this.paused=!1,this.delay=0,this.threshold=[],this.single=!1;let s=.01;typeof e=="string"?(this.items=document.querySelectorAll(e),this.delay=0):typeof e=="object"&&(e.delay&&(this.delay=e.delay),e.single&&(this.single=e.single),e.precision==="low"?s=.1:e.precision==="medium"?s=.01:e.precision==="high"&&(s=.001),this.single?this.items=document.querySelector(e.selector):this.items=document.querySelectorAll(e.selector));for(let i=0;i<=1;i+=s)this.threshold.push(i)}pause(){return this.paused=!0,this}resume(){return this.paused=!1,this}setDelay(e){return this.delay=e,this}on(e,s){if("IntersectionObserver"in window){var i=new IntersectionObserver(r=>{r.forEach(t=>{if(e==="enter"&&t.intersectionRatio>0||e==="exit"&&t.intersectionRatio===0){let l={percentage:t.intersectionRatio*100,rootBounds:t.rootBounds,boundingClientRect:t.boundingClientRect,intersectionRect:t.intersectionRect,target:t.target,time:t.time,event:e};this.paused||(this.delay>0?setTimeout(()=>{s(l)},this.delay):s(l))}})},{threshold:this.threshold});this.items instanceof Element?i.observe(this.items):this.items instanceof NodeList?this.items.forEach(r=>{i.observe(r)}):console.error("InView: No items found.")}else console.error("InView: IntersectionObserver not supported.");return this}}return o});