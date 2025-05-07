const typeDesc = {
  ISTC: `控制型孤狼  
沉默寡言但掌控欲强；需要确定关系后才肯投入，容易先靠近后忽然抽离。`,

  ISTH: `掌控型稳定者  
做事有节奏，情绪波动小；喜欢按计划推进关系，对变动敏感。`,

  ISGC: `忍耐型爆弹  
习惯默默付出，长期压抑需求；若得不到回应会一次性爆发。`,

  ISGH: `可靠老实人  
低调务实、细水长流；用行动表达关心，是“被需要”型伴侣。`,

  IMTC: `情感黑洞  
回应稀薄，倾向被动索取；在关系里容易持续消耗对方能量。`,

  IMTH: `冷感反思者  
外在淡漠，内在想法多；对亲密需求低，需要足够个人空间。`,

  IMGC: `隐性讨好者  
渴望被接纳又缺乏自信；前期热情，后期可能情绪拉扯。`,

  IMGH: `安全感吸血鬼  
安静依赖型，习惯把情绪重量交给伴侣，缺乏时常感到不安。`,

  ESTC: `爱情捕食者  
热情快进快退，擅长情绪操控；新鲜感一过可能快速抽离。`,

  ESTH: `情绪管理员  
既会付出也会索取；主导关系走向，希望双方都按节奏前进。`,

  ESGC: `戏精公主/王子  
关注度需求高，情绪多变；对刺激敏感，易制造戏剧化场景。`,

  ESGH: `外向圣人  
热情慷慨且尊重边界；懂得协调群体氛围，让人如沐春风。`,

  EMTC: `甜蜜陷阱  
亲和有吸引力，投入深度浅；让人沦陷却难以真正走近内心。`,

  EMTH: `依赖型小孩  
外向但脆弱，需要情绪托管；对伴侣粘性强，易患得患失。`,

  EMGC: `口是心非王  
社交能手但情绪反复；擅长表达却常自我拉扯，给人反差感。`,

  EMGH: `和平型陪伴者  
随和不冲突，乐于支持；相处舒适但可能缺乏激情火花。`
};

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
