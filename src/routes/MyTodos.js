import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {
    Divider
} from 'antd';

class MyTodos extends Component{
    state = {
        todos:[]
    }
    componentWillMount(){
        let todosUrl = APIBaseUrl + "/todos";
        Axios.get(todosUrl)
        .then(res=>{
            let data = res.data.result;
            this.setState({todos: data});  
            console.log(this.state.todos);
        }).catch(err=>console.error(err));
    }
    render(){
        return(
            <div className="content">
                <Divider orientation="left">
                    TODOS
                </Divider>                
            </div>
        );
    }
}

export default MyTodos;