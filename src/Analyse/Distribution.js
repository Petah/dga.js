Distribution = class {
    constructor(data, amount) {
        data = data.toString();
        this.amount = amount;
        this.distribution = new Array(Math.floor(256 / amount)).fill(0);
        for (let byte of data) {
            this.distribution[Math.floor(byte.charCodeAt(0) / amount)]++;
        }
    }

    toString() {
        let result = '';
        for (let charCode in this.distribution) {
            result += (charCode * this.amount).toString();
            result += '-';
            result += (((parseInt(charCode) + 1) * this.amount) - 1).toString();
            result += ': ' + this.distribution[charCode];
            result += '\n';
        }
        return result;
    }

    score(data) {
        const compareTo = new Distribution(data, this.amount);
        let total = 0;
        for (let i = 0; i < this.distribution.length; i++) {
            total += (this.distribution[i] - compareTo.distribution[i]) * (this.distribution[i] - compareTo.distribution[i]);
        }
        return total;
    }
}
