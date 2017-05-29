require('.');

const fs = require('fs');
const random = new R4();
const data = fs.readFileSync(__dirname + '/../data/random-key-smash.bin');

class Chromosome {
    constructor(generation, mutation) {
        this.geneticCode = null;
        this.score = null;
        this.seed = 1;
        this.length = data.length;
        this.generation = generation || 1;
        this.mutation = mutation || 1;
        this.direction = 1;
    }

    mate(other) {
        const chromosome1 = new Chromosome(this.generation + 1);
        chromosome1.geneticCode = random.generateString(this.length);
        chromosome1.seed = this.seed + (this.seed < other.seed ? -2 : 2);
        const chromosome2 = new Chromosome(this.generation + 1);
        chromosome2.geneticCode = random.generateString(this.length);
        chromosome2.seed += other.seed + (this.seed < other.seed ? 2 : -2);
        return [chromosome1, chromosome2];
    }

    mutate() {
        this.seed += this.direction;
        this.mutation++;
        return this;
    }

    test(data) {
        this.generate();
        this.score = new Distribution(data, 16).score(this.geneticCode);
        return this;
    }

    generate() {
        this.geneticCode = random.generateString(this.seed, this.length);
        return this;
    }

    randomize() {
        this.direction = Math.random() < 0.5 ? 1 : -1;
        this.seed = Random.int(4);
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
        const children = this.population[0].mate(this.population[1]);
        this.population[0] = new Chromosome().randomize();
        this.population[1] = new Chromosome().randomize();
        this.population.splice(this.population.length - 2, 2, children[0], children[1]);

        this.population.forEach((chromosome) => {
            chromosome.mutate();
        });
    }

    display() {
        console.log(`--- Generation ${this.generationNumber} -----------------------`);
        this.population.forEach(chromosome => console.log(
            'Chromosome score:', chromosome.score,
            'seed:', chromosome.seed,
            'generation:', chromosome.generation,
            'mutation:', chromosome.mutation
        ));
    }
}

const population = new Population(data, 20);
while (true) {
    for (let i = 0; i < 100; i++) {
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