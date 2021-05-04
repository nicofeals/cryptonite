import React from 'react';
import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
    DollarCircleFilled,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface State {
    collapsed: boolean;
};

class Sidebar extends React.Component {
    state: State = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to='/dashboard'>
                            Overview
                            </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<DollarCircleFilled />} title="Portfolios">

                        <Menu.Item key="3">
                            <Link to='/portfolios/binance'>
                                Binance
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Link to='/portfolios/coinbase'>
                                Coinbase
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="5">
                            <Link to='/portfolios/coinlist'>
                                Coinlist
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="6">
                            <Link to='/portfolios/uphold'>
                                Uphold
                                </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>

            </Sider>
        );
    }
};

export default Sidebar;