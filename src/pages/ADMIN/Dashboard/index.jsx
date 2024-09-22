import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
const { Title, Text } = Typography ;

const Dashboard = () => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Approval List"
            value={11}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Stock Alert"
            value={9}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>

      <Col span={24} style={{ marginTop: 16 }}>
        <Card>
          <Title level={4}>Outstanding Process</Title>

          <Text>Test Order {'->'} Planing Taking Sample {'->'} Taking Sample {'->'} Sample Registration {'->'} Sample Handling {'->'} Test Process {'->'} Test Result </Text>
        </Card>
      </Col>
    </Row>
  )
}

export default Dashboard