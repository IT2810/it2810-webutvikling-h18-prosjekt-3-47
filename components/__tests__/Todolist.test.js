// import {View} from 'react-native';
import React from 'react';
import Todolist from '../Todolist';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// Mocking new Date() so that all such calls will end up with the same date
beforeAll(() => {
    const DATE_TO_USE = new Date('2017-02-02T12:54:59.218Z');

    const _Date = Date;
    const MockDate = (...args) => {
        switch (args.length) {
            case 0:
                return DATE_TO_USE;
            default:
                return new _Date(...args);
        }
    };
    MockDate.UTC = _Date.UTC;
    MockDate.now = () => DATE_TO_USE.getTime();
    MockDate.parse = _Date.parse;
    MockDate.toString = _Date.toString;
    MockDate.prototype = _Date.prototype;
    global.Date = MockDate;
});


/*

//let testData = ['Husk å ta ut søpla', 'Husk å vanne blomstene'];

function mockGetTestData() {
    return 'Husk å ta ut søpla||Husk å vanne blomstene'
}
jest.mock('AsyncStorage', () => ({
    setItem: jest.fn(() => {
        return new Promise((resolve, reject) => {
            resolve((data) => {console.log('\n\n\n AsyncStorage.setItem: ', data)});
        });
    }),
    multiSet:  jest.fn(() => {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }),
    getItem: jest.fn(() => {
        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(mockGetTestData()));
        });
    }),
    multiGet: jest.fn(() => {
        return new Promise((resolve, reject) => {
            resolve(mockGetTestData());
        });
    }),
    removeItem: jest.fn(() => {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }),
    getAllKeys: jest.fn(() => {
        return new Promise((resolve) => {
            resolve(['TASKS']);
        });
    })
}));

*/


describe('Snapshot', () => {
    it('renders correctly', () => {
        const todos = renderer.create(<Todolist />);

        expect(todos.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with ShallowRenderer', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Todolist />);
        const result = renderer.getRenderOutput();

        expect(result).toMatchSnapshot();
    });
});


describe('Logic', () => {


    /*
    it('should render new tasks when they are added', () => {
        const wrapper = shallow(<View />);

        const firstView = wrapper.find('view').at(0);
        const secondView = wrapper.find('view').at(1);

        expect(firstView.props().style.toEqual([styles.container, { paddingBottom: this.state.viewPadding }]));

    });

    */


    it('should have empty tasks in state when first loading', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        console.log(todoLists.state.tasks);
        expect(todoLists.state.tasks).toEqual([])
    });

    it('should have empty text in state when first loading', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        expect(todoLists.state.text).toEqual('')
    });

    it('should not add a new task when addTask is called and text is empty', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        // state.text is at default empty string value, so no tasks should be created by addTask
        todoLists.addTask();
        expect(todoLists.state.tasks).toEqual([]);


        // Adds a lot of whitespace to state.text, then runs addTask
        todoLists.setState({
            text: '     ' +
                '   '
        }, () => {
            todoLists.addTask();
        });

        // addTask should filter on whitespace, so no tasks should be created.
        expect(todoLists.state.tasks).toEqual([]);
    });


    it('should add a new task when addTask is called and there is text', () => {
        const todoLists = renderer.create(<Todolist />);
        const todoListsInstance = todoLists.getInstance();
        // const todoListInstanceRendered = renderer.create(todoListsInstance.instance);

        todoListsInstance.setState({
            text: 'TODO-dkfkdfjfjjdf-1'
        }, () => {
            todoListsInstance.addTask();
        });

        expect(todoListsInstance.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-dkfkdfjfjjdf-1'
            }
        ]);
    });

    it('should clear state.text when adding a task', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        todoLists.setState({
            text: 'TODO-jdjdhfhhhfncnc-2'
        }, () => {
            todoLists.addTask();
        });

        // Expecting a task to be added
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-jdjdhfhhhfncnc-2'
            }
        ]);

        // Expecting state.text to be cleared by addTask
        expect(todoLists.state.text).toEqual('');
    });

    it('should add several tasks', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-1'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be one task
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-2'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be two tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-3'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be three tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            },
            {
                key: Date.now() + '_2',
                text: 'TODO-ssdfodu33sdjsdh-3'
            }
        ]);
    });

    it('should clear state.text when adding a task', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        todoLists.setState({
            text: 'TODO-jdjdhfhhhfncnc-2'
        }, () => {
            todoLists.addTask();
        });

        // Expecting a task to be added
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-jdjdhfhhhfncnc-2'
            }
        ]);

        // Expecting state.text to be cleared by addTask
        expect(todoLists.state.text).toEqual('');
    });

    it('should add several tasks', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-1'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be one task
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-2'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be two tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-3'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be three tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            },
            {
                key: Date.now() + '_2',
                text: 'TODO-ssdfodu33sdjsdh-3'
            }
        ]);
    });

    it('should not delete non-existing task', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        const threeTasks = [
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            },
            {
                key: Date.now() + '_2',
                text: 'TODO-ssdfodu33sdjsdh-3'
            }
        ];

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-1'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be one task
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-2'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be two tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-3'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be three tasks
        expect(todoLists.state.tasks).toEqual(threeTasks);

        todoLists.deleteTask('aass');

        expect(todoLists.state.tasks).toEqual(threeTasks);

        todoLists.deleteTask('3.1');

        expect(todoLists.state.tasks).toEqual(threeTasks);

        todoLists.deleteTask('1 + 1');

        expect(todoLists.state.tasks).toEqual(threeTasks);

        todoLists.deleteTask('0 1');

        expect(todoLists.state.tasks).toEqual(threeTasks);
    });

    it('should delete task', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-1'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be one task
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-2'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be two tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            }
        ]);

        todoLists.setState({
            text: 'TODO-ssdfodu33sdjsdh-3'
        }, () => {
            todoLists.addTask();
        });

        // Expecting there to be three tasks
        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            },
            {
                key: Date.now() + '_2',
                text: 'TODO-ssdfodu33sdjsdh-3'
            }
        ]);

        todoLists.deleteTask(1);

        expect(todoLists.state.tasks).toEqual([
            {
                key: Date.now() + '_0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: Date.now() + '_2',
                text: 'TODO-ssdfodu33sdjsdh-3'
            }
        ]);


    });

});


