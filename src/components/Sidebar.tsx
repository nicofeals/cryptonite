import React from 'react';
import { Menu } from 'antd';
import {
    PieChartOutlined,
    DollarCircleFilled,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;


class Sidebar extends React.Component {


    render() {
        return (
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal" style={{ width: '90%', margin: 'auto', justifyContent: 'center' }}>
                    <Menu.Item key="1" icon={<PieChartOutlined />} style={{ width: '50%', textAlign: 'center', backgroundColor: '#282828' }}>
                        <Link to='/dashboard'>
                            Overview
                            </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<DollarCircleFilled />} title="Portfolios" style={{ width: '50%', textAlign: 'center' }}>

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
        );
    }
};

export default Sidebar;