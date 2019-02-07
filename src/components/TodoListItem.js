import React from 'react';
import {
    Col,
    Card,
    Tag,
    Button,
    Tooltip,
    Popconfirm,
    message
} from 'antd';

const { Meta } = Card;

const TodoListItem = (props) => {
    let todoData = props.todo;
    return(
        <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <Card className="card">
                    <Meta
                        title= {todoData.title}
                        description={
                            <div>
                                <div style={{textAlign: "justify"}}>{todoData.description}</div>
                                <div style={{margin: "5px"}}><Tag color="gray" style={{marginTop: "10px"}}>{todoData.tag}</Tag></div>
                                <div align="right">                                                                                
                                    <Tooltip title="Done">
                                        <Button type="default" shape="circle" icon="check" style={{marginRight: "5px"}}></Button>
                                    </Tooltip>
                                    <Popconfirm title="Are you sure you want to Delete this Todo?" onConfirm={()=>{
                                        message.success("Todo Deleted");
                                    }}>
                                        <Tooltip title="Delete">
                                            <Button type="danger" shape="circle" icon="delete" style={{marginRight: "5px"}}></Button>
                                        </Tooltip>
                                    </Popconfirm>                                        
                                    <Tooltip title="Edit">
                                        <Button type="defalut" shape="circle" icon="edit" style={{marginRight: "5px"}}></Button>
                                    </Tooltip>                                         
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
 
export default TodoListItem;