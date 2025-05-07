const typeDesc={ISTC:'控制型孤狼',ISTH:'掌控型稳定者',ISGC:'忍耐型爆弹',ISGH:'可靠老实人',IMTC:'情感黑洞',IMTH:'冷淡老年人',IMGC:'隐性讨好者',IMGH:'安全感吸血鬼',ESTC:'爱情捕食者',ESTH:'情绪管理员',ESGC:'戏精公主/王子',ESGH:'外向圣人',EMTC:'甜蜜陷阱',EMTH:'依赖型小孩',EMGC:'口是心非王',EMGH:'和平型陪伴者'};
let q=[];fetch('questions_1_40.json').then(r=>r.json()).then(d=>{q=d;ready();});
const score={I:0,E:0,S:0,M:0,T:0,G:0,C:0,H:0};const $=id=>document.getElementById(id);
let i=0,ans=[];
function ready(){$('#start').onclick=start;$('#nextBtn').onclick=next;$('#backBtn').onclick=back;document.querySelectorAll('[name=opt]').forEach(r=>r.onchange=()=>$('#nextBtn').disabled=false);}
function start(){toggle('welcome','quiz');render();}
function render(){const k=q[i];$('#title').textContent=`第 ${i+1}/40 题 · ${k.text}`;document.querySelectorAll('[name=opt]').forEach(r=>r.checked=false);$('#nextBtn').disabled=true;$('#backBtn').disabled=(i===0);$('#bar').style.width=((i/40)*100)+'%';}
function next(){const vEl=document.querySelector('[name=opt]:checked');if(!vEl)return;const v=+vEl.value;ans[i]=v;update(i,v);i++;i<q.length?render():finish();}
function back(){if(i===0)return;i--;update(i,-ans[i]);render();}
function update(idx,val){const {dimension,reverse}=q[idx];const [left,right]=dimension.split('');const delta=(val-2.5)*(reverse?-1:1);const add=delta*4/3; // ±2 区间
if(delta>0)score[left]+=add;else score[right]+=Math.abs(add);} 
function finish(){toggle('quiz','result');const code=(score.I>score.E?'I':'E')+(score.S>score.M?'S':'M')+(score.T>score.G?'T':'G')+(score.C>score.H?'C':'H');$('#code').textContent=code;$('#desc').textContent=typeDesc[code]||'';$('#score').textContent=JSON.stringify(score,null,2);} 
function toggle(h,s){$(h).classList.add('hide');$(s).classList.remove('hide');}
