const functions = require('./functions');

//To be
test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2,2)).toBe(4);
});

//not to be
test('Adds 2 + 2 to NOT equal 5', () => {
    expect(functions.add(2,2)).not.toBe(5);
});


//To be null
test('Should be null', () => {
    expect(functions.isNull()).toBeNull();
});

//To be falsy
test('Should be falsy', () => {
    expect(functions.checkValue(null)).toBeFalsy();
});

//toBe is for primitive types
//toEqual is for reference types

//toEqual
test('User should be Jørgen Johansen object', () => {
    expect(functions.createUser()).toEqual({firstName: 'Jørgen', lastName: 'Johansen'});
});

//Less than and greater than
test('should be under 1600', () =>{
    const load1 = 800;
    const load2 = 700;
    expect(load1 + load2).toBeLessThan(1600);
})

//Regex
test('There is no I in team', () => {
    expect('team').not.toMatch(/I/i);
})

//Array
test('Admin should be in usernames', () =>{
    usernames = ['John','Karen','Admin']
    expect(usernames).toContain('Admin')
})

//Working with async data
test('User fetched name should be Leanne Graham', () => {
    //expect.assertions(1);
    return functions.fetchUser()
    .then(data => {
        expect(data.name).toEqual('Leanne Graham');
    })
})