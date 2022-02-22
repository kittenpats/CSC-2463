
let title = "Sampler";
let multi
let dis
let slider1

function preload() {
	  multi    = new Tone.MultiPlayer({
		"blip" : "media/blip.wav",
		"CB" : "media/CB.mp3",
		"kick" : "media/kick.mp3",
		"scifi9" : "media/scifi9.mp3"
	}, function(){
		multi.connect(dis);
		multi.start();
	});
}

function setup() {
  createCanvas(600,400);
	background(200);
	dis = new Tone.Distortion(0.8).toMaster();

	//creating buttons to change effect 
	button = createButton ('Effect Change State 1');
	button.position(420, 40);
	button.mousePressed(effectValueChange);// Allow for effect value to change on button click
	
	button = createButton ('Effect Change State 2');
	button.position(220, 40);
	button.mousePressed(effectValueChange);// Allow for effect value to change on button click
	
	// Buttons to trigger samples
	button = createButton('blip');
  button.position(20, 80);
  button.mousePressed(samp1);

	button2 = createButton('CB');
  button2.position(80, 80);
  button2.mousePressed(samp2);

	button3 = createButton('kick');
  button3.position(140, 80);
  button3.mousePressed(samp3);

	button4 = createButton('scifi9');
 button4.position(200, 80);
  button4.mousePressed(samp4);

  slider1 = createSlider(0, 1, 0, 0.3);
}



function draw() {
  strokeJoin(ROUND);
  strokeWeight(3);
  fill(255);
  rect(0, 0, 208, 80);
	fill(100, 200, 170); 
	text(title, 10, 20);
	text("Click buttons to change effect value!", 10, 50);
}

function samp1() {
	multi.start("blip");
}
function samp2() {
	multi.start("CB");
}
function samp3() {
	multi.start("kick");
}
function samp4() {
	multi.start("scifi9");
}

function effectValueChange() {
	if(mouseX > 420){//This measures the left effect button
	  dis.distortion.value = 0.3;
	} else if (mouseX < 320){
	  dis.distortion.value = 0.15;
	}
	
}

