import React, { Component } from 'react';
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
                console.log(values);    
                this.props.form.resetFields();                 
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
                            {getFieldDecorator('todoTitle',{
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
                            {getFieldDecorator('todoDescription',{                                    
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