import React from 'react';
import TodoListItem from './TodoListItem';
import {
    Row
} from 'antd';

const TodoList = (props) => {
    let todos = props.todos.map((td, i)=>{
        return(
            <TodoListItem 
                    key={i}
                    todo={td}
                    index={i}
                    onUpdate={props.onUpdate}/>
        );
    });
    return(
        <Row gutter={16}>
            {todos}
        </Row>
    );
}

export default TodoList;