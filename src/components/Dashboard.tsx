import React from 'react';
import axios from 'axios';
import { Card, Row, Col, Statistic, Button, List, Avatar } from 'antd';
import { Pie } from "@ant-design/charts";
import Layout from 'antd/lib/layout/layout';
import cryptocurrencies from '../assets/cryptocurrencies.json'
import band from '../assets/cryptos/band.svg';
import bnb from '../assets/cryptos/bnb.svg';
import btc from '../assets/cryptos/btc.svg';
import busd from '../assets/cryptos/busd.svg';
import cgld from '../assets/cryptos/cgld.svg';
import celo from '../assets/cryptos/celo.svg';
import comp from '../assets/cryptos/comp.svg';
import doge from '../assets/cryptos/doge.svg';
import eth from '../assets/cryptos/eth.svg';
import forth from '../assets/cryptos/forth.svg';
import grt from '../assets/cryptos/grt.svg';
import mkr from '../assets/cryptos/mkr.svg';
import nu from '../assets/cryptos/nu.svg';
import usdt from '../assets/cryptos/usdt.svg';
import xlm from '../assets/cryptos/xlm.svg';
import './Dashboard.less';

interface Asset {
    type: string,
    title: string,
    value: number,
};

interface State {
    loading: boolean,
    reloading: boolean,
    currency: string,
    balance: number,
    assets: {
        [key: string]: number;
    },
    binance_bal: number,
    binance_assets: {},
    coinbase_bal: number,
    coinbase_assets: {
        [key: string]: number;
    },
    ohlcv: {
        [key: string]: object;
    },
    asset_dict: Asset[],
    window_width: number,
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData.bind(this)
    }
    state: State = {
        reloading: false,
        window_width: window.innerWidth,
        loading: true,
        currency: "",
        balance: 0.0,
        assets: {},
        binance_bal: 0.0,
        binance_assets: {},
        coinbase_bal: 0.0,
        coinbase_assets: {},
        ohlcv: {},
        asset_dict: [],
    }

    icons = {
        "band": band,
        "bnb": bnb,
        "btc": btc,
        "busd": busd,
        "cgld": cgld,
        "celo": celo,
        "comp": comp,
        "doge": doge,
        "eth": eth,
        "forth": forth,
        "grt": grt,
        "mkr": mkr,
        "nu": nu,
        "usdt": usdt,
        "xlm": xlm,
    }

    handleResize(e) {
        var that = this;
        that.setState({ window_width: window.innerWidth });
    };

    componentDidMount() {
        this.fetchData()
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    fetchData() {
        this.setState({
            reloading: true,
        })
        axios.get('https://nicofeals.pythonanywhere.com/assets')
            .then(res => {
                const data = res.data
                const global = data['global']
                const binance = data['binance']
                const coinbase = data['coinbase']
                this.setState({
                    currency: global['balance']['currency'],
                    balance: Math.trunc(global['balance']['amount'] * 100) / 100,
                    assets: global['assets'],
                    binance_bal: Math.trunc(binance['balance']['amount'] * 100) / 100,
                    binance_assets: binance['assets'],
                    coinbase_bal: Math.trunc(coinbase['balance']['amount'] * 100) / 100,
                    coinbase_assets: coinbase['assets'],
                    loading: false,
                })
                const { assets } = this.state;
                let asset_pie: Asset[] = [];
                for (const [key, value] of Object.entries(assets)) {
                    asset_pie.push({
                        "type": key,
                        "title": cryptocurrencies[key],
                        "value": Math.trunc(value['value'] * 100) / 100,
                    });

                }
                const sorted_assets = asset_pie.sort(function (a, b) {
                    const a_val = a['value'];
                    const b_val = b['value'];
                    return ((a_val > b_val) ? -1 : (a_val < b_val) ? 1 : 0)
                })
                this.setState({
                    asset_dict: sorted_assets,
                    reloading: false,
                });
            })
    }


    render() {
        const { currency, balance, assets, loading, asset_dict } = this.state;
        // this.fetchFinancialData(sorted_assets);
        var pieConfig = {
            autoFit: true,
            appendPadding: 10,
            data: asset_dict,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            legend: this.state.window_width > 500 ? true: false,
            label: {
                type: 'outer',
                content: '{name} {percentage}',
            },
            interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
        };

        const stat_title = "Account Balance (" + currency + ")"
        return (
            <Layout>
                <Row justify='center'>
                    <Col span={24} style={{ textAlign: 'center', marginTop: 10, justifyContent: 'center'}}>
                        <Card bordered={false} loading={loading} hoverable={false} className='balance'>
                            <Statistic title={stat_title} value={balance} precision={2} />
                            <Button style={{ marginTop: 16 }} type="primary" shape='round' onClick={this.fetchData.bind(this)} loading={this.state.reloading}>
                                Reload
                            </Button>
                        </Card>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col span={18} style={{ textAlign: 'center', marginTop: 10 }}>
                        <Pie {...pieConfig} />
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col span={18}>
                        <List
                            itemLayout="horizontal"
                            dataSource={asset_dict}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={this.icons[item.type.toLowerCase()]} shape='square' size='large' />}
                                        title={<a href="https://ant.design"><strong>{item.type}</strong> {item.title}</a>}
                                        description={<p>{Math.trunc(assets[item.type]['amount'] * 10000) / 10000} | <strong>{Math.trunc(assets[item.type]['value'] * 100) / 100}</strong> {currency}</p>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Dashboard;