import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';

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
            console.log(this.state.todos);
        }).catch(err=>console.error(err));
    }
    render(){
        return(
            <div className="content">
                
            </div>
        );                    
    }
}

export default Home;