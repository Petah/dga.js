ChunkMatcher = class {
    match(data, chunk) {
        for (let i = 0; i < data.length - chunk.length; i++) {
            if (data.substr(i, chunk.length) === chunk) {
                return i;
            }
        }
        return null;
    }
}
