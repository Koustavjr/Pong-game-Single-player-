const canvas=document.getElementById('myCanvas');
const context=canvas.getContext('2d');

// canvas height and width
const height=600;
const width=400;

// paddle height and width
const padddleHeight=10;
const padddleWidth=50;

canvas.width=width;
canvas.height=height;

// create rectangle screen
context.fillStyle="blue";
context.fillRect(0,0,width,height);

// creating paddle at top
// we want to start the paddle from 400-50=350/2=175 point on coordinate axis
context.fillStyle='white';
context.fillRect(175,10,padddleWidth,padddleHeight);

// creating paddle at bottom
// paddle location at bottom height-20=600-20=580
context.fillStyle='white';
context.fillRect(175,580,padddleWidth,padddleHeight);


// center line

context.beginPath();
context.setLineDash([6]);
context.moveTo(0,height/2);
context.lineTo(width,height/2);
context.strokeStyle='white';
context.stroke();

// creating the ball
context.beginPath();
context.arc(width/2,height/2,10,2*Math.PI,false);
context.fillStyle='white';
context.fill();