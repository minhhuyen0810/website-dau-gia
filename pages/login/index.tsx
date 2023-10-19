import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../../model/user';
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
  } = useForm<LoginForm>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  //FUNCTION
  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };
  const handleBackToLogin = () => {
    setIsForgotPassword(false);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const _onSubmit = handleSubmit((data: LoginForm) => {
    try {
      dispatch(loginAction(data) as any);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  });
  const onFinish = async (email: any) => {
    try {
      await userService.forgotPassword(email);
      toast.success('Vui lòng check email');
    } catch (err) {
      toast.error('Bị lỗi: ' + err + ' Vui lòng liên hệ quản trị viên');
    }
  };
  // RENDER
  return (
    <div className="login ">
      {isForgotPassword ? (
        <div className="form-container forgot-password-container">
          {isSubmitted ? (
            <p>Một email đã được gửi để thiết lập lại mật khẩu.</p>
          ) : (
            <form onSubmit={onFinish}>
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={handleEmailChange}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="form-container sign-in-container">
          <form onSubmit={_onSubmit}>
            <h1>Đăng nhập</h1>
            <p>
              Nếu chưa có tài khoản, đăng ký <a href="/register">tại đây</a>
            </p>
            <input
              placeholder="Username"
              className={errors.username?.message ? 'error' : ''}
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username không được để trống',
                },
              })}
            />
            <span className="message-error">{errors.username?.message}</span>
            <input
              type="password"
              className={errors.password?.message ? 'error' : ''}
              placeholder="Password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Mật khẩu không được để trống',
                },
              })}
            />
            <span className="message-error">{errors.password?.message}</span>
            <div className="rememberMe ">
              <label>
                <input type="checkbox" {...register('rememberMe')} />
                <span>Ghi nhớ</span>
              </label>
            </div>
            <div className="forget-password" onClick={handleForgotPassword}>
              Quên mật khẩu
            </div>
            <button>Đăng nhập</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default withAppProvider(LoginPage);
