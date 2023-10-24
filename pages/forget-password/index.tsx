import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { useForm } from 'react-hook-form';
import { ForgetPasswordForm, LoginForm } from '../../model/user';
import Link from 'next/link';
import { getUserInfoAction, loginAction } from '../../store/slices/auth.slice';
import userService from '../../services/user.service';
import { toast } from 'react-toastify';
import form from 'antd/es/form';
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordForm>();
  const router = useRouter();

  //FUNCTION

  const _onSubmit = async (email: any) => {
    try {
      await userService.forgotPassword(email);
      toast.success('Vui lòng check email');
      router.push('/login');
    } catch (err) {
      toast.error('Bị lỗi: ' + err + ' Vui lòng liên hệ quản trị viên');
    }
  };
  // RENDER
  return (
    <div className="login">
      <div className="form-container sign-in-container">
        <form onSubmit={_onSubmit}>
          <h1>Đăng nhập</h1>
          <p>
            Nếu chưa có tài khoản, đăng ký <a href="/register">tại đây</a>
          </p>
          <input
            placeholder="Email"
            className={errors.email?.message ? 'error' : ''}
            {...register('email', {
              required: {
                value: true,
                message: 'Email không được để trống',
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Email không hợp lệ',
              },
            })}
          />
          <span className="message-error">{errors.email?.message}</span>
          <button>Lấy lại mật khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default withAppProvider(LoginPage);
