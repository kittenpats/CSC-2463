var brushColor;

function setup() {
  createCanvas(1000, 1000);
  strokeWeight(5);
  brushColor = color(228, 32,32);
}

function draw() {
  //background(220);
  noStroke();
  fill(228, 32, 32); //red paint
  rect(0, 0, 60,60);
  fill(255, 128, 0); //orange paint
  rect(0, 60, 60, 60);
  fill(255, 255,0); //yellow paint
  rect(0, 120, 60,60);
  fill(0, 204, 0); //green paint
  rect(0, 180, 60, 60);
  fill(	0, 255, 255); //cyan paint
  rect(0, 240, 60, 60);
  fill(0, 0, 255); //blue paint
  rect(0, 300, 60, 60);
  fill(127, 0, 255); //purple paint
  rect(0, 360, 60, 60);
  fill(150, 75, 0); //brown paint
  rect(0, 420, 60, 60);
  fill(255, 255, 255); //white paint
  rect(0, 480, 60, 60);
  fill(0); //black paint
  rect(0, 540, 60, 60);
  
  if(mouseIsPressed == true){
    if(mouseY < 600){
      if(mouseX < 60 && mouseY < 60){
        brushColor = color(228, 32, 32); //clicks red paint
      } else if(mouseX < 60 && mouseY < 120){
        brushColor = color(255, 128, 0); //clicks orange paint
      } else if(mouseX < 60 && mouseY < 180){
        brushColor = color(255, 255, 0); //clicks yellow paint
      } else if(mouseX < 60 && mouseY < 240){
        brushColor = color(0, 240, 0); //clicks green paint
      } else if(mouseX < 60 && mouseY < 300){
        brushColor = color(0, 255, 255); //clicks cyan paint
      } else if(mouseX < 60 && mouseY < 360){
        brushColor = color(0, 0, 255); //clicks blue paint
      } else if(mouseX < 60 && mouseY < 420){
        brushColor = color(127, 0, 255); //clicks purple paint
      } else if(mouseX < 60 && mouseY < 480){
        brushColor = color(150, 75, 0); //clicks brown paint
      } else if(mouseX < 60 && mouseY < 540){
        brushColor = color(255, 255, 255); //clicks white paint
      } else if(mouseX < 60 && mouseY < 600){
        brushColor = color(0); //clicks black paint
      }
    }
    strokeWeight(5);
    stroke(brushColor);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  console.log(mouseX);
  console.log(mouseY);
   
}