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

    generateString(length) {
        var result = '';
        for (var i = 0; i < length; i++) {
            result += this.getChar(i);
        }
        return result;
    }

    generateByteArray(length) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(this.getByte(i));
        }
        return result;
    }
}
