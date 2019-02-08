import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {
    Divider
} from 'antd';
import TodoList from '../components/TodoList';
import FinishedTodoList from '../components/FinishedTodoList';

class Home extends Component{
    state = {
        todos:[],
        finishedTodos:[]
    }
    componentWillMount(){
        let todosUrl = APIBaseUrl + "/todos";
        Axios.get(todosUrl)
        .then(res=>{
            let data = res.data.result;
            this.setState({todos: data});            
        }).catch(err=>console.error(err));

        let finishedTodosUrl= APIBaseUrl + "/finishedTodos";
        Axios.get(finishedTodosUrl)
        .then(res=>{
            let data = res.data.result;
            this.setState({finishedTodos: data});                    
        }).catch(err=>console.error(err));
    }
    onDelete(index){
        let newTodos = this.state.todos;
        newTodos.splice(index,1);
        this.setState({todos: newTodos});
    }   
    render(){
        return(
            <div className="content">
                <Divider orientation="left">
                    TODOS
                </Divider>
                <TodoList
                    todos={this.state.todos}
                    onUpdate={(index, data)=>{
                        let newTodos = this.state.todos;
                        let newFinishedTodos = this.state.finishedTodos;
                        // cut from todos
                        newTodos.splice(index,1);
                        this.setState({todos: newTodos});
                        // append to finished todos
                        newFinishedTodos.push(data);
                        this.setState({finishedTodos: newFinishedTodos});
                    }}
                    onDelete={this.onDelete.bind(this)}/>
                <Divider orientation="left">
                    Finished
                </Divider>
                <FinishedTodoList
                    finishedTodos={this.state.finishedTodos}/>
            </div>
        );                    
    }
}

export default Home;