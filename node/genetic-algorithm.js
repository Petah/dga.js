require('.');

const fs = require('fs');
const random = new R4();
// const data = fs.readFileSync(__dirname + '/../data/random-key-smash.bin');
const data = Random.string(Math.pow(2, 10));
console.log(new Distribution(data, 16).toString());

class Chromosome {
    constructor(generation, mutation) {
        this.randomOutput = null;
        this.score = null;
        this.length = data.length;
        this.generation = generation || 1;
        this.mutation = mutation || 1;
        this.functionGenerator = new FunctionGenerator(new R3());
        this.functionCode = this.functionGenerator.generate();
        this.function = eval(this.functionCode);
        this.seed = this.functionGenerator.seed;
    }

    clone() {
        const clone = new Chromosome(this.generation, this.mutation);
        clone.functionGenerator = this.functionGenerator;
        clone.functionCode = this.functionCode;
        clone.function = this.function;
        clone.seed = this.seed;
        return clone;
    }

    mate(other) {
        const chromosome1 = new Chromosome(this.generation + 1);
        const chromosome2 = new Chromosome(this.generation + 1);
        return [chromosome1, chromosome2];
    }

    mutate() {
        this.mutation++;
        this.seed = this.functionGenerator.randomInt();
        return this;
    }

    test(data) {
        this.generate();
        this.score = new Distribution(data, 16).score(this.randomOutput);
        return this;
    }

    generate() {
        let seed = this.seed;
        let result = '';
        for (let i = 0; i < this.length; i++) {
            let nextSeed = this.function(seed);
            result += String.fromCharCode(nextSeed);
            seed = nextSeed;
        }
        this.randomOutput = result;
        return this;
    }

    randomize() {
        this.direction = Math.random() < 0.5 ? 1 : -1;
        return this;
    }
}

class Population {
    constructor(data, populationSize) {
        this.data = data;
        this.generationNumber = 0;
        this.population = [];
        while (this.population.length < populationSize) {
            this.population.push(new Chromosome().randomize());
        }
    }

    sort() {
        this.population.sort((a, b) => a.score - b.score);
    }

    generation() {
        this.population.forEach(chromosome => chromosome.test(this.data));
        this.generationNumber++;
        this.sort();
    }

    cull() {
        // const children = this.population[0].mate(this.population[1]);
        // this.population.splice(this.population.length - 2, 2, children[0], children[1]);

        // Randomize all except best
        // for (let i = 1; i < this.population.length; i++) {
        //     this.population[i] = new Chromosome().randomize();
        // }

        // Mutate best
        this.population[1] = this.population[0].clone().mutate();

        // Randomize worst
        this.population[2] = new Chromosome().randomize();

        // Mutate all
        // this.population.forEach((chromosome) => {
        //     chromosome.mutate();
        // });
    }

    display() {
        console.log(`--- Generation ${this.generationNumber} -----------------------`);
        this.population.forEach(chromosome => console.log(
            'Chromosome score:', chromosome.score,
            'generation:', chromosome.generation,
            'mutation:', chromosome.mutation,
            'seed:', chromosome.seed
            // 'function:', chromosome.functionCode
        ));
        console.log(
            'Chromosome score:', this.population[0].score,
            'generation:', this.population[0].generation,
            'mutation:', this.population[0].mutation,
            'seed:', this.population[0].seed,
            'function:', this.population[0].functionCode
        );
    }
}
const populationCount = 3;
const generationCount = 1000;
const population = new Population(data, populationCount);
let iterationCount = 100;
while (iterationCount-- > 0) {
    for (let i = 0; i < generationCount; i++) {
        population.generation();
        population.cull();
    }
    population.generation();
    population.display();
    population.cull();
}

// const hex = new Hex();
// for (const byte of data) {
//     hex.write(String.fromCharCode(byte));
// }
// hex.flush();

// console.log(new Distribution(data, 16).toString());
// console.log(new Distribution(data, 16).score(data));
// Distribution.summarize(data.toString(), 16);
// Distribution.summarize('fsadfsdafdasdsafdsafds', 16);
// Distribution.score(data.toString(), 'fsadfsdafdasdsafdsafds');