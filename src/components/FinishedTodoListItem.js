import React from 'react';
import {    
    Col,
    Card,
    Tag,
    Button,
    Tooltip,
    Icon,
    message
} from 'antd';

const { Meta } = Card;

const FinishedTodoListItem = (props) => {
    let finsihedTodoData = props.finishedTodo;
    return(
        <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <Card className="card" >
                    <Meta
                        title={
                            <div>
                                <div>
                                    <div className="badge-finished"><Icon type="check"/></div>
                                </div>                                      
                                <div>
                                    <span><strike>{finsihedTodoData.title}</strike></span>
                                </div>
                            </div>
                        }
                        description={
                            <div>
                                <div style={{textAlign: "justify"}}><strike>{finsihedTodoData.description}</strike></div>
                                <div>
                                    <Tag color="gray" style={{marginTop: "10px"}}>{finsihedTodoData.tag}</Tag>                                                                                
                                    <Tooltip title="Delete">
                                        <Button type="danger" shape="circle" icon="delete" style={{float: "right", marginRight: "5px"}} onClick={()=>{
                                            message.success("Todo Deleted");
                                        }}></Button>
                                    </Tooltip>
                                </div>
                            </div>
                        }     
                        className="line" 
                        style={{borderLeft: "2px solid green"}}                          
                    >                                                       
                    </Meta>
                </Card>
            </Col>
    );
}

export default FinishedTodoListItem;