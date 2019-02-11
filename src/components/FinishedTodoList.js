import React from 'react';
import {
    Row,
    Empty
} from 'antd';
import FinishedTodoListItem from './FinishedTodoListItem';

const FinishedTodoList = (props) => {
    let finishedTodos = props.finishedTodos.map((ftd, i)=>{
        return <FinishedTodoListItem
                    key={i}
                    finishedTodo = {ftd}
                    index={i}
                    onDeleteFinishedTodo={props.onDeleteFinishedTodo}
                    onFinishedTodoUpdateStatus={props.onFinishedTodoUpdateStatus}/>
    });
    if(finishedTodos[0] == null){
        return(
            <Row>
                <Empty description={<span>No finished todos are available</span>}/>
            </Row>
        );
    }else{
        return(
            <Row gutter={16}>
                {finishedTodos}
            </Row>
        );
    }    
}

export default FinishedTodoList;