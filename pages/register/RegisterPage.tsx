import { toast } from 'react-toastify';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import api from '../../api/api';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const body = { ...values, activationKey: '', resetDate: '' };
      console.log('Received values:', body);
      await api.postServiceRegister(body, false, false);
      debugger;
      toast.success('Đăng ký thành công');
      form.resetFields();
    } catch (err) {
      toast.error('Bị lỗi: ' + err + ' Vui lòng liên hệ quản trị viên');
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '50px 20px' }}>
        <h1>Đăng ký tài khoản</h1>
      </Row>
      <Row justify="center" align="middle" style={{ padding: '0 20px' }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Form
            form={form}
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
                  type: 'email',
                  message: 'Đây không phải là email',
                },
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
              name="firstName"
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
              name="lastName"
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
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,}).*$/,
                  message:
                    'Password phải chứa ít nhất 8 ký tự, có chứa chữ hoa, chữ số, ký tự đặc biệt',
                },
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
                  pattern: /^(\+84|0)(\d{9,10})$/,
                  message: 'Sai định dạng số điện thoại',
                },
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
              <Button
                className="flex justify-center"
                type="primary"
                htmlType="submit"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
