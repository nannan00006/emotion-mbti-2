const typeDesc={ISTC:'控制型孤狼',ISTH:'掌控型稳定者',ISGC:'忍耐型爆弹',ISGH:'可靠老实人',IMTC:'情感黑洞',IMTH:'冷淡老年人',IMGC:'隐性讨好者',IMGH:'安全感吸血鬼',ESTC:'爱情捕食者',ESTH:'情绪管理员',ESGC:'戏精公主/王子',ESGH:'外向圣人',EMTC:'甜蜜陷阱',EMTH:'依赖型小孩',EMGC:'口是心非王',EMGH:'和平型陪伴者'};
let q=[];
fetch('questions_1_40.json').then(r=>r.json()).then(d=>{q=d;if(document.readyState==='complete'){ready();}else{window.addEventListener('load',ready);}});
const score={I:0,E:0,S:0,M:0,T:0,G:0,C:0,H:0};const $=id=>document.getElementById(id);
function ready(){ $('start').onclick=renderPaper; }
function renderPaper(){ toggle('welcome','quiz'); const list=$('list'); list.innerHTML=q.map((item,idx)=>`<div class="block"><p><strong>第 ${idx+1} 题</strong> · ${item.text}</p><div class="likert4">${[1,2,3,4].map(v=>`<label><input type=\"radio\" name=\"q${idx}\" value=\"${v}\">${['完全不符合','不太符合','比较符合','完全符合'][v-1]}</label>`).join('')}</div></div>`).join(''); $('paper').addEventListener('change',checkAll); $('submitBtn').onclick=submitAll; }
function checkAll(){ const answered=document.querySelectorAll('[name^=q]:checked').length; $('submitBtn').disabled=(answered!==q.length); }
function update(idx,val){ const {dimension,reverse}=q[idx]; const [left,right]=dimension.split(''); const delta=(val-2.5)*(reverse?-1:1); const add=delta*4/3; if(delta>0) score[left]+=add; else score[right]+=Math.abs(add);} 
function submitAll(){ // 重置
 Object.keys(score).forEach(k=>score[k]=0);
 q.forEach((item,idx)=>{ const v=+document.querySelector(`[name=q${idx}]:checked`).value; update(idx,v); }); finish(); }
function finish(){ toggle('quiz','result'); const code=(score.I>score.E?'I':'E')+(score.S>score.M?'S':'M')+(score.T>score.G?'T':'G')+(score.C>score.H?'C':'H'); $('code').textContent=code; $('desc').textContent=typeDesc[code]||''; }
function toggle(h,s){ $(h).classList.add('hide'); $(s).classList.remove('hide'); }
