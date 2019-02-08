import React from 'react';
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

const { Meta } = Card;

const TodoListItem = (props) => {
    let todoData = props.todo;
    let index = props.index;
    return(
        <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                <Card className="card">
                    <Meta
                        title= {todoData.title}
                        description={
                            <div>
                                <div style={{textAlign: "justify"}}>{todoData.description}</div>
                                <div style={{margin: "5px"}}><Tag color="gray" style={{marginTop: "10px"}}>{todoData.tag}</Tag></div>
                                <div align="right">                                                                                
                                    <Tooltip title="Done">
                                        <Button type="default" shape="circle" icon="check" style={{marginRight: "5px"}} onClick={()=>{
                                            let url = APIBaseUrl + "/updateStatus/" + todoData._id;
                                            Axios.put(url, {status: "finished"})
                                            .then(res=>{
                                                let data = res.data.result;
                                                props.onUpdate(index,data);                                                                                                
                                            }).catch(err=>console.error(err));
                                            console.log(url);
                                        }}></Button>
                                    </Tooltip>
                                    <Popconfirm title="Are you sure you want to Delete this Todo?" onConfirm={()=>{
                                        let url = APIBaseUrl + "/delete/" + todoData._id;
                                        Axios.delete(url)
                                        .then(res=>{
                                            let data = res.data.result;
                                        })
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