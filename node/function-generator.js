require('.');

const fs = require('fs');

class FunctionGenerator {
    constructor(random) {
        this.random = random;
        this.operationCount = 4;
        this.operations = {
            add: () => `result += i;`,
            subtract: () => `result -= i;`,
            multiply: () => `result *= i;`,
            divide: () => `result /= i;`,
        };
    }

    generate() {
        const result = []
        const operations = Object.values(this.operations);
        for (let i = 0; i < this.operationCount; i++) {
            const operation = operations[this.random.getInt() % operations.length]();
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
}

const r3 = new R3();
const functionGenerator = new FunctionGenerator(r3);
let generated = functionGenerator.generate();
console.log(generated);
generated = `
    require('./base');
    const mutate = ${generated}

    const fs = require('fs');
    const data = fs.readFileSync(__dirname + '/../../data/random-key-smash.bin');
    const hex = new Hex();

    let i = 0;
    for (const byte of data) {
        hex.write(String.fromCharCode(mutate(i++, byte)));
    }
    hex.flush();
`;
fs.writeFileSync(__dirname + '/functions/generated.js', generated);
require('./functions/generated');