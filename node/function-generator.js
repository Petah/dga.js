require('.');

const fs = require('fs');
const formatter = require('js-beautify');
// console.log(formatter);
// process.exit();

class FunctionGenerator {
    constructor(random) {
        this.random = random;
        this.operationCount = 4;
        this.operations = {
            add: () => `result += i;`,
            subtract: () => `result -= i;`,
            multiply: () => `result *= i;`,
            divide: () => `result /= i;`,
            leftShift: () => `result = result << ${this.randomInt32()};`,
            rightShift: () => `result = result >> ${this.randomInt32()};`,
            leftShiftSquare: () => `result ^= (result << ${this.randomInt32()});`,
            rightShiftSquare: () => `result ^= (result >> ${this.randomInt32()});`,
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
            (i) => {
                let result = i;
                ${result.join('\n    ')}
                return Math.abs(result) % 256;
            }
        `.replace(/^ {12}/gm, '').trim();
    }

    randomInt8() {
        return Math.floor(Math.random() * Math.pow(2, 8));
    }

    randomInt16() {
        return Math.floor(Math.random() * Math.pow(2, 16));
    }

    randomInt32() {
        return Math.floor(Math.random() * Math.pow(2, 32));
    }
}

const r3 = new R3();
const functionGenerator = new FunctionGenerator(r3);
let generated = functionGenerator.generate();
console.log(generated);
let wrapper = `
    require('./base');
    const mutate = ${generated}

    const fs = require('fs');
    const data = fs.readFileSync(__dirname + '/../../data/random-key-smash.bin');
    const hex = new Hex();

    let result = '';
    let i = 0;
    for (const byte of data) {
        result += String.fromCharCode(mutate(i++, byte));
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
console.log(new Distribution(generated, 16).toString());
Distribution.summarize(generated, 16);
console.log(generated);
