import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {
    Divider
} from 'antd';
import TodoList from '../components/TodoList';

class Home extends Component{
    state = {
        todos:[]
    }
    componentWillMount(){
        let url = APIBaseUrl + "/todos";
        Axios.get(url)
        .then(res=>{
            let data = res.data.result;
            this.setState({todos: data});            
        }).catch(err=>console.error(err));
    }
    render(){
        return(
            <div className="content">
                <Divider orientation="left">
                    TODOS
                </Divider>
                <TodoList
                    todos={this.state.todos}/>
            </div>
        );                    
    }
}

export default Home;