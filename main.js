(function(){
  try{
    document.documentElement.classList.add('mt-on');
    var wd=setTimeout(function(){document.documentElement.classList.remove('mt-on');},2500);
    var els=[].slice.call(document.querySelectorAll('.rise'));
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      },{rootMargin:'0px 0px -8% 0px',threshold:.05});
      els.forEach(function(el){io.observe(el);});
    } else { els.forEach(function(el){el.classList.add('in');}); }
    clearTimeout(wd);
  }catch(e){ document.documentElement.classList.remove('mt-on'); }

  // powiekszanie zdjec w spisie projektow
  try{
    var kafle=[].slice.call(document.querySelectorAll('a.tile[data-duze]'));
    if(kafle.length){
      var ov=document.createElement('div');
      ov.className='lupa'; ov.setAttribute('aria-hidden','true');
      ov.innerHTML='<button class="lupa-x" aria-label="Zamknij">&times;</button><figure><img alt=""><figcaption></figcaption></figure>';
      document.body.appendChild(ov);
      var im=ov.querySelector('img'), cap=ov.querySelector('figcaption'), poz=-1;
      var pokaz=function(i){
        if(i<0) i=kafle.length-1; if(i>=kafle.length) i=0;
        poz=i; var t=kafle[i];
        im.src=t.getAttribute('data-duze'); im.alt=t.getAttribute('data-opis')||'';
        cap.textContent=t.getAttribute('data-opis')||'';
        ov.classList.add('on'); ov.setAttribute('aria-hidden','false');
        document.body.style.overflow='hidden';
      };
      var zamknij=function(){ ov.classList.remove('on'); ov.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
      kafle.forEach(function(t,i){ t.addEventListener('click',function(e){ e.preventDefault(); pokaz(i); }); });
      ov.addEventListener('click',function(e){ if(e.target===ov||e.target.classList.contains('lupa-x')) zamknij(); });
      document.addEventListener('keydown',function(e){
        if(!ov.classList.contains('on')) return;
        if(e.key==='Escape') zamknij();
        if(e.key==='ArrowRight') pokaz(poz+1);
        if(e.key==='ArrowLeft') pokaz(poz-1);
      });
    }
  }catch(e){}

  try{
    var sc=document.querySelector('.sticky-call');
    if(sc){
      var pokaz=function(){ sc.classList.toggle('pokaz', window.scrollY>340); };
      pokaz(); window.addEventListener('scroll',pokaz,{passive:true});
    }
  }catch(e){}

  try{
    var b=document.querySelector('.burger'), n=document.querySelector('.nav-links');
    if(b&&n){ b.addEventListener('click',function(){ n.classList.toggle('open'); }); }
  }catch(e){}
})();
