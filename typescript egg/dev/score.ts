class Score {
    private scoreview: HTMLElement
    
    //Start score
    private score: number = 0

    constructor(){
        //Create score in HTML
        this.scoreview = document.createElement("score")
        document.body.appendChild(this.scoreview)

        let container = document.getElementsByTagName("game")[0]!
        container.appendChild(this.scoreview)
    }

    public update(){
        this.scoreview.innerHTML = "Score: " + this.score  
    }

    public addScore(n:number){
        this.score += n
    }

}