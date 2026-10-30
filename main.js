(function(){
const $=id=>document.getElementById(id);
/* menu */
const mb=$('mb'),nv=$('nav');
mb.onclick=()=>{const o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
const path=(location.pathname.replace(/\.html$/,'').replace(/\/$/,''))||'/';
nv.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href').includes('#'))return;const p=(new URL(a.href).pathname.replace(/\.html$/,'').replace(/\/$/,''))||'/';if(p===path)a.setAttribute('aria-current','page')});
/* language (remembered across pages) */
const T={hi:{home:"होम",about:"परिचय",svc:"विशेषज्ञता",bf:"बिज़नेस फाइल्स",cf:"कोर्टरूम फाइल्स",lu:"कानूनी अपडेट",ins:"लेख",res:"संसाधन",spk:"वक्ता",con:"संपर्क",h1:"व्यावहारिक कानूनी जानकारी, वित्तीय मार्गदर्शन और सोच-समझकर निर्णय लेने के लिए ज्ञान।"}};
const els=[...document.querySelectorAll('[data-i]')];els.forEach(e=>e.dataset.en=e.textContent);
const btns=[...document.querySelectorAll('.lang button')];
function setLang(l){document.documentElement.lang=l;btns.forEach(x=>x.setAttribute('aria-pressed',x.dataset.l===l));els.forEach(e=>e.textContent=l==='hi'&&T.hi[e.dataset.i]?T.hi[e.dataset.i]:e.dataset.en);try{localStorage.setItem('lang',l)}catch(x){}}
btns.forEach(b=>b.onclick=()=>setLang(b.dataset.l));
try{const s=localStorage.getItem('lang');if(s==='hi')setLang('hi')}catch(x){}
/* year */
const y=$('yr');if(y)y.textContent=new Date().getFullYear();
/* featured video */
const vb=document.querySelector('#vid button');
if(vb)vb.onclick=()=>{$('vid').innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/vtx7FnXE5Hw?autoplay=1" title="Business Files featured video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'};
/* framework reveal */
const fw=$('fw');if(fw){if('IntersectionObserver' in window){new IntersectionObserver((x,o)=>{if(x[0].isIntersecting){fw.classList.add('on');o.disconnect()}},{threshold:.3}).observe(fw)}else fw.classList.add('on')}
/* contact form */
const cf=$('cf');
if(cf)cf.onsubmit=e=>{e.preventDefault();const m=$('fm'),g=i=>$(i).value;
if(!cf.checkValidity()){m.textContent='Please fill in name, a valid email, subject and message.';return}
location.href='mailto:subhamdubeyfinanceeducator@gmail.com?subject='+encodeURIComponent(g('s'))+'&body='+encodeURIComponent('Name: '+g('n')+'\nEmail: '+g('e')+'\nCompany: '+g('c')+'\n\n'+g('m'))};
/* notice banner, legal updates, articles (data from updates.js) */
const NO=window.NOTICE||{text:""},UP=window.UPDATES||[],AR=window.ARTICLES||[];
const nt=$('notice');
if(nt&&NO.text){nt.textContent=NO.text+' ';if(NO.link){const a=document.createElement('a');a.href=NO.link;a.target='_blank';a.rel='noopener';a.textContent=NO.label||'Read more';nt.appendChild(a)}nt.hidden=false}
const sort=a=>a.slice().sort((x,z)=>z.date<x.date?-1:1);
function card(u){const c=document.createElement('article');c.className='card item';
const m=document.createElement('p');m.className='meta';m.textContent=new Date(u.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})+' | '+u.cat;
const t=document.createElement('h3');t.textContent=u.title;const s=document.createElement('p');s.style.color='var(--muted)';s.style.whiteSpace='pre-line';s.textContent=u.summary;c.append(m,t,s);
if(u.img){const l=document.createElement('a');l.href=u.img;l.target='_blank';l.rel='noopener';const i=document.createElement('img');i.className='pic';i.src=u.img;i.alt=u.title;i.loading='lazy';l.appendChild(i);c.appendChild(l)}
if(u.link){const a=document.createElement('a');a.className='src';a.href=u.link;a.rel='noopener';if(/^https?:/.test(u.link))a.target='_blank';a.textContent=u.linkLabel||'Official source';c.appendChild(a)}
return c}
const list=$('updList'),more=$('updMore');
if(list){const items=sort(UP),lim=+list.dataset.limit||5;let all=false;
const draw=()=>{list.textContent='';if(!items.length){list.innerHTML='<p class="lead">No updates yet.</p>';return}
items.slice(0,all?items.length:lim).forEach(u=>list.appendChild(card(u)));if(more)more.hidden=all||items.length<=lim};
if(more)more.onclick=()=>{all=true;draw()};draw()}
const il=$('insList');
if(il&&AR.length){il.textContent='';sort(AR).forEach(a=>il.appendChild(card(a)));$('insLead').textContent='Articles and analysis on finance, business and legal awareness.'}

/* header shadow on scroll */
const hd=document.querySelector('header');if(hd){const sc=()=>hd.classList.toggle('scrolled',window.scrollY>10);sc();addEventListener('scroll',sc,{passive:true})}
/* courtroom files: expand / collapse all, open category from link hash */
const cats=[...document.querySelectorAll('details.cat')];
const ex=$('expAll'),co=$('colAll');
if(ex)ex.onclick=()=>cats.forEach(d=>d.open=true);
if(co)co.onclick=()=>cats.forEach(d=>d.open=false);
function openHash(){const d=cats.find(x=>'#'+x.id===location.hash);if(d){d.open=true;setTimeout(()=>d.scrollIntoView({block:'start'}),50)}}
openHash();addEventListener('hashchange',openHash);
})();
