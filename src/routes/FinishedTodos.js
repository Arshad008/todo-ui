import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {
    Divider
} from 'antd';
import FinishedTodoList from '../components/FinishedTodoList';

class FinishedTodos extends Component{
    state = {
        finishedTodos:[]
    }
    componentWillMount(){
        let finishedTodosUrl = APIBaseUrl + "/finishedTodos";
        Axios.get(finishedTodosUrl)
        .then(res=>{
            let data = res.data.result;
            this.setState({finishedTodos: data});  
            console.log(this.state.finishedTodos);
        }).catch(err=>console.error(err));
    }
    render(){
        return(
            <div className="content">
                    <Divider orientation="left">
                        FinishedTodos
                    </Divider>      
                    <FinishedTodoList
                        finishedTodos={this.state.finishedTodos}/>          
            </div>
        );
    }
}

export default FinishedTodos;