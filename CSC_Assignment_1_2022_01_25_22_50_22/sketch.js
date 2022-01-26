function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  //example 1
  background(50, 250, 50); 
  ellipse(200,200,160,160);
  rect(350,130,150,150);
  
  //example 2
  //noStroke(); 
  //fill(255,0,0,3);
  //ellipse(200,200,160,160);
  
  //fill(0,0,255,3);
  //ellipse(200,150,160,160);
  
  //fill(0,255,0,3);
  //ellipse(150,200,160,160);
  
  //example 3
  //background(0); 
  //fill(255,255,51)
  //arc(200,200,200,200,30,300);
  
  //fill(255, 0, 0);
  //noStroke();
  //ellipse(460,200,200,160);
  //rect(360,200,200,140);
  
  //fill(255,255,255);
  //ellipse(410,200,60,60);
  //ellipse(510,200,60,60);
  //fill(0,0,255);
  //ellipse(410,200,35,35);
  //ellipse(510,200,35,35);
  
  //example 4
  //background(0,0,153)
  //strokeWeight(5);
  //stroke(255,255,255);
  //fill(0,255,0);
  //ellipse(350,250,160,160);
  //fill(255,0,0);
  //beginShape();
  //vertex(350,170);
  //vertex(365,230);
  //vertex(430,230);
  //vertex(380,260);
  //vertex(390,320);
  //vertex(350,270);
  //vertex(310,320);
  //vertex(320,260);
  //vertex(270,230);
  //vertex(330,230);
  //vertex(350,170);
  //endShape();
  
  console.log(mouseX);
  console.log(mouseY);
}