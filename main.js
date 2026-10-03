(function(){
const $=id=>document.getElementById(id);
/* menu */
const mb=$('mb'),nv=$('nav');
mb.onclick=()=>{const o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
const path=(location.pathname.replace(/\.html$/,'').replace(/\/$/,''))||'/';
nv.querySelectorAll('a').forEach(a=>{const p=(new URL(a.href).pathname.replace(/\.html$/,'').replace(/\/$/,''))||'/';if(p===path)a.setAttribute('aria-current','page')});
/* language (remembered across pages) */
const T={hi:{home:"होम",about:"परिचय",svc:"विशेषज्ञता",bf:"बिज़नेस फाइल्स",cf:"कोर्टरूम फाइल्स",lu:"कानूनी अपडेट",ins:"लेख",res:"संसाधन",spk:"वक्ता",con:"संपर्क",h1:"जटिल बिज़नेस, फाइनेंस और कानूनी अवधारणाओं को व्यावहारिक समझ में बदलना।"}};
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

/* premium touches: italic last word, header shadow, scroll reveal */
document.querySelectorAll('main h1.ph1,main h2').forEach(h=>{if(h.dataset.i)return;const t=h.textContent.trim().split(/\s+/);if(t.length<2)return;const last=t.pop();h.textContent=t.join(' ')+' ';const e=document.createElement('em');e.textContent=last;h.appendChild(e)});
const hd=document.querySelector('header');if(hd){const sc=()=>hd.classList.toggle('scrolled',window.scrollY>10);sc();addEventListener('scroll',sc,{passive:true})}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
const sel='main h1,main h2,main h3,main p,main li,main .card,main .btn,main .chain span,main .tl>div,main .fw>div,main form>div,main .vid,footer h2,footer strong,footer li,footer p';
const imgSel='main figure.ph,main .v,main img.pic';
const all=[...document.querySelectorAll(sel)].filter(e=>!e.closest('.crest'));
const set=new Set(all);
const tops=all.filter(e=>{let a=e.parentElement;while(a&&a!==document.body){if(set.has(a))return false;a=a.parentElement}return true});
const imgs=[...document.querySelectorAll(imgSel)].filter(e=>!(e.tagName==='IMG'&&e.closest('.v,.ph')));
const idx=new Map();
[...tops,...imgs].forEach(e=>{const par=e.parentElement;const i=idx.get(par)||0;idx.set(par,i+1);e.style.setProperty('--rd',Math.min(i*.12,.6)+'s');e.classList.add(e.matches(imgSel)?'rv-img':'rv')});
const io='IntersectionObserver' in window?new IntersectionObserver((x,o)=>x.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');o.unobserve(en.target)}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'}):null;
document.querySelectorAll('.rv,.rv-img').forEach(e=>io?io.observe(e):e.classList.add('in'));
}
})();
