/* BEAUTY v2 — menú móvil, FAQ, testimonios rotativos y formulario -> WhatsApp */
document.addEventListener('DOMContentLoaded',function(){
  var WHATSAPP='5491100000000';

  var burger=document.getElementById('burger'),nav=document.getElementById('navLeft');
  burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')})});

  var qs=document.querySelectorAll('.faq-q');
  qs.forEach(function(b){var a=b.nextElementSibling;b.addEventListener('click',function(){
    var open=b.getAttribute('aria-expanded')==='true';
    qs.forEach(function(o){o.setAttribute('aria-expanded','false');o.nextElementSibling.style.maxHeight=null});
    if(!open){b.setAttribute('aria-expanded','true');a.style.maxHeight=a.scrollHeight+'px'}})});

  /* Testimonios: editar este array con las opiniones reales de la clienta */
  var QUOTES=[
    {t:'Voy hace más de un año y siempre salgo conforme. El semipermanente me dura casi tres semanas intacto.',a:'Marina G.'},
    {t:'El lifting de pestañas cambió mi rutina de las mañanas. Muy prolija y puntual con los turnos.',a:'Carolina R.'},
    {t:'Un lugar tranquilo, sin apuro, y las cejas quedaron exactamente como las quería.',a:'Sofía M.'}];
  var i=0,tx=document.getElementById('qText'),au=document.getElementById('qAuthor'),dots=document.getElementById('qDots'),timer;
  QUOTES.forEach(function(q,k){var d=document.createElement('button');d.setAttribute('aria-label','Opinión '+(k+1));d.addEventListener('click',function(){show(k);restart()});dots.appendChild(d)});
  function show(k){i=k;tx.textContent='“'+QUOTES[k].t+'”';au.textContent=QUOTES[k].a;
    dots.querySelectorAll('button').forEach(function(d,n){d.setAttribute('aria-current',n===k)})}
  function restart(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(function(){show((i+1)%QUOTES.length)},6000)}
  show(0);restart();

  var f=document.getElementById('form'),st=document.getElementById('status');
  f.addEventListener('submit',function(e){e.preventDefault();
    var n=f.nombre.value.trim(),t=f.tel.value.trim(),s=f.servicio.value,m=f.msg.value.trim();
    if(!n||!t||!s){st.textContent='Completá nombre, teléfono y servicio.';st.className='status show';return}
    var txt='Hola! Soy '+n+'. Quiero reservar: '+s+'. Mi teléfono: '+t+(m?'. '+m:'');
    st.textContent='Te redirigimos a WhatsApp para confirmar…';st.className='status show';
    window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(txt),'_blank');f.reset()});
});
