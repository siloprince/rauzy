'use strict';

// http://tds.math.msu.su/wiki/images/f/fe/Poster_Taran_Rauzy3D.pdf

let max = 10;
let seed = '1';
for(var i=0;i<max;i++) {
    seed = seed.replace(/1/g,'ab').replace(/2/g,'ac').replace(/3/g,'ad').replace(/4/g,'a')
    .replace(/a/g,'1').replace(/b/g,'2').replace(/c/g,'3').replace(/d/g,'4');
}
let org = [0,0,0,0];
let xyzw = [];
for (let si=0;si<seed.length;si++) {
    let v = seed[si];
    let vv = parseInt(v,10)-1;
    org[vv] +=1;
    xyzw.push(org.concat());
}   
let point = [];
let a  = xyzw[xyzw.length-1][0];
let b = xyzw[xyzw.length-1][1];
let c = xyzw[xyzw.length-1][2];
let d = xyzw[xyzw.length-1][3];
let norm = a*a+b*b+c*c;
a /= norm;
b /= norm;
c /= norm;
d /= norm;
for (let xi=0;xi<xyzw.length;xi++) {
    point.push(
        getContactPoint(
        a,b,c,d,
        xyzw[xi][0],
        xyzw[xi][1],
        xyzw[xi][2],
        xyzw[xi][3]
    )
    );
}
function getContactPoint(a,b,c,d,s,t,u,v) {
let norm = a*a+b*b+c*c+d*d;
let x = (-a*b*t - a*c*u - a*d*v + b*b*s + c*c*s + d*d*s)/norm;
let y = ( a*a*t - a*b*s - b*c*u - b*d*v + c*c*t + d*d*t)/norm;
let z = ( a*a*u - a*c*s + b*b*u - b*c*t - c*d*v + d*d*u)/norm;
let w = ( a*a*v - a*d*s + b*b*v - b*d*t + c*c*v - c*d*u)/norm;
return [x,y,z];
}

console.log('#VRML V2.0 utf8');

let s=0.04;
for (let xi=0;xi<point.length;xi++) {
console.log(`
Transform { 
    translation ${point[xi].join(' ')}
    children Box { size ${s} ${s} ${s} }
} `);
}
