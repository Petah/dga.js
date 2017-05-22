Hex = class {
    constructor() {
        this.lineCount = 0;
        this.line = [];
    }

    write(byte) {
        this.lineCount++;
        process.stdout.write(this.toHex(byte) + ' ');
        this.line.push(this.toAscii(byte));
        if (this.lineCount % 4 == 0) {
            process.stdout.write(' ');
        }
        if (this.lineCount >= 16) {
            process.stdout.write(' ');
            process.stdout.write(this.line.join(''));
            process.stdout.write('\n');
            this.line = [];
            this.lineCount = 0;
        }
    }

    flush() {
        if (!this.lineCount) {
            return;
        }
        while (this.lineCount < 16) {
            process.stdout.write('.. ');
            this.line.push('.');
            this.lineCount++;
            if (this.lineCount % 4 == 0) {
                process.stdout.write(' ');
            }
        }
        process.stdout.write(' ');
        process.stdout.write(this.line.join(''));
        process.stdout.write('\n');
    }

    toHex(byte) {
        return ('0'+(Number(byte.charCodeAt(0)).toString(16))).slice(-2);
    }

    toAscii(byte) {
        return byte.replace(/[^ -~]/, '.');
    }
};
