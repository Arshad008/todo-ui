import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {
    Col,
    Card,
    Tag,
    Button,
    Tooltip,
    Popconfirm,
    message
} from 'antd';
import UpdateTodoDrawer from './UpdateTodoDrawer';

const { Meta } = Card;

class TodoListItem extends Component{   
    state = {
        visible: false
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
    };
    onClose = () => {
        this.setState({
        visible: false,
        });
    };
    render(){
        let todoData = this.props.todo;
        let index = this.props.index;
        return(
            <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                <Card className="card">
                    <Meta
                        title= {todoData.title}
                        description={
                            <div>
                                <div style={{textAlign: "justify"}}>{todoData.description}</div>
                                <div style={{margin: "5px"}}>{todoData.tag == " " ? " " :  <Tag color="gray" style={{marginTop: "10px"}}>{todoData.tag}</Tag>}</div>
                                <div align="right">                                                                                
                                    <Tooltip title="Done">
                                        <Button type="default" shape="circle" icon="check" style={{marginRight: "5px"}} onClick={()=>{
                                            let url = APIBaseUrl + "/updateStatus/" + todoData._id;
                                            Axios.put(url, {status: "finished"})
                                            .then(res=>{
                                                let data = res.data.result;
                                                this.props.onUpdateStatus(index,data);                                                                                                
                                            }).catch(err=>console.error(err));                                            
                                        }}></Button>
                                    </Tooltip>
                                    <Popconfirm title="Are you sure you want to Delete this Todo?" onConfirm={()=>{
                                        let url = APIBaseUrl + "/delete/" + todoData._id;
                                        Axios.delete(url)
                                        .then(res=>{
                                            let data = res.data.result;
                                            this.props.onDeleteTodo(index);
                                        })
                                        message.success("Todo Deleted");
                                    }}>
                                        <Tooltip title="Delete">
                                            <Button type="danger" shape="circle" icon="delete" style={{marginRight: "5px"}}></Button>
                                        </Tooltip>
                                    </Popconfirm>                                        
                                    <Tooltip title="Edit">
                                        <Button type="defalut" shape="circle" icon="edit" style={{marginRight: "5px"}} onClick={this.showDrawer}></Button>
                                    </Tooltip>
                                    <UpdateTodoDrawer
                                        closable={false}
                                        onClose={this.onClose}
                                        visible={this.state.visible}
                                        todoData={todoData}
                                        index={index}
                                        onTodoUpdated={this.props.onTodoUpdated}/>
                                </div>
                            </div>
                        }     
                        className="line"
                    >                                 
                    </Meta>                    
                </Card>                    
            </Col>
        );
    }
}
 
export default TodoListItem;