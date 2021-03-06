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
    message
} from 'antd';

class UpdateTodoDrawer extends Component{  
    state = {
        tag: this.props.todoData.tag
    }  
    handleSubmit = (e,id, index) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            if(!err){                               
                let editedTodo = {                       
                    title: values.title,
                    description: values.description,
                    tag: values.tag === "" || values.tag === " " ? "quick todo" : values.tag.trim(),
                    status: "todo",
                    addedOn: new Date().getTime()
                }                                                  
                let url = APIBaseUrl + "/updateTodo/" + id;                
                Axios.put(url, editedTodo)
                .then(res=>{      
                    this.props.form.resetFields();                    
                    this.props.onTodoUpdated(index,editedTodo);
                    this.setState({tag: editedTodo.tag});
                    message.success("Todo Updated");
                    this.props.onClose();                    
                }).catch(err=>console.error(err));
            }
        });        
    } 
    render(){
        const { getFieldDecorator } = this.props.form; 
        let todoData = this.props.todoData;      
        let index = this.props.index;  
        let tags = this.props.tags.map((t,i)=>{
            return(
                <Tag key={i} color="lightblue" style={{marginTop: "5px"}} onClick={()=>{
                    this.setState({tag: t});
                }}>{t}</Tag>
            );
        });
        return(
            <Drawer
                    title="Update Todo"
                    Placement="right"
                    closable={this.props.closable}
                    onClose={this.props.onClose}
                    visible={this.props.visible}                                                            
                >
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            {/* Todo Title */}
                            <Form.Item                                                            
                                label="Todo Title"
                            >
                                {getFieldDecorator('title',{
                                    initialValue: todoData.title,
                                    rules: [{
                                        required: true, message: 'Todo Title is required'
                                    }]
                                })(
                                    <Input placeholder="Todo Title"/>
                                )}                            
                            </Form.Item>
                            {/* Todo Description */}
                            <Form.Item                                                            
                                label="description"
                            >
                                {getFieldDecorator('description',{   
                                    initialValue: todoData.description,                                 
                                })(
                                    <Input placeholder="Todo Title"/>
                                )}                           
                            </Form.Item>
                            {/* Todo Tag */}
                            <Form.Item                                                            
                                label="Tag"
                            >
                                {getFieldDecorator('tag',{ 
                                    initialValue: this.state.tag,                                     
                                })(
                                    <Input placeholder="EX:- Shopping, Learning"/>
                                )}                           
                            </Form.Item>
                            {/* Tags */}
                            <Row style={{marginBottom: "20px"}}>
                                {tags}
                            </Row>
                            {/* Add Button */}
                            <Form.Item>
                                <Button type="primary" icon="edit" onClick={(e)=>{                                                                       
                                    this.handleSubmit(e, todoData._id, index);
                                }}>Edit Todo</Button>
                                &nbsp;
                                <Button type="default" onClick={this.props.onClose}>Cancel</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Drawer>
        );
    }
}

export default Form.create()(UpdateTodoDrawer);