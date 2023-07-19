import withAppProvider from '../../layout/wrapper/withAppProvider';

const PolicyPage = () => {
  return (
    <div className="wrap-policy">
      <section className="banner-policy">
        <div className="container-content">
          <h1 className="info">Chính sách bảo mật</h1>
          <p className="info-desc">
            VMC thực hiện các chính sách bảo mật sau đây nhằm chỉ ra các vấn đề
            liên quan đến bảo mật thông tin của khách hàng đối với trang web
            này.
          </p>
        </div>
      </section>
      <section className="policy-detail">
        <div className="container-content">
          <div className="block-content">
            <div className="content full-width">
              <p>
                Theo quy định chung, không có thông tin cá nhân nào của khách
                hàng được tự động thu thập từ trang web. Tuy nhiên một số thông
                tin phi cá nhân của người truy cập liên quan đến lưu lượng truy
                cập sẽ được ghi lại bởi các máy chủ đạt tiêu chuẩn vận hành của
                VMC. Những thông tin này được sử dụng cho mục đích nâng cấp, cải
                thiện trải nghiệm người dùng trang web của chúng tôi.
              </p>
              <p>
                VMC có thể chia sẻ thông tin cá nhân của bạn với bên thứ ba chỉ
                để phục vụ cung cấp dịch vụ cho bạn hoặc những thông tin bổ sung
                về VMC mà bạn yêu cầu (ví dụ gửi e-mail, điền các thông tin cần
                thiết và tiến hành trả lời khảo sát). Bất kỳ trang web thứ ba
                nào được dẫn link trong website này đều có thể có chính sách và
                điều khoản bảo mật riêng. Bạn nên xem xét kỹ lưỡng chính sách
                bảo mật của những trang này nhằm lựa chọn thông tin cá nhân phù
                hợp đối với từng trang web khác nhau.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withAppProvider(PolicyPage);
