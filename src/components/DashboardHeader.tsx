import React from 'react';
import { Layout, Image } from 'antd';
import { Link } from "react-router-dom";
import cryptonite from '../assets/cryptonite.svg';

const { Header } = Layout;

interface State {
    window_width: number,
}

class DashboardHeader extends React.Component {
    state: State = {
        window_width: window.innerWidth,
    };

    handleResize(e) {
        var that = this;
        that.setState({ window_width: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    render() {
        return (
            <Header className="site-layout-background" style={{ paddingTop: this.state.window_width < 1000 ? 13 : '1.5rem', paddingBottom: 0, textAlign: 'center', backgroundColor: '#1a1a1a', height: 'fit-content' }} >
                <Link to="/dashboard">
                    <Image src={cryptonite} width={this.state.window_width < 600 ? '100%' : this.state.window_width < 1100 ? '70%' : this.state.window_width < 1500 ? '60%' : '40%'} preview={false} style={{ margin: 'auto' }} />
                </Link>
            </Header>
        );
    }
};

export default DashboardHeader;