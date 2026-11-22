import{readFileSync as R,mkdirSync as M,readdirSync as D,writeFileSync as W}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function V(P,N){
const S=new Int32Array(257),C=new Int32Array(64),Y=new Int32Array(256),o=[];
let p=0,s=0,c=0,n=0,i=0;
const T=v=>{throw v},U=v=>{if(s<v)throw 2};
try{for(;;){
if(n++>999999)T(10);
if(p<0||p>=P.length)T(9);
const x=P[p],u=P[p+1]|P[p+2]<<8,l=x==2?4:x==1?1:x>=48&&x<=51?2:0;
if(p+1+l>P.length)T(9);
const q=p+1+l,j=q+((u<<16)>>16);
if(s==256&&(x==1||x==2||x==4||x==6||x==82))T(3);
switch(x){
case 0:return[o,0];
case 1:S[s++]=(P[p+1]<<24)>>24;p=q;break;
case 2:S[s++]=P[p+1]|P[p+2]<<8|P[p+3]<<16|P[p+4]<<24;p=q;break;
case 3:U(1);s--;p=q;break;
case 4:U(1);S[s]=S[s-1];s++;p=q;break;
case 5:U(2);{const t=S[s-1];S[s-1]=S[s-2];S[s-2]=t}p=q;break;
case 6:U(2);S[s]=S[s-2];s++;p=q;break;
case 7:U(3);{const t=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=t}p=q;break;
case 48:p=j;break;
case 49:case 50:U(1);p=(S[--s]==0)==(x==49)?j:q;break;
case 51:if(c==64)T(7);C[c++]=q;p=u;break;
case 52:if(!c)T(8);p=C[--c];break;
case 64:U(1);{const a=S[--s];if(a<0||a>255)T(6);S[s++]=Y[a]}p=q;break;
case 65:U(2);{const a=S[--s],v=S[--s];if(a<0||a>255)T(6);Y[a]=v}p=q;break;
case 80:U(1);{const t=String(S[--s]);if(o.length+t.length>65536)T(11);o.push(...Buffer.from(t))}p=q;break;
case 81:U(1);if(o.length>65535)T(11);o.push(S[--s]&255);p=q;break;
case 82:S[s++]=i<N.length?N[i++]:-1;p=q;break;
case 83:U(1);return[o,S[--s]&255];
default:if(x<16||x>34||x==31)T(5);
{const g=x==23||x==27;U(g?1:2);const b=S[--s],a=g?0:S[s-1];let r;
if(!b&&x>18&&x<23)T(4);
r=x==16?a+b:x==17?a-b:x==18?Math.imul(a,b):x==19?a/b:x==20?a%b:x==21?(a>>>0)/(b>>>0):x==22?(a>>>0)%(b>>>0):x==23?-b:x==24?a&b:x==25?a|b:x==26?a^b:x==27?~b:x==28?a<<(b&31):x==29?a>>(b&31):x==30?a>>>(b&31):x==32?+(a==b):x==33?+(a<b):+((a>>>0)<(b>>>0));
if(g)S[s++]=r;else S[s-1]=r}
p=q}}
}catch(e){return[o,e]}}
for(const d of D(I).sort()){const P=R(I+"/"+d+"/program.bin"),N=R(I+"/"+d+"/input.bin"),[o,e]=V(P,N);M(O+"/"+d,{recursive:!0});W(O+"/"+d+"/stdout.bin",Buffer.from(o));W(O+"/"+d+"/exit.txt",e+"\n")}
