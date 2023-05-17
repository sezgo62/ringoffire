export class Game {
    pop(): string {
      throw new Error('Method not implemented.');
    }
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
          this.stack.push('ace_' + i);
          this.stack.push('clubs_' + i);
          this.stack.push('hearts_' + i);
          this.stack.push('diamonds_' + i);

          shuffle(this.stack);

        }
        console.log(this.stack);

    }

} 


    function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

/*shuffle() {
    let currentIndex = this.stack.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [this.stack[currentIndex], this.stack[randomIndex]] = 
      [this.stack[randomIndex], this.stack[currentIndex]];
    }
  
    return this.stack;
  }*/