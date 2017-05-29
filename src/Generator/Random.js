Random = class {
    static int(bytes) {
        return Math.floor(Math.random() * Math.pow(Math.pow(2, 8), bytes));
    }

    static float() {
        return Math.random();
    }
}
