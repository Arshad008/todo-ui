import React from 'react';
import {
    Row
} from 'antd';
import FinishedTodoListItem from './FinishedTodoListItem';

const FinishedTodoList = (props) => {
    let finishedTodos = props.finishedTodos.map((ftd, i)=>{
        return <FinishedTodoListItem
                    key={i}
                    finishedTodo = {ftd}
                    index={i}
                    onDeleteFinishedTodo={props.onDeleteFinishedTodo}/>
    });
    return(
        <Row gutter={16}>
            {finishedTodos}
        </Row>
    );
}

export default FinishedTodoList;