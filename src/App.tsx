import './App.less';
import React from 'react';
import Sidebar from "./components/Sidebar";
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import { Layout } from 'antd';
import Dashboard from './components/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


const { Content } = Layout;

class App extends React.Component {


  render() {
    return (

      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <DashboardHeader />
          <Layout className="site-layout">
            <Sidebar></Sidebar>
            <Content style={{ margin: '0 16px' }}>
              <Switch>
                <Route path='/'>
                  <Redirect to="/dashboard" />
                  <Dashboard />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
              </Switch>
            </Content>
            
          </Layout>
          <DashboardFooter />
        </Router>
      </Layout>
    );
  }
}

export default App;
