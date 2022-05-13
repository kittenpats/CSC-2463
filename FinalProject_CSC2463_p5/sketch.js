let serialPDM;
let portName = 'COM3'
let sensors;


let balloons = [];
let balloonNumer, currentScore;
let start, end; //states of the game
let startTime;
let counter, score;
let backgroundImage;
let sampler;
let delay;
let sampler2;
let sheet;

let isLoading = false;

function preload(){
  backgroundImage = loadImage("background.jpg");
  delay = new Tone.PingPongDelay(0).toMaster();
  sheet = loadImage("balloon.png");
  
  sampler = new Tone.Player({
    "url": "media/pop.mp3",
  }).connect(delay);
  
  sampler2 = new Tone.Player({
    "url": "media/lala.mp3",
    "loop" : true
  }).connect(delay);
}

function setup() {
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
  
  createCanvas(600, 400);
  
  counter = 0;
  currentScore = 0;
  balloonNumber = 20;
  frameRate(20);
  loadBalloons(); //loads an array of balloons
  start = true; //state start
  end = false; //state game over
  score = 0;
  textSize(24);
  rectMode(CENTER);
}

function draw() {
  image(backgroundImage, width/2, height/2, 600, 600);
  
  if(start){ //state New Game
    fill(100, 100, 100);
    rect(width/2, height/2, 300, 150, 7);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text("Pop all of the balloons!\n Click anywhere to begin!\n You have 30 seconds", width/2, height/2);
    
    if(mouseIsPressed){
      sampler2.start();
      serialPDM.transmit('led1', 1);
      let fade = Math.floor(map(mouseY,0,height,0,255, true));
      serialPDM.transmit('fade',fade);
      start = false;
      startTime = millis();
    }
  } else if(end){ //state Game Over
    console.log("Game Over")
    serialPDM.transmit('led2', 0);
    balloons = [];
    fill(100, 100, 100);
    rect(width/2, height/2, 300, 150, 7);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game Over!\n Final Score: " + score + "\n Click to replay!", width/2, height/2);
    
    if(mouseIsPressed){
      setup();
    }
  } else{ //state Game
    fill(0, 0, 0);
    if(isLoading == false) {
      moveBalloons();
    }
    textAlign(LEFT, TOP);
    text("Score: " + score, 5, 30);
    text("Time: " + timer(), 5, 55);
  }
}

function timer(){
  let time = int((millis() - startTime) / 1000);
  if(time > 30){
    end = true;
  }
  return time;
}

function loadBalloons(){ //load balloon objects into the array
  isLoading = true;
  console.log("loading Ballongs")
  counter = 0;
  balloons = []; //clear the balloon array
  
  for(i = 0; i < balloonNumber; i++){
    balloons[i] = new Balloon(random(width), random(height), 4);
  }
  isLoading = false;
}

function moveBalloons(){
  for(i = 0; i < balloonNumber; i++){
    balloons[i].move();
  }
}

function mouseReleased(){
  if(isLoading == false) {
    if(balloons.length > 0){
       for(i = 0; i < balloons.length; i++){
      if(balloons[i].checkForPop() === true){
        counter++;
        score++;
      }
    }
    }
    console.log("check balloons")
    if(counter >= balloonNumber){
      loadBalloons(); //load more balloons
    }
    push(); //visualization of click
    fill(255, 0, 0);
    strokeWeight(3);
    ellipse(mouseX, mouseY, 22, 22);
    pop();
  }
}

function Balloon(initX, initY, initSpeed){
  //property variables
  let xPosition = initX
  let yPosition = initY;
  let speed = initSpeed;
  let popped = false;
  // let fly = [];
  let fly = [sheet.get(88, 88, 94, 92), sheet.get(88, 88, 94, 92), sheet.get(88, 88, 94, 92), sheet.get(88, 88, 94, 92)];
  // let burst;
  let burst = sheet.get(264, 88, 90, 96);
  // let sheet = loadImage("balloon.png", function(){
  //   fly[0] = sheet.get(88, 88, 94, 92); 
  //   fly[1] = sheet.get(88, 88, 94, 92); 
  //   fly[2] = sheet.get(88, 88, 94, 92);
  //   fly[3] = sheet.get(88, 88, 94, 92);
  //   burst = sheet.get(264, 88, 90, 96);
  // });
  let frame = 0;
  let direction = "up";
  imageMode(CENTER);
  
  this.move = function(){
    if(popped){
      drawBurst();
    } else{
      drawMoving();
      frame++;
    }
  }
  
  function drawBurst(){
    let rotateAmount = rotateIt();
    
    push();
    translate(xPosition, yPosition);
    rotate(rotateAmount);
    image(burst, 0, 0, 79, 101);
    pop();
  }
  
  function drawMoving(){ //move the balloon
    if(direction == "up"){
      yPosition = yPosition - speed;
      if(yPosition < 0){
        yPosition = height;
      }
    }
    //draw the balloon
    let rotateAmount = rotateIt();
    
    push();
    translate(xPosition, yPosition);
    rotate(rotateAmount);
    image(fly[frame % 4], 0, 0, 80, 80);
    pop();
  }
  
  function rotateIt(){
    if(direction == "up"){
      return 0;
    }
  }
  
  this.checkForPop = function(){
    console.log("popping balloons");
    sampler.start();
    if (direction == "up"){
      if (mouseY < yPosition + 26 && mouseY > yPosition - 26 && mouseX > xPosition - 26 && mouseX < xPosition + 26){
        popped = true;
        return true;
     }
   }
    //add code if want to increase speed
    return false;
  }
}

