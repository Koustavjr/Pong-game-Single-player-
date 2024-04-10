// select canvas
const canvas=document.getElementById("pong");
const context=canvas.getContext("2d");
const gameOverEl = document.createElement('div');
const {body}=document
// user paddle
const user={
    x:0,
    y:canvas.height/2-100/2,
    height:100,
    width:10,
    color:"white",
    score:0,
}

// com paddle
const com={
    x:canvas.width-10,
    y:canvas.height/2-100/2,
    height:100,
    width:10,
    color:"white",
    score:0
}

// ball
const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    speed:5,
    velocityX:5,
    velocityY:5,
    color:"white",
}

// net
const net={
    x:(canvas.width-2)/2,
    y:0,
    height:10,
    width:2,
    color:"white",
}


// create rectangle
function drawRect(x,y,w,h,color)
{
    context.fillStyle=color;
    context.fillRect(x,y,w,h);
}

// draw net
function drawNet()
{
    for(let i=0;i<=canvas.height;i+=15)
        drawRect(net.x,net.y+i,net.width,net.height,net.color);
}

// draw circle
function drawCircle(x,y,r,color)
{
    context.beginPath();
    context.fillStyle=color;
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

//drawCircle(100,100,5,"white");

//  draw text
function drawText(text,x,y)
{
    context.fillStyle="white";
    context.font="42px fantasy";
    context.fillText(text,x,y);
}

//drawText("points",300,300);


function render()
{   // clear canvas
    drawRect(0,0,canvas.width,canvas.height,"black");
    
    // draw net
    drawNet();

    // draw score
    drawText(user.score,canvas.width/4,canvas.height/5);
    drawText(com.score,3*canvas.width/4,canvas.height/5);

    // draw the paddles
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);

    // draw ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}


// mouse event and paddle movement

canvas.addEventListener('mousemove',movePaddle);

function movePaddle(evt)
{
    let rect=canvas.getBoundingClientRect();
    user.y=evt.clientY-rect.top-user.height/2;
}



// game init
function game()
{
    update();
    render();
}




// collision function
function collision(b,p)
{
    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;

    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;

    return b.left<p.right && b.right>p.left && b.bottom >p.top && b.top<p.bottom;
}

// reset ball

function resetBall()
{
    ball.velocityX=-ball.velocityX;
    ball.y=canvas.height/2;
    ball.x=canvas.width/2;
    ball.speed=5;
}

// update function :score,movement etc
function update()
{
    if((ball.x-ball.radius)<0)
    {
        com.score++;
        resetBall();
        if(com.score===5)
            showGameOverEl("Computer");
    }      
    else if((ball.x+ball.radius)>canvas.width)
    {
        user.score++;
        resetBall();
        if(user.score===5)
        showGameOverEl("User");
    }

    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    // AI to control game
    const compLevel=0.1;
    com.y+= ((ball.y-(com.y+com.height/2)))*compLevel;

    if(ball.y+ball.radius>canvas.height || ball.y-ball.radius<0)
    {
        ball.velocityY=- ball.velocityY;
    }

    let player= (ball.x+ball.radius<canvas.width/2)?user:com;

    if(collision(ball,player))
        {
            let normalization=player.height/2;
            let collidePoint=ball.y-(player.y+normalization);
            collidePoint=collidePoint/normalization;

            // angle in radian
            let angleRad=collidePoint*(Math.PI/4);

            // direction
            let direction = (ball.x+ball.radius<canvas.width/2)?1:-1;

            // change vel in X and Y
            ball.velocityX=direction*ball.speed*Math.cos(angleRad);
            ball.velocityY=ball.speed*Math.sin(angleRad);

            // every time the ball hit a paddle we increase its speed
            ball.speed=ball.speed+0.5;


        }
    
}



function showGameOverEl(winner) {
    // Hide Canvas
    canvas.hidden = true;
    // Container
    gameOverEl.textContent = ''; // Clear previous content
    gameOverEl.classList.add('game-over-container');
    // Title
    const title = document.createElement('h1');
    title.textContent = `${winner} Wins!`;
    const msg=document.createElement('h2');
    msg.textContent="please refresh to play again!";
    // Append
    gameOverEl.append(title,msg); // Append title to gameOverEl
    // Append gameOverEl to body (if it's not already appended somewhere else)
    if (!document.body.contains(gameOverEl)) {
        document.body.appendChild(gameOverEl);
    }
}


const framePerSecond=50;
let loop=setInterval(game,1000/framePerSecond);