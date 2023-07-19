import withAppProvider from '../../layout/wrapper/withAppProvider';

const PolicyPage = () => {
  return (
    <div className="wrap-terms">
      <section className="banner-terms">
        <div className="container-content">
          <h1 className="info">Điều khoản sử dụng</h1>
          <p className="info-desc">
            Dưới đây là các điều khoản sử dụng của trang web. Quý khách vui lòng
            đọc kĩ.
          </p>
        </div>
      </section>
      <section className="terms-detail">
        <div className="container-content">
          <div className="block-content">
            <div className="content">
              <p>
                Với việc truy cập, duyệt hoặc sử dụng trang web này, quí khách
                đã đồng ý chấp thuận các ĐIỀU KHOẢN SỬ DỤNG được nêu dưới đây,
                cũng như tất cả các văn bản, chính sách và hướng dẫn có liên
                quan. Nếu không đồng ý với các điều khoản này, quí khách không
                nên truy cập trang web.
              </p>
              <h2>I. Khái niệm</h2>
              <ul>
                <li>
                  <p>
                    Các hành vi xâm phạm quyền sở hữu trí tuệ khác theo Luật Sở
                    hữu trí tuệ và các quy định pháp luật có liên quan.
                  </p>
                </li>
                <li>
                  <p>
                    “Nội Dung Trên Website” là mọi thông tin, dữ liệu, tài liệu,
                    tài nguyên, văn bản, thiết kế, đồ họa, giao diện, hình ảnh,
                    tệp âm thanh, sáng chế, nhãn hiệu thương mại, tên thương
                    mại, mẫu logo của VMC, sản phẩm, dịch vụ, bí mật kinh doanh
                    hay tư liệu khác của VMC được đăng tải và/hoặc tạo ra trên
                    Website. Toàn bộ Nội Dung Trên Website là tài sản hợp pháp
                    và thuộc quyền sở hữu của VMC.
                  </p>
                </li>
                <li>
                  <p>
                    “Điều khoản sử dụng” là các điều khoản sử dụng Website được
                    nêu tại đây và đăng tải trên Website.
                  </p>
                </li>
                <li>
                  <p>
                    “Người sử dụng” là cá nhân và/hoặc tổ chức truy cập vào
                    Website để tiếp cận, sử dụng Nội Dung Trên Website.
                  </p>
                </li>
              </ul>
              <h2>II. Quyền sở hữu trí tuệ</h2>
              <ol>
                <li>
                  <p>
                    Website và Nội Dung Trên Website đều thuộc quyền sở hữu/ bản
                    quyền của VMC và/hoặc bên thứ ba cấp phép cho VMC, được bảo
                    hộ theo quy định của Luật Sở hữu trí tuệ Việt Nam và các quy
                    định pháp luật có liên quan.
                  </p>
                </li>
                <li>
                  <p>
                    Người sử dụng không có quyền, yêu cầu hay lợi ích nào liên
                    quan tới Nội Dung Trên Website. Người sử dụng đồng ý không
                    đưa ra bất kỳ tuyên bố, hoặc có bất kỳ hành động nhằm xác
                    lập, thực hiện quyền, hoặc yêu cầu đối với Nội Dung Trên
                    Website
                  </p>
                </li>
                <li>
                  <p>
                    Ngoại trừ trường hợp: (i) quy định tại Khoản 1 Mục IV; hoặc
                    (ii) được sự chấp nhận trước bằng văn bản của VMC; hoặc
                    (iii) được sự cho phép của pháp luật Việt Nam, các hành vi
                    dưới đây sẽ được xem là xâm phạm quyền sở hữu trí tuệ của
                    VMC, cụ thể:
                  </p>
                  <ol>
                    <li className="sub-ol">
                      <p>
                        Mọi hành vi sử dụng, sao chép, tái chế, xuất bản lại,
                        chỉnh sửa, lưu trữ, sao lại, truyền, phân phối, thuê,
                        cho thuê, bán hoặc khai thác thương mại đối với bất kỳ
                        Nội Dung Trên Website bằng bất cứ cách thức nào;
                      </p>
                    </li>
                    <li className="sub-ol">
                      <p>
                        Phân phát, dịch thuật, sửa đổi, giải mã, tạo (những)
                        phẩm phái sinh, làm xáo trộn Nội Dung Trên Website bằng
                        bất cứ cách thức nào;
                      </p>
                    </li>
                    <li className="sub-ol">
                      <p>
                        Các hành vi xâm phạm quyền sở hữu trí tuệ khác theo Luật
                        Sở hữu trí tuệ và các quy định pháp luật có liên quan.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
              <h2>III. Quyền của VMC</h2>
              <ol>
                <li>
                  <p>
                    Thay đổi và/hoặc chấm dứt một phần hay toàn bộ Nội Dung Trên
                    Website mà không cần thông báo trước hoặc đưa ra bất kỳ lý
                    do nào cho các nội dung được cập nhật, bổ sung.
                  </p>
                </li>
                <li>
                  <p>
                    Yêu cầu Người sử dụng chấm dứt việc truy cập Website và/hoặc
                    sử dụng các Nội Dung Trên Website trong các trường hợp sau
                    đây:
                  </p>
                  <ol>
                    <li className="sub-ol">
                      <p>
                        Xâm phạm quyền sở hữu trí tuệ của VMC theo Mục II Điều
                        khoản sử dụng này.
                      </p>
                    </li>
                    <li className="sub-ol">
                      <p>
                        Sử dụng các Nội Dung Trên Website trong các trường hợp
                        bị hạn chế hoặc bị cấm theo Mục V Điều khoản sử dụng
                        này.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    Yêu cầu Người sử dụng bồi thường toàn bộ thiệt hại phát sinh
                    (nếu có) trong trường hợp Người sử dụng vi phạm quy định tại
                    Điều khoản sử dụng này.
                  </p>
                </li>
              </ol>
              <h2>IV. Quyền và trách nhiệm của người sử dụng</h2>
              <ol>
                <li>
                  <p>
                    Sử dụng Nội Dung Trên Website (xem, chiết xuất nội dung (in,
                    tải, chuyển tiếp, …) hoặc chia sẻ cho người khác) nhưng chỉ
                    cho mục đích sử dụng cá nhân/nội bộ và phi thương mại với
                    điều kiện phải trích dẫn nguồn cũng như giữ nguyên đường
                    liên kết (link/url) đến Nội Dung Trên Website.
                  </p>
                </li>
                <li>
                  <p>
                    Đảm bảo: (i) Tuân theo Điều khoản sử dụng và các quy định
                    của pháp luật Việt Nam liên quan đến việc truy cập Website
                    và sử dụng Nội Dung Trên Website; (ii) Không can thiệp, gây
                    ảnh hưởng đến việc truy cập Website và sử dụng Nội Dung Trên
                    Website của những Người sử dụng khác; (iii) Không can thiệp
                    vào hoạt động và quản lý Website của VMC.
                  </p>
                </li>
                <li>
                  <p>
                    Chấm dứt việc truy cập Website và/hoặc sử dụng Nội Dung Trên
                    Website trong trường hợp Người sử dụng không đồng ý với một
                    hoặc một số hoặc toàn bộ Điều khoản sử dụng.
                  </p>
                </li>
              </ol>
              <h2>V. Hạn chế sử dụng</h2>
              <p>
                VMC không chấp nhận bất kỳ việc sử dụng Nội Dung Trên Website
                vào một trong những trường hợp sau:
              </p>
              <ol>
                <li>
                  <p>Chống phá nhà nước CHXHCN Việt Nam.</p>
                </li>
                <li>
                  <p>
                    Xâm phạm quyền tự do cá nhân của người khác; và/hoặc làm
                    nhục, phỉ báng, bôi nhọ người khác; và/hoặc gây phương hại
                    hay gây bất lợi cho người khác.
                  </p>
                </li>
                <li>
                  <p>Gây rối trật tự công cộng;</p>
                </li>
                <li>
                  <p>Thực hiện các hành vi vi phạm pháp luật Việt Nam.</p>
                </li>
                <li>
                  <p>
                    Truyền bá và phân phối thông tin của bên thứ ba mà không
                    được sự chấp thuận của họ.
                  </p>
                </li>
                <li>
                  <p>
                    Sử dụng Nội Dung Trên Website vào mục đích kinh doanh
                    và/hoặc thương mại, bao gồm nhưng không giới hạn các cuộc
                    thi, cá cược, đổi chác, quảng cáo hoặc kinh doanh đa cấp mà
                    không có sự chấp thuận trước bằng văn bản của VMC.
                  </p>
                </li>
                <li>
                  <p>
                    Truyền đi những tập tin điện tử bị nhiễm vi-rút mà có thể
                    gây thiệt hại và/hoặc làm hư hại hoạt động của các thiết bị
                    điện tử khác.
                  </p>
                </li>
                <li>
                  <p>
                    Sử dụng các loại robot, nhện máy (spiders) và/hoặc bất kỳ
                    cách thức nào để theo dõi và thu thập Nội Dung Trên Website
                    cho bất kỳ mục đích tái sử dụng mà không được sự cho phép
                    trước bằng văn bản của VMC.
                  </p>
                </li>
                <li>
                  <p>
                    Sử dụng bất kỳ thiết bị, phần mềm và/hoặc bất kỳ cách thức
                    nào nhằm xâm phạm hoặc cố ý xâm phạm đến hoạt động của
                    Website.
                  </p>
                </li>
                <li>
                  <p>
                    Bất kỳ hành động nào không hợp pháp và/hoặc bị cấm theo quy
                    định pháp luật Việt Nam.
                  </p>
                </li>
                <li>
                  <p>
                    Hành động xâm phạm đến quyền và lợi ích hợp pháp của VMC.
                  </p>
                </li>
                <li>
                  <p>
                    Bất kỳ hành động nào mà VMC đơn phương cho rằng không thích
                    hợp hoặc gây ảnh hưởng không tốt đẹp đến VMC.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withAppProvider(PolicyPage);
