import React from 'react';
import TodoListItem from './TodoListItem';
import {
    Row,
    Empty
} from 'antd';

const TodoList = (props) => {
    let todos = props.todos.map((td, i)=>{
        return(
            <TodoListItem 
                    key={i}
                    todo={td}
                    index={i}
                    onUpdateStatus={props.onUpdateStatus}
                    onDeleteTodo={props.onDeleteTodo}/>
        );
    });
    if(todos[0] == null){
        return(
            <Row>
                <Empty description={<span>No todos are available</span>}/>
            </Row>
        );        
    }else{
        return(
            <Row gutter={16}>
                {todos}
            </Row>
        );        
    }
}

export default TodoList;