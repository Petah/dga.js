R3 = class extends Generator {
    constructor() {
        super();
        this.name = 'R3';
        this.seed = 0;
    }

    getFloat(i) {
        return Math.random();
    }
}
