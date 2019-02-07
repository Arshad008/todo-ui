import React, { Component } from 'react';
import { 
  Layout, 
  Menu,
  Icon,
  Button,
  Tooltip
} from 'antd';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import MyTodos from './routes/MyTodos';
import './App.css';

const { 
  Header, 
  Content, 
  Footer, 
  Sider 
} = Layout;

const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false
  }
  onCollapse = (collapsed) => {
    this.setState({collapsed});
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
              <SubMenu key="sub1" title={<span><Icon type="tags"/><span>Categories</span></span>}>
                <Menu.Item key="3">
                  <Icon type="minus"/>
                  <span>Shopping</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="minus"/>
                  <span>Learning</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="minus"/>
                  <span>Evening activities</span>
                </Menu.Item>
              </SubMenu>
              {/* Sub Menu End*/}
              <Menu.Item key="6">
                <Icon type="check"/>
                <span>Finished</span>
              </Menu.Item>            
            </Menu> 
            {/* Menu End */}
            {/* Add New Button */}          
            <div align="center" style={{marginTop: "20px", width: "100%"}}>
            <Tooltip title="Add New Todo" placement="right">
              <Button type="primary" icon="plus" shape="circle"></Button>
            </Tooltip>            
            </div>          
          </Sider>
          {/* Sider End */}
          {/* Sub Layout */}
          <Layout>
            {/* Content */}
            <Content>            
              <Switch>
                <Route path="/" component={ Home } exact/>
                <Route path="/myTodos" component={ MyTodos }/>
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