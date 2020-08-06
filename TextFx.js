//fx based on Daniel Shiffman's video tutorial 

function MovingDot(x,y){

// this.pos = createVector(x,y);
this.pos = createVector(random(width),random(height));
this.target = createVector(x,y);
// this.vel = createVector();
this.vel = p5.Vector.random2D();
this.acc = createVector();

this.r = 3;
this.maxspeed = 10;
this.maxforce = 1;

this.mycolor = random(100,250);
// this.noiseX;
// this.noiseY;
}



MovingDot.prototype.behaviors = function(){
  // let seek  = this.seek(this.target);
  // this.applyForce(seek);
  // let arrive  = this.arrive(this.target);
  // this.applyForce(arrive);



let arrive = this.arrive(this.target);
let mouse = createVector(mouseX, mouseY);
let flee = this.flee(mouse);

arrive.mult(1);
flee.mult(5);

this.applyForce(arrive);
this.applyForce(flee);



}
MovingDot.prototype.applyForce = function(f){

  this.acc.add(f);

}


MovingDot.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}


MovingDot.prototype.show = function(){
  this.noiseX+= 0.1;
  this.noiseY+= 0.1;

  // let r = noise(this.noiseX)*100;
  // let g = noise(this.noiseX,this.noiseY)*255;
  // stroke(r,0,0);
  stroke(this.mycolor,20,100);
  // stroke(this.mycolor);
  // stroke(random(100,250),20,200);
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);

}


MovingDot.prototype.arrive= function(target){
  let desired = p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  let speed = this.maxspeed;
    if (d < 100) {
    speed = map(d, 0, 20, 0, this.maxspeed);
  } ;
  desired.setMag(speed);
  let steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;

}


MovingDot.prototype.flee = function(target) {
  let desired = p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}


// MovingDot.prototype.seek= function(target){
//   let desired = p5.Vector.sub(target,this.pos);
//   desired.setMag(this.maxspeed);
//   let steer = p5.Vector.sub(desired, this.vel);
//   steer.limit(this.maxforce);
//   return steer;
//
// }
