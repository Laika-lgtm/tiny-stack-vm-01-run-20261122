import{readFileSync as r,readdirSync as e,mkdirSync as k,writeFileSync as w}from"fs";
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:T="/output"}=process.env,O="+ - x / % / % x & | ^ x << >> >>> x == < <".split(" ");
e(I).forEach(d=>{
const f=I+"/"+d,p=r(f+"/program.bin"),b=r(f+"/input.bin"),g=T+"/"+d;
let s=[],c=[],m=[],x=0,q=0,o="",n=1e6,v,y,B,A,U=(a=1)=>{if(s.length<a)throw 2},P=t=>{if(s.push(t)>256)throw 3},G=()=>{if(s.at(-1)>>8)throw 6};
try{for(;n--;){y=p[x++];
if(y&&y<3){B=y<2?1:4;if(x+B>p.length)throw 9;P(p.readIntLE(x,B));x+=B}
else if(y>2&&y<8){U((y-1)/2|0);y==3?s.pop():y==4||y==6?P(s.at(1-y/2)):s.push(...s.splice((1-y)/2,1))}
else if(y>15&&y<35){
if(y==31)throw 5;
else if(y==23||y==27){U();A=s.pop();P(y==23?-A|0:~A)}
else{U(2);B=s.pop();A=s.pop();if(!B&&y>18&&y<23)throw 4;if(y>20&&y<23||y==34)A>>>=0,B>>>=0;P(y==18?Math.imul(A,B):eval("A"+O[y-16]+"B")|0)}}
else if(y>47&&y<53){
if(y==52){if(!c[0])throw 8;x=c.pop()}
else{if(p[x+1]==null)throw 9;B=p.readInt16LE(x);x+=2;if(y>50){if(c[63])throw 7;c.push(x);x=B&65535}else if(y<49||(U(),A=s.pop(),y==49?!A:A))x+=B}}
else if(y==64){U();G();P(m[s.pop()]||0)}
else if(y==65){U(2);G();m[s.pop()]=s.pop()}
else if(y>79&&y<82){U();A=y==80?""+s.pop():String.fromCharCode(s.pop());if(65536-o.length<A.length)throw 11;o+=A}
else if(y==82)P(b[q++]??-1);
else if(y==83){U();throw s.pop()&255}
else throw y==null?9:!y?0:5;
}throw 10;}catch(t){v=t}
k(g,{recursive:!0});
w(g+"/stdout.bin",o,"latin1");
w(g+"/exit.txt",""+v);
})
