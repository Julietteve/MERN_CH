export class Suma {

    private firstDigit : number;
    private secondDigit : number;

    constructor( firstDigit: number, secondDigit : number){
        this.firstDigit = firstDigit
        this.secondDigit = secondDigit
    }

    resultado() : number {
        return this.firstDigit + this.secondDigit
    }

}

export class Resta {

    private firstDigit : number;
    private secondDigit : number;

    constructor( firstDigit: number, secondDigit : number){
        this.firstDigit = firstDigit
        this.secondDigit = secondDigit
    }

    resultado() : number {
        return this.firstDigit - this.secondDigit
    }
    
}
