/// <reference path="gameobject.ts"/>

class Basket extends GameObject {
    
    private leftKey : number
    private rightKey   : number
    
    private leftSpeed     : number = 0
    private rightSpeed   : number = 0
    

    
    constructor(xp:number, left:number, right:number) {
        super()
        this.div = document.createElement("basket")
        document.body.appendChild(this.div)



        this.leftKey = left
        this.rightKey = right
        
        this.x = 20;
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = 5
                break
            case this.rightKey: 
                this.rightSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = 0
                break
            case this.rightKey:
                this.rightSpeed = 0
                break
        }
    }

    public update() {
        let newX = this.x - this.leftSpeed + this.rightSpeed

        // als de basket binnen beeld blijft, updaten
        if (newX > 0 && newX < window.innerWidth - 270) this.x = newX
        
        this.div.style.transform = `translatex(${this.x}px)`
        this.div.style.top = (window.innerHeight - 150) + "px";
    }
    
}