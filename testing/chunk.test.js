const chunkArray = require('./chunk');

test('chunkArray functions exists', () => {
    expect(chunkArray).toBeDefined();
});

test('Chunk an array of 3 values with length of 1', () => {
    const numbers =[1,2,3];
    const len = 1;
    const chunkedArr = chunkArray(numbers, len);
    expect(chunkedArr).toEqual([[1],[2],[3]]);
});
