import React, { useReducer, useRef } from 'react';
import { ACTIONS } from '../store/actions/actions';
import { filterReducer } from '../store/reducers/filterReducer';
import { tasksReducer } from '../store/reducers/tasksReducer';

const tasksInitialState = [];
const filterInitialState = 'SHOW_ALL';

const TasksList = () => {
  const [tasksState, tasksDispatch] = useReducer(
    tasksReducer,
    tasksInitialState
  );
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );

  const newTaskName = useRef('');

  const addTask = () => {
    tasksDispatch({
      type: ACTIONS.ADD,
      payload: {
        name: newTaskName.current.value,
      },
    });
  };

  const deleteTask = (id) => {
    tasksDispatch({
      type: ACTIONS.DELETE,
      payload: {
        id,
      },
    });
  };

  const completeTask = (id) => {
    tasksDispatch({
      type: ACTIONS.TOGGLE,
      payload: {
        id,
      },
    });
  };

  const setFilter = (filter) => {
    filterDispatch({
      type: ACTIONS.SET_FILTER,
      payload: {
        filter,
      },
    });
  };

  const filteredTasks = () => {
    switch (filterState) {
      case 'SHOW_ALL':
        return tasksState;
      case 'SHOW_COMPLETED':
        return tasksState.filter((task) => task.completed === true);
      case 'SHOW_PENDING':
        return tasksState.filter((task) => task.completed === false);
      default:
        return tasksState;
    }
  };

  return (
    <div>
      <h1>Your tasks</h1>
      <div style={{ margin: '1rem' }}>
        <input placeholder="New task" ref={newTaskName}></input>
        <button
          onClick={() => {
            if (newTaskName.current.value !== '') {
              addTask();
              newTaskName.current.value = '';
            }
          }}
        >
          Add
        </button>
      </div>

      {filteredTasks().map((task, index) => (
        <div key={index}>
          <h4
            style={{
              display: 'inline',
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
            onClick={() => completeTask(task.id)}
          >
            {task.name}
          </h4>
          <button
            style={{ marginLeft: '0.5rem' }}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}

      <div>
        <h5>Show:</h5>
        <div>
          {filterState !== 'SHOW_ALL' ? (
            <button onClick={() => setFilter('SHOW_ALL')}>All</button>
          ) : (
            <p>All</p>
          )}
          {filterState !== 'SHOW_COMPLETED' ? (
            <button onClick={() => setFilter('SHOW_COMPLETED')}>
              Completed
            </button>
          ) : (
            <p>Completed</p>
          )}
          {filterState !== 'SHOW_PENDING' ? (
            <button onClick={() => setFilter('SHOW_PENDING')}>Pending</button>
          ) : (
            <p>Pending</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
