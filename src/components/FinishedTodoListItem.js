import React from 'react';
import Axios from 'axios';
import { APIBaseUrl } from '../appConfig';
import {    
    Col,
    Card,
    Tag,
    Button,
    Tooltip,
    Icon
} from 'antd';

const { Meta } = Card;

const FinishedTodoListItem = (props) => {
    let finsihedTodoData = props.finishedTodo;
    let index = props.index;
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
                                            let url = APIBaseUrl + "/delete/" + finsihedTodoData._id;
                                            Axios.delete(url)
                                            .then(res=>{                                                
                                                props.onDeleteFinishedTodo(index);
                                            }).catch(err=>console.error(err));
                                        }}></Button>                                        
                                    </Tooltip>
                                    <Tooltip title="Undo">
                                        <Button type="default" shape="circle" icon="undo" style={{float: "right", marginRight: "5px"}} onClick={()=>{
                                            let url = APIBaseUrl + "/updateStatus/" + finsihedTodoData._id;
                                            Axios.put(url, {status: "todo"})
                                            .then(res=>{
                                                let data = res.data.result;
                                                props.onFinishedTodoUpdateStatus(index,data);
                                            }).catch(err=>console.error(err));
                                        }}>                                            
                                        </Button>
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