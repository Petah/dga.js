require('.');

const fs = require('fs');
const formatter = require('js-beautify');
// console.log(formatter);
// process.exit();

class FunctionGenerator {
    constructor(random) {
        this.random = random;
        this.seed = this.randomInt();
        this.operationCount = Math.ceil(Math.random() * 10);
        this.operations = {
            add: () => `result += ${this.randomInt()};`,
            subtract: () => `result -= ${this.randomInt()};`,
            multiply: () => `result *= ${this.randomInt()};`,
            divide: () => `result /= ${this.randomInt()};`,
            leftShift: () => `result = result << ${this.randomInt()};`,
            rightShift: () => `result = result >> ${this.randomInt()};`,
            leftShiftSquare: () => `result ^= (result << ${this.randomInt()});`,
            rightShiftSquare: () => `result ^= (result >> ${this.randomInt()});`,
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
                let result = seed;
                ${result.join('\n    ')}
                return Math.abs(result) % 256;
            }
        `.replace(/^ {12}/gm, '').trim();
    }

    randomInt() {
        return Random.int(Random.choice([1, 2, 3, 4]));
    }
}

const functionGenerator = new FunctionGenerator(new R3());
let generated = functionGenerator.generate();
let length = 1024;
let wrapper = `
    const next = ${generated}

    let result = '';
    let seed = ${functionGenerator.seed};
    for (let i = 0; i < ${length}; i++) {
        let nextSeed = next(seed);
        result += String.fromCharCode(nextSeed);
        seed = nextSeed;
    }
    module.exports = result;
`;
wrapper = formatter.js(wrapper);
fs.writeFileSync(__dirname + '/functions/generated.js', wrapper);
const result = require('./functions/generated');
const hex = new Hex();
for (const byte of result) {
    hex.write(byte);
}
hex.flush();
console.log(new Distribution(result, 16).toString());
console.log('Seed: ', functionGenerator.seed);
console.log(generated);
