FunctionGenerator = class {
    constructor(random) {
        this.random = random;
        this.seed = this.randomInt();
        this.operationCount = Math.ceil(Math.random() * 10);
        this.operations = {
            add: () => `seed += ${this.randomInt()};`,
            subtract: () => `seed -= ${this.randomInt()};`,
            multiply: () => `seed *= ${this.randomInt()};`,
            divide: () => `seed /= ${this.randomInt()};`,
            leftShift: () => `seed = seed << ${this.randomInt()};`,
            rightShift: () => `seed = seed >> ${this.randomInt()};`,
            leftShiftSquare: () => `seed ^= (seed << ${this.randomInt()});`,
            rightShiftSquare: () => `seed ^= (seed >> ${this.randomInt()});`,
        };
    }

    generate() {
        const result = []
        const operations = Object.values(this.operations);
        for (let i = 0; i < this.operationCount; i++) {
            const operation = operations[this.random.getInt() % operations.length].bind(this)();
            result.push(operation);
        }
        return `
            (seed) => {
                ${result.join('\n    ')}
                return Math.abs(seed) % 256;
            }
        `.replace(/^ {12}/gm, '').trim();
    }

    randomInt() {
        return Random.int(Random.choice([1, 2, 3, 4]));
    }
}
