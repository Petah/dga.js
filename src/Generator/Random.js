Random = class {
    static int(bytes) {
        return Math.floor(Math.random() * Math.pow(Math.pow(2, 8), bytes));
    }

    static float() {
        return Math.random();
    }

    static string(length) {
        let result = '';
        while (length--) {
            result += String.fromCharCode(Random.int(1));
        }
        return result;
    }

    static charArray(length) {
        const result = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            result[i] = Random.int(1);
        }
        return result;
    }

    static choice(options) {
        return options[Math.floor(Math.random() * options.length)];
    }
}
