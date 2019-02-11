import React, { Component } from 'react';
import Axios from 'axios';
import { APIBaseUrl } from './appConfig';
import { 
  Layout, 
  Menu,
  Icon,
  Button,
  Tooltip,
  Divider
} from 'antd';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import FinishedTodoList from './components/FinishedTodoList';
import NewTodoDrawer from './components/NewTodoDrawer';

const { 
  Header, 
  Content, 
  Footer, 
  Sider 
} = Layout;

const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false,
    todos:[],
    finishedTodos:[]
  }
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  }
  componentWillMount(){
    let todosUrl = APIBaseUrl + "/todos";
    Axios.get(todosUrl)
    .then(res=>{
        let data = res.data.result;
        this.setState({todos: data});            
    }).catch(err=>console.error(err));

    let finishedTodosUrl= APIBaseUrl + "/finishedTodos";
    Axios.get(finishedTodosUrl)
    .then(res=>{
        let data = res.data.result;
        this.setState({finishedTodos: data});                    
    }).catch(err=>console.error(err));
  }
  onTodoUpdateStatus(index,data){
    let newTodos = this.state.todos;
    let newFinishedTodos = this.state.finishedTodos;
    // cut from todos
    newTodos.splice(index,1);
    this.setState({todos: newTodos});
    // append to finished todos
    newFinishedTodos.push(data);
    this.setState({finishedTodos: newFinishedTodos});
  }
  onFinishedTodoUpdateStatus(index,data){
    let newFinishedTodos = this.state.finishedTodos;
    let newTodos = this.state.todos;
    // cut from finished todos
    newFinishedTodos.splice(index,1);
    this.setState({finishedTodos: newFinishedTodos});
    // append to todos
    newTodos.push(data);
    this.setState({todos: newTodos});
  }
  onDeleteTodo(index){
    let newTodos = this.state.todos;
    newTodos.splice(index,1);
    this.setState({todos: newTodos});
  }
  onDeleteFinishedTodo(index){
    let newFinishedTodos = this.state.finishedTodos;
    newFinishedTodos.splice(index, 1);
    this.setState({finishedTodos: newFinishedTodos});
  }
  onTodoAdded(newTodo){
    let newTodos = this.state.todos;
    newTodos.push(newTodo);
    this.setState({todos: newTodos});
  }
  onTodoUpdated(index,data){
    let newTodos = this.state.todos;    
    newTodos[index] = data;
    this.setState({todos: newTodos});
  }
  render() {
    return (
      <BrowserRouter>
        {/* Main Layout */}
        <Layout>
          {/* Sider */}
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{ background: '#fff', alignContent: "center" }}
            theme="light"
          >
            {/* Menu */}
            <Menu            
              defaultSelectedKeys={['1']}
              mode="inline"
            >
              {/* Menu Items */}
              <Menu.Item key="1" style={{marginTop: "50px"}}>
                <Icon type="home"/>
                <span>Home</span>
                <Link to="/"/>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="database"/>
                <span>My Todos</span>
                <Link to="/myTodos"/>
              </Menu.Item>
              {/* Sub Menu */}
              <SubMenu key="subOne" title={<span><Icon type="tags"/><span>Tags</span></span>}>
                <Menu.Item key={3}>
                  <Icon type="minus"/>
                  <span>quick todo</span>
                </Menu.Item>
                <Menu.Item key={4}>
                  <Icon type="minus"/>
                  <span>learning</span>
                </Menu.Item>
                <Menu.Item key={5}>
                  <Icon type="minus"/>
                  <span>shopping</span>
                </Menu.Item>
              </SubMenu>
              {/* Sub Menu End*/}
              <Menu.Item key="6">
                <Icon type="check"/>
                <span>Finished</span>
                <Link to="/finishedTodos"></Link>
              </Menu.Item>            
            </Menu> 
            {/* Menu End */}
            {/* Add New Button */}          
            <NewTodoDrawer
              onTodoAdded={this.onTodoAdded.bind(this)}/>
            {/* Add new button end */}
          </Sider>
          {/* Sider End */}
          {/* Sub Layout */}
          <Layout>
            {/* Content */}
            <Content>
              <div className="content">
                <Divider orientation="left">
                  <Icon type="copy"/> TODOS
                </Divider>
                <TodoList 
                  todos={this.state.todos}
                  onTodoUpdateStatus={this.onTodoUpdateStatus.bind(this)}
                  onDeleteTodo={this.onDeleteTodo.bind(this)}
                  onTodoUpdated={this.onTodoUpdated.bind(this)}/>
                <Divider orientation="left">
                  <Icon type="check"/> Finished
                </Divider>
                <FinishedTodoList 
                  finishedTodos={this.state.finishedTodos}
                  onDeleteFinishedTodo={this.onDeleteFinishedTodo.bind(this)}
                  onFinishedTodoUpdateStatus={this.onFinishedTodoUpdateStatus.bind(this)}/>
              </div>
            </Content>
            {/* Content End*/}          
          </Layout>
          {/* Sub layout end */}
        </Layout>
        {/* Main Layout End */}
      </BrowserRouter>
    );
  }
}

export default App;