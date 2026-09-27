"use strict";

// Keep calculation separate from the interface so it is easy to understand and check.
function calculate(first, operation, second) {
  const left = String(first).trim();
  const right = String(second).trim();
  if (!left || !right) throw new Error("Please enter both numbers.");
  const decimal = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;
  if (!decimal.test(left) || !decimal.test(right)) {
    throw new Error("Please enter valid numbers.");
  }
  const a = Number(left);
  const b = Number(right);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error("Numbers must be finite.");
  }
  let answer;
  switch (operation) {
    case "+": answer = a + b; break;
    case "-": answer = a - b; break;
    case "*": answer = a * b; break;
    case "/":
      if (b === 0) throw new Error("Cannot divide by zero.");
      answer = a / b; break;
    default: throw new Error("Please select a valid operation.");
  }
  if (!Number.isFinite(answer)) throw new Error("Result is outside the supported range.");
  return String(Number(answer.toPrecision(12)));
}


// A small state machine makes button and keyboard interactions behave identically.
class Calculator {
  constructor() { this.clear(); }
  clear() { this.value='0'; this.left=null; this.operator=null; this.fresh=true; this.done=false; this.expression=''; this.error=false; }
  press(key) {
    if(key==='AC') { this.clear(); return; }
    if(this.error) this.clear();
    if(/^\d$/.test(key) || key==='.') {
      if(this.done) this.clear();
      if(this.fresh) {this.value='0';this.fresh=false;}
      if(key==='.') {if(!this.value.includes('.')) this.value+='.';}
      else if(this.value.replace(/[-.]/g,'').length<12) this.value=this.value==='0'?key:this.value==='-0'?'-'+key:this.value+key;
      return;
    }
    if(key==='Backspace') { if(this.fresh || this.done) return; this.value=this.value.slice(0,-1); if(!this.value || this.value==='-')this.value='0'; return; }
    if(key==='sign') { this.value=this.value.startsWith('-')?this.value.slice(1):'-'+this.value; this.fresh=false; this.done=false; return; }
    if(key==='%') { this.value=String(Number((Number(this.value)/100).toPrecision(12))); this.fresh=false; this.done=false; return; }
    try {
      if(['+','-','*','/'].includes(key)) {
        if(this.operator && !this.fresh) this.value=calculate(this.left,this.operator,this.value);
        this.left=this.value;this.operator=key;this.expression=this.left+' '+({'*':'×','/':'÷','-':'−','+':'+'}[key]);this.fresh=true;this.done=false;
      } else if(key==='=' && this.operator && !this.fresh) {
        const expression=this.expression+' '+this.value+' =';
        this.value=calculate(this.left,this.operator,this.value);this.expression=expression;this.left=null;this.operator=null;this.fresh=true;this.done=true;
      }
    } catch(e) { this.value=e.message;this.expression='';this.error=true; }
  }
}
if(typeof document!=='undefined') {
  const calculator=new Calculator();
  const output=document.getElementById('result');
  const expression=document.getElementById('expression');
  const render=()=>{output.textContent=calculator.value;expression.textContent=calculator.expression||'\u00a0';output.classList.toggle('error',calculator.error);output.classList.toggle('long',calculator.value.length>11);};
  const press=(key)=>{calculator.press(key);render();};
  document.querySelectorAll('[data-key]').forEach(button=>button.addEventListener('click',()=>press(button.dataset.key)));
  document.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    if(event.key==='Enter' && event.target.id==='theme')return;
    const key=event.key==='Enter'?'=':event.key==='Escape'?'AC':event.key;
    if(/^\d$/.test(key)||['.','+','-','*','/','=','%','Backspace','AC'].includes(key)){event.preventDefault();press(key);}
  });
  document.getElementById('theme').addEventListener('click',()=>{
    const light=document.body.classList.toggle('light');
    const button=document.getElementById('theme');button.textContent=light?'☾':'☀';button.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');
  });
}
if(typeof module!=='undefined')module.exports={calculate,Calculator};
