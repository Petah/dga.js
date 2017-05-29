Generator = class {
    intToByte(value) {
        return value % 256;
    }

    floatToByte(value) {
        return this.intToByte(this.floatToInt(value));
    }

    floatToInt(value) {
        return parseInt(value.toString().replace(/[.e-]/g, ''));
    }

    getInt(i) {
        return this.floatToInt(this.getFloat(i));
    }

    getByte(i) {
        return this.floatToByte(this.getFloat(i));
    }

    getChar(i) {
        return String.fromCharCode(this.getByte(i));
    }

    generateString(seed, length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            let next = this.getChar(seed);
            result += next;
            seed = next;
        }
        return result;
    }

    generateByteArray(length) {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push(this.getByte(i));
        }
        return result;
    }
}
