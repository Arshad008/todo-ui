import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {    
    Drawer,
    Form,
    Input,
    Button,
    Tag,
    Row,
    message,
    Tooltip
} from 'antd';

class NewTodoDrawer extends Component{
    state = {
        visible: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            if(!err){                
                let newTodo = {
                    title: values.title,
                    description: values.description,
                    tag: values.tag.toLowerCase(),
                    status: "todo",
                    addedOn: new Date().getTime()
                }                
                let url = APIBaseUrl + "/saveTodo";
                Axios.post(url, newTodo)
                .then(res=>{
                    let data = res.data.result;                    
                    this.props.form.resetFields();
                    this.props.onTodoAdded(data);
                    message.success("Todo Added");
                }).catch(err=>console.error(err));
            }
        });        
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
        const { getFieldDecorator } = this.props.form; 
        return(
            <div>
                <div align="center" style={{marginTop: "20px", width: "100%"}}>
                    <Tooltip title="Add New Todo" placement="right">
                        <Button type="primary" icon="plus" shape="circle" onClick={this.showDrawer}></Button>
                    </Tooltip>
                </div>
                <Drawer
                    title="New Todo"
                    Placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}                                                            
                >                    
                    <Form onSubmit={this.handleSubmit}>
                        {/* Todo Title */}
                        <Form.Item                                                            
                            label="Todo Title"
                        >
                            {getFieldDecorator('title',{
                                rules: [{
                                    required: true, message: 'Todo Title is required'
                                }]
                            })(
                                <Input placeholder="Todo Title"/>
                            )}                            
                        </Form.Item>
                        {/* Todo Description */}
                        <Form.Item                                                            
                            label="Todo Description"
                        >
                            {getFieldDecorator('description',{                                    
                            })(
                                <Input placeholder="Todo Title"/>
                            )}                           
                        </Form.Item>
                        {/* Todo Tag */}
                        <Form.Item                                                            
                            label="Tag"
                        >
                            {getFieldDecorator('tag',{                                      
                            })(
                                <Input placeholder="EX:- Shopping, Learning"/>
                            )}                           
                        </Form.Item>
                        {/* Tags */}
                        <Row style={{marginBottom: "20px"}}>
                            <Tag color="lightBlue">Shopping</Tag>
                            <Tag color="lightBlue">Learning</Tag>
                        </Row>
                        {/* Add Button */}
                        <Form.Item>
                            <Button type="primary" icon="check" htmlType="submit">Add Todo</Button>
                            &nbsp;
                            <Button type="default" onClick={this.onClose}>Cancel</Button>
                        </Form.Item>
                    </Form>                    
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(NewTodoDrawer);