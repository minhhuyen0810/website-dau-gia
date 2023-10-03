import withAppProvider from '../../layout/wrapper/withAppProvider';
import { Form, Input, Button, Row, Col } from 'antd';

const RegisterPage = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '50px 20px' }}>
        <h1>Đăng ký tài khoản</h1>
      </Row>
      <Row justify="center" align="middle" style={{ padding: '0 20px' }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Form
            name="registration"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default withAppProvider(RegisterPage);
