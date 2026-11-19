(function(){
/* ===== ضع أغنيتك هنا: ضع الملف في assets باسم song.mp3 أو غيّر المسار ===== */
var SONG='song.mp3';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,B=document.body;
var gate=document.getElementById('gate'),btn=document.getElementById('open'),mus=document.getElementById('music'),au=document.getElementById('bgm');
btn.focus({preventScroll:true});
btn.addEventListener('click',function(){
  gate.classList.add('open');B.classList.remove('locked');B.classList.add('opened');scrollTo(0,0);
  setTimeout(function(){gate.classList.add('gone')},reduce?50:3200);
  au.src=SONG;au.volume=.6;
  au.addEventListener('error',function(){mus.hidden=true});
  au.addEventListener('canplay',function(){mus.hidden=false});
  au.play().then(function(){mus.hidden=false;mus.classList.add('on')}).catch(function(){});
});
mus.addEventListener('click',function(){if(au.paused){au.play();mus.classList.add('on')}else{au.pause();mus.classList.remove('on')}});
/* English / عربي */
var LK=document.getElementById('lang'),TR=[].slice.call(document.querySelectorAll('[data-en]')),CUR='ar';
TR.forEach(function(e){e.dataset.ar=e.textContent});
function T(a,e){return CUR==='en'?e:a}
function setLang(l){CUR=l;var d=document.documentElement;d.lang=l;d.dir=l==='en'?'ltr':'rtl';
  TR.forEach(function(e){e.textContent=l==='en'?e.dataset.en:e.dataset.ar});
  LK.textContent=l==='en'?'عربي':'EN';LK.setAttribute('aria-label',l==='en'?'التبديل إلى العربية':'Switch to English');
  document.title=l==='en'?'Wedding Invitation — Mahmoud & Mahasin':'دعوة زفاف محمود & محاسن';
  try{localStorage.setItem('lang',l)}catch(e){}}
LK.addEventListener('click',function(){setLang(CUR==='en'?'ar':'en')});
(function(){var s=null;try{s=localStorage.getItem('lang')}catch(e){}
  if(/[?&]lang=en/.test(location.search))s='en';else if(/[?&]lang=ar/.test(location.search))s='ar';
  if(s==='en')setLang('en')})();
/* light / dark option */
var th=document.getElementById('theme');
try{if(localStorage.getItem('theme')==='light')B.classList.add('light')}catch(e){}
th.addEventListener('click',function(){var l=B.classList.toggle('light');try{localStorage.setItem('theme',l?'light':'dark')}catch(e){}});
/* gold dust */
var cv=document.getElementById('dust'),cx=cv.getContext('2d'),P=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
if(!reduce){for(var i=0;i<45;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.4,v:Math.random()*.25+.05,t:Math.random()*6});
(function f(){cx.clearRect(0,0,W,H);P.forEach(function(p){p.y-=p.v;p.t+=.02;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}cx.globalAlpha=.25+.45*Math.abs(Math.sin(p.t));cx.fillStyle='#e9cf8a';cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fill()});requestAnimationFrame(f)})()}
addEventListener('scroll',function(){B.classList.toggle('scrolled',scrollY>60)},{passive:true});
/* reveal */
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
/* hall parallax + tilt */
var hall=document.getElementById('hall'),img=hall.firstElementChild;
addEventListener('scroll',function(){var r=hall.getBoundingClientRect();img.style.setProperty('--p',((r.top+r.height/2-innerHeight/2)*-.06)+'px')},{passive:true});
if(!reduce){hall.addEventListener('pointermove',function(e){var r=hall.getBoundingClientRect();hall.style.transform='perspective(900px) rotateY('+((e.clientX-r.left)/r.width-.5)*6+'deg) rotateX('+((e.clientY-r.top)/r.height-.5)*-6+'deg)'});hall.addEventListener('pointerleave',function(){hall.style.transform=''})}
/* crest sparkle */
document.getElementById('crest').addEventListener('click',function(e){if(reduce)return;for(var i=0;i<18;i++){var s=document.createElement('i');s.className='bst';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);(function(s,a){requestAnimationFrame(function(){s.style.transform='translate('+Math.cos(a)*70+'px,'+Math.sin(a)*70+'px)';s.style.opacity=0});setTimeout(function(){s.remove()},1050)})(s,i/18*6.28)}});
/* ===== مفتاح استقبال التهاني (Web3Forms): ضعه هنا بين العلامتين. من web3forms.com اكتب إيميلك فيصلك المفتاح ===== */
/* ===== أو: رابط جدول جوجل (الأفضل: كل التهاني في مكان واحد). الصقوا رابط Apps Script هنا ===== */
var SHEET_URL='https://script.google.com/macros/s/AKfycbwXQlSh0zAmaFO8_sQlD6LLUudOFd5aJHIS8RK9hQtVb4IMcAETidhEv6qpZ34SJlH1zw/exec';
var FORM_KEY='';
function send(n,m,fd){
  if(SHEET_URL)return fetch(SHEET_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({name:n,message:m}).toString()}).then(function(){});
  if(FORM_KEY)return fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:FORM_KEY,subject:'تهنئة جديدة من '+n,name:n,message:m})}).then(function(r){return r.json()}).then(function(d){if(!d.success)throw 0});
  return fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(fd).toString()}).then(function(r){if(!r.ok)throw 0});
}
/* wishes form */
var f=document.getElementById('wish'),msg=document.getElementById('msg');
f.addEventListener('submit',function(e){
  e.preventDefault();var fd=new FormData(f),n=fd.get('name'),m=fd.get('message');
  msg.textContent=T('جارٍ الإرسال…','Sending…');
  send(n,m,fd)
  .then(function(){
    msg.textContent=T('شكراً لكم، وصلت تهنئتكم الغالية 🤍','Thank you — your wishes have reached us 🤍');
    var c=document.createElement('div');c.className='wc';var p=document.createElement('p'),b=document.createElement('b');p.textContent=m;b.textContent='— '+n;c.appendChild(p);c.appendChild(b);
    document.getElementById('wishList').prepend(c);f.reset()})
  .catch(function(){msg.textContent=T('تعذّر الإرسال الآن، حاولوا مرة أخرى.','Could not send right now, please try again.')});
});
/* countdown: 8 Dec 2026 20:00 Africa/Cairo */
function off(u){try{var p={};new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'}).formatToParts(new Date(u)).forEach(function(x){p[x.type]=+x.value});return Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-u}catch(e){return 72e5}}
var w=Date.UTC(2026,11,8,20),T=w-off(w-72e5);T=w-off(T);
var ids=['d','h','m','s'].map(function(k){return document.getElementById(k)});
function pad(n){return n<10?'0'+n:''+n}
function tick(){var t=Math.max(0,T-Date.now()),x=Math.floor(t/1000),v=[Math.floor(x/86400),Math.floor(x%86400/3600),Math.floor(x%3600/60),x%60];
  v.forEach(function(n,i){var s=pad(n);if(ids[i].textContent!==s){ids[i].textContent=s;ids[i].classList.remove('flip');void ids[i].offsetWidth;ids[i].classList.add('flip')}});
  if(!t){document.getElementById('count').hidden=true;document.getElementById('done').hidden=false;clearInterval(iv)}}
var iv=setInterval(tick,1000);tick();
})();
