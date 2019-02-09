import React, { Component } from 'react';
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            if(!err){
                console.log(values);
            }
        });        
    } 
    render(){
        const { getFieldDecorator } = this.props.form; 
        let todoData = this.props.todoData;
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
                                {getFieldDecorator('todoDescription',{   
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
                                    initialValue: todoData.tag,                                     
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
                                <Button type="primary" icon="edit" htmlType="submit">Edit Todo</Button>
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