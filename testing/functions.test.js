const functions = require('./functions');

//Før enhver
//beforeEach(()=> initDatabase());
//Etter enhver
//afterEach(() => closeDatabase());

//Før alle
//beforeAll(()=> initDatabase());
//Etter alle
//afterAll(() => closeDatabase());

//const initDatabase = () => console.log("Database Initialized...");
//const closeDatabase = () => console.log("Database Closed...");
const nameCheck = () => console.log("Checking Name...")

describe('Ckecking Names', () => {
    beforeEach(() => nameCheck());

    test('User is Jeff', () => {
        const user = 'Jeff';
        expect(user).toBe('Jeff');
    });

    test('User is Karen', () => {
        const user = 'Karen';
        expect(user).toBe('Karen');
    });
});
//Feil i testsuite == du har ikke en test i testfila di ;)
//To be
test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2,2)).toBe(4);
});

//not to be
test('Adds 2 + 2 to NOT equal 5', () => {
    expect(functions.add(2,2)).not.toBe(5);
});

/*
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
*/
//Working with async data

//Promise
/*
test('User fetched name should be Leanne Graham', () => {
    expect.assertions(1);
    return functions.fetchUser()
    .then(data => {
        expect(data.name).toEqual('Leanne Graham');
    })
})*/

//Async await
/*
test('User fetched name should be Leanne Graham', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
})*/