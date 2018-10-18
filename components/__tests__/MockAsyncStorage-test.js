// MockAsyncStorage example code from https://github.com/devmetal/mock-async-storage

import 'react-native';
import MockAsyncStorage from 'mock-async-storage'
import React from 'react';

const mock = () => {
    const mockImpl = new MockAsyncStorage();
    jest.mock('AsyncStorage', () => mockImpl)
};

mock();

import { AsyncStorage as storage } from 'react-native'



it('Mock Async Storage working', async () => {
    await storage.setItem('myKey', 'myValue');
    const value = await storage.getItem('myKey');
    expect(value).toBe('myValue')
});
