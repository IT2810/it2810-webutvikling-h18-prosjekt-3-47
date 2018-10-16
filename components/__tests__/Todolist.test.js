import {View} from 'react-native';
import React from 'react';
import Todolist from '../Todolist';
import renderer from 'react-test-renderer';



describe('TodoList Component', () => {

    /*
    it('should render new tasks when they are added', () => {
        const wrapper = shallow(<View />);

        const firstView = wrapper.find('view').at(0);
        const secondView = wrapper.find('view').at(1);

        expect(firstView.props().style.toEqual([styles.container, { paddingBottom: this.state.viewPadding }]));

    });

    */

    it('renders correctly', () => {
        const todos = renderer.create(<Todolist />);

        expect(todos.toJSON()).toMatchSnapshot();
    });


    it('should have empty tasks in state when first loading', () => {
        const todoLists = renderer.create(<Todolist />).getInstance();

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
        const todoListInstanceRendered = renderer.create(todoListsInstance.instance);

        todoListsInstance.setState({
            text: 'TODO-dkfkdfjfjjdf-1'
        }, () => {
            todoListsInstance.addTask();
        });

        expect(todoListsInstance.state.tasks).toEqual([
            {
                key: '0',
                text: 'TODO-dkfkdfjfjjdf-1'
            }
        ]);

        // expect(todoLists.findByType())

        console.log(todoLists.toJSON());
        console.log(todoLists.toJSON().children);
        //console.log(todoListsInstance);


        /*

        console.log(renderer.create(todoListsInstance.instance));
        console.log(todoListInstanceRendered);
        console.log(todoListInstanceRendered.toJSON());
        console.log(todoListInstanceRendered.toTree());

        */


        expect(todoListInstanceRendered.toJSON()).toMatchSnapshot();
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
                key: '0',
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
                key: '0',
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
                key: '0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: '1',
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
                key: '0',
                text: 'TODO-ssdfodu33sdjsdh-1'
            },
            {
                key: '1',
                text: 'TODO-ssdfodu33sdjsdh-2'
            },
            {
                key: '2',
                text: 'TODO-ssdfodu33sdjsdh-3'
            }
        ]);
    });

});


