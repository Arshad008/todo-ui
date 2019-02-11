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
    finishedTodos:[],
    tags:[]
  }
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  }
  loadTags(tag){
    // get all tags
    let tagsUrl = APIBaseUrl + "/tags/" + tag;
    Axios.get(tagsUrl)
    .then(res=>{
      let data = res.data.result;
      this.setState({tags: data});
    })
  }
  loadTodos(tag){
    // get todos
    let todosUrl = APIBaseUrl + "/todos/" + tag;
    Axios.get(todosUrl)
    .then(res=>{
        let data = res.data.result;
        this.setState({todos: data});            
    }).catch(err=>console.error(err));
  }
  loadFinishedTodos(tag){
    // get finished todos
    let finishedTodosUrl= APIBaseUrl + "/finishedTodos/" + tag;
    Axios.get(finishedTodosUrl)
    .then(res=>{
        let data = res.data.result;
        this.setState({finishedTodos: data});                    
    }).catch(err=>console.error(err)); 
  }
  componentWillMount(){
    // get todos
    let todoTag = "all";
    this.loadTodos(todoTag);
    // get finished todos
    let finishedTodoTag = "all";  
    this.loadFinishedTodos(tag);
    // get all tags
    let tag = "all";
    this.loadTags(tag);
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
    this.loadTags("all");
  }
  onDeleteFinishedTodo(index){
    let newFinishedTodos = this.state.finishedTodos;
    newFinishedTodos.splice(index, 1);
    this.setState({finishedTodos: newFinishedTodos});
    this.loadTags("all");
  }
  onTodoAdded(newTodo){
    let newTodos = this.state.todos;
    newTodos.push(newTodo);
    this.setState({todos: newTodos});
    this.loadTags("all");
  }
  onTodoUpdated(index,data){
    let newTodos = this.state.todos;    
    newTodos[index] = data;
    this.setState({todos: newTodos});
  }
  render() {    
    let tags = this.state.tags.map((t,i)=>{      
      return(        
        <Menu.Item key={"tag" + i} onClick={()=>{
          this.loadTodos(t);
          this.loadFinishedTodos(t);
        }}>
          <Icon type="minus"/>
          <span>{t}</span>
          <Link to="/"/>
        </Menu.Item>
      );
    });
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
              <Menu.Item key="1" style={{marginTop: "50px"}} onClick={()=>{
                this.loadTodos("all");
                this.loadFinishedTodos("all");
              }}>
                <Icon type="home"/>
                <span>Home</span>
                <Link to="/"/>
              </Menu.Item>
              <Menu.Item key="2" onClick={()=>{
                this.loadTodos("all");
                this.loadFinishedTodos("all");
              }}>
                <Icon type="database"/>
                <span>My Todos</span>
                <Link to="/myTodos"/>
              </Menu.Item>
              {/* Sub Menu */}
              <SubMenu key="subOne" title={<span><Icon type="tags"/><span>Tags</span></span>}>
                {tags}
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
              <Switch>
                {/* Home */}
                <Route path="/" exact>
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
                </Route>
                {/* My Todos */}
                <Route path="/myTodos">
                  <div className="content">
                    <Divider orientation="left">
                        <Icon type="copy"/> TODOS
                    </Divider>
                    <TodoList
                        todos={this.state.todos}
                        onTodoUpdateStatus={this.onTodoUpdateStatus.bind(this)}
                        onDeleteTodo={this.onDeleteTodo.bind(this)}
                        onTodoUpdated={this.onTodoUpdated.bind(this)}/>
                  </div>
                </Route>
                {/* Finished todos */}
                <Route path="/finishedTodos">
                  <div className="content">
                    <Divider orientation="left">
                      <Icon type="check"/> Finished
                    </Divider>
                    <FinishedTodoList 
                      finishedTodos={this.state.finishedTodos}
                      onDeleteFinishedTodo={this.onDeleteFinishedTodo.bind(this)}
                      onFinishedTodoUpdateStatus={this.onFinishedTodoUpdateStatus.bind(this)}/>
                  </div>
                </Route>
              </Switch>
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