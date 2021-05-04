import React from 'react'
import { Layout, Space, Button, Typography } from 'antd'
import { QuestionCircleFilled, GithubFilled, LinkedinFilled } from '@ant-design/icons'

const { Text, Link } = Typography;
const { Footer } = Layout;

class DashboardFooter extends React.Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                <Space direction='vertical'>
                    <Text style={{ marginBottom: '1rem', marginTop: 0 }}>Developped by <Link href="https://nicolasceccarello.tech">Nicolas Ceccarello</Link></Text>
                    <Space direction='horizontal' size='middle'>
                        <Button type='link' href="https://github.com/nicofeals/deeplyrics"><GithubFilled style={{ fontSize: '1rem' }} /></Button>
                        <Button type='link' href="https://www.linkedin.com/in/nicolasceccarello"><LinkedinFilled style={{ fontSize: '1rem' }} /></Button>
                        <Button type="link" onClick={() => this.setState({ aboutVisible: true })}>
                            <QuestionCircleFilled style={{ fontSize: '1rem' }} />
                        </Button>
                    </Space>
                </Space>
            </Footer>
        );
    }
};

export default DashboardFooter;