!function(){var e=document.querySelector("form"),t=document.querySelector('input[name="delay"]'),n=document.querySelector('input[name="step"]'),o=document.querySelector('input[name="amount"]'),c=(document.querySelector('button[type="submit"]'),parseInt(t.value)),r=parseInt(n.value),u=parseInt(o.value);function a(e,t){return new Promise((function(n,o){var c=Math.random()>.3;setTimeout((function(){c?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}e.addEventListener("submit",(function(t){t.preventDefault();for(var n=1,o=c,i=[],l=0;l<u;l+=1){var s=a(n,o).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))}));i.push(s),n+=1,o+=r}Promise.all(i).then((function(){console.log("All promises resolved"),e.reset()})).catch((function(){console.log("At least one promise rejected"),e.reset()}))}))}();
//# sourceMappingURL=03-promises.8eee63e2.js.map
