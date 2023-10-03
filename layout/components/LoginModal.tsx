import { Button, Form, Input, Modal } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { URL_REGISTER } from '../types/url.inteface';
import router from 'next/router';

const LoginModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Add your login logic here
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button
        className="menu-item btn-common primary contact"
        onClick={showModal}
        aria-label="Button category"
      >
        Đăng nhập
        {/* <Link
          href={{
            pathname: URL_REGISTER,
          }}
          as={URL_REGISTER}
          shallow={true}
        >
          <a
            className={`header-link ${
              router.pathname === URL_REGISTER ? 'active' : ''
            }`}
          >
            Đăng ký ngay
          </a>
        </Link> */}
      </Button>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        Đăng nhập hoặc{' '}
        <Link
          href={{
            pathname: URL_REGISTER,
          }}
          as={URL_REGISTER}
          shallow={true}
        >
          <a>Đăng ký ngay</a>
        </Link>
        <Form
          name="login-form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
