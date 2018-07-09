class GameObject {
    protected div : HTMLElement

    protected x : number
    protected y : number

    constructor() {
        console.log("I am a gameobject")
    }

    protected update(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }
}