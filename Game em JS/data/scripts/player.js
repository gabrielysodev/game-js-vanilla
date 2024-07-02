import { StandingLeft, StandingRight, RunningLeft, RunningRight, JumpingRight, JumpingLeft, FallingLeft, FallingRight  } from './state.js';

export default class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this),
                       new StandingRight(this),
                       new RunningLeft(this),
                       new RunningRight(this),
                       new JumpingLeft(this),
                       new JumpingRight(this),
                       new FallingLeft(this),
                       new FallingRight(this)];
        this.currentState = this.states[0];
        this.image = document.getElementById('playerRight');
        this.width = 128,25;
        this.height = 130;
        this.x = this.gameWidth/2 - this.width/2;
        this.y = this.gameHeight - this.height;
        this.vy = 0;
        this.weight = 1;
        this.frameX = 0;
        this.maxFrame = 4;
        this.frameY = 6;
        this.speed = 0;
        this.maxSpeed = 10;
    }
    draw(context){
        if (this.currentState === 'STANDING RIGHT')
            if (this.frameX < this.maxFrame ) this.frameX++;
            else this.frameX = 0;
        else if (this.currentState === 'STANDING LEFT')
            if (this.frameX < this.maxFrame ) this.frameX--;
            else this.frameX = 0;
            
        context.drawImage(this.image,
                        this.width * this.frameX,
                        this.height * this.frameY,
                        this.width, this.height,
                        this.x, this.y, this.width,
                        this.height);
    }
    update(input){
        this.currentState.handleInput(input);
        this.x += this.speed;
        //hm
        if(this.x <= 0) this.x = 0;
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        //vm
        this.y += this.vy;
        if (!this.onGround()){
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.width;
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height;
    }
}