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

/* motion: scroll reveal for all text, cards and images (skipped for reduced motion) */
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
const bar=document.createElement('div');bar.id='prog';document.body.appendChild(bar);
const pr=()=>{const h=document.documentElement;bar.style.transform='scaleX('+(h.scrollTop/((h.scrollHeight-h.clientHeight)||1))+')'};pr();addEventListener('scroll',pr,{passive:true});
const sel='main h1,main h2,main h3,main p,main .lead,main .card,main .cat,main .chips a,main .tools,main .btn,main .note,main .fw>div,main .stats,main .big,main .v,main form>div,footer .grid>div,footer .disc';
const imgSel='main figure img,main .vis img';
const all=[...document.querySelectorAll(sel)];const set=new Set(all);
const tops=all.filter(e=>{let a=e.parentElement;while(a&&a!==document.body){if(set.has(a)&&!a.matches('.grid,.edu,.skg,.cats,.col'))return false;a=a.parentElement}return true});
const idx=new Map();
const place=(e,cls)=>{const par=e.parentElement;const n=idx.get(par)||0;idx.set(par,n+1);e.style.setProperty('--rd',Math.min(n*.09,.7)+'s');e.classList.add(...cls.split(' '))};
tops.forEach((e,k)=>{if(e.closest('.hero .txt')&&e.matches('.stats'))return;place(e,'rv'+(e.closest('.hero .txt')?'':(k%5==1?' rv-l':k%5==3?' rv-r':'')))});
const imgs=[...document.querySelectorAll(imgSel)];imgs.forEach(e=>place(e,'rv-img'));
document.querySelectorAll('.rv,.rv-img').forEach(e=>{if(e.matches('.rv-l'))e.classList.add('rv-l')});
document.querySelectorAll('.ph').forEach(e=>setTimeout(()=>e.classList.add('float'),1600));
const io=new IntersectionObserver((x,o)=>x.forEach(en=>{if(en.isIntersecting){const t=en.target;t.classList.add('in');o.unobserve(t);if(!t.matches('.rv-img'))setTimeout(()=>t.classList.remove('rv','rv-l','rv-r','rv-z','in'),1900+parseFloat(t.style.getPropertyValue('--rd')||0)*1000)}}),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.rv,.rv-img').forEach(e=>io.observe(e));
/* safety net: never leave content hidden */
setTimeout(()=>document.querySelectorAll('.rv:not(.in),.rv-img:not(.in)').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight)e.classList.add('in')}),2500);
/* count-up for 100+ */
document.querySelectorAll('.big').forEach(el=>{const t=100;let done=false;const run=()=>{if(done)return;done=true;const t0=performance.now();const st=n=>{const p=Math.min((n-t0)/1600,1),v=Math.round(t*(1-Math.pow(1-p,3)));el.textContent=v+'+';if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)};
el.textContent='0+';new IntersectionObserver((x,o)=>{if(x[0].isIntersecting){run();o.disconnect()}},{threshold:.5}).observe(el)});
/* gentle tilt on glass cards (pointer devices) */
if(matchMedia('(hover:hover)').matches)document.querySelectorAll('main .card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+x*5+'deg) rotateX('+-y*5+'deg) translateY(-4px)'});c.addEventListener('pointerleave',()=>c.style.transform='')});
}
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
