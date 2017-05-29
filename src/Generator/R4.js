R4 = class extends Generator {
    constructor() {
        super();
        this.name = 'R4';
        this.name = 'R4';
        this.chars = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
        this.middleSquare = new MiddleSquare();
    }

    getChar(i) {
        return this.chars[this.getInt(i) % this.chars.length];
    };

    getInt(i) {
        return this.middleSquare.nextInt(i);
    };
}
