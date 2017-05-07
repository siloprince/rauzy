'use strict';
let max = 3;
let seed = '1';
for(var i=0;i<max;i++) {
    seed = seed.replace(/1/g,'ab').replace(/2/g,'ac').replace(/3/g,'a')
    .replace(/a/g,'1').replace(/b/g,'2').replace(/c/g,'3');
}
let org = [0,0,0];
let xyz = [];
for (let si=0;si<seed.length;si++) {
    let v = seed[si];
    let vv = parseInt(v,10)-1;
    org[vv] +=1;
    xyz.push(org.concat());
}   
let point = [];
let a  = xyz[xyz.length-1][0];
let b = xyz[xyz.length-1][1];
let c = xyz[xyz.length-1][2];
let norm = a*a+b*b+c*c;
a /= norm;
b /= norm;
c /= norm;
for (let xi=0;xi<xyz.length;xi++) {
    point.push(
        getContactPoint(
        a,b,c,
        xyz[xi][0],
        xyz[xi][1],
        xyz[xi][2]
    )
    );
}
function getContactPoint(a,b,c,s,t,u) {
let norm = a*a+b*b+c*c;
let x = (-a*b*t - a*c*u + b*b*s + c*c*s)/norm;
let y = ( a*a*t - a*b*s - b*c*u + c*c*t)/norm;
let z = ( a*a*u - a*c*s + b*b*u - b*c*t)/norm;
return [x,y,z];
}

console.log('#VRML V2.0 utf8');

let s=0.04;
for (let xi=0;xi<point.length;xi++) {
console.log(`
Viewpoint {
    position ${a} ${b} ${c}
}
Transform { 
    translation ${point[xi].join(' ')}
    children Box { size ${s} ${s} ${s} }
} `);
}
