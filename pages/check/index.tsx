import React from "react";
import withAppProvider from "../../layout/wrapper/withAppProvider";
import { Select } from "antd";

const ChecksnPage = () => {
    return (

        <div className="containersn">

            <h1>Thông tin sản phẩm</h1>

            <div className="checksn">
                <img src="/checksn.png" alt="Sản phẩm" />
                <div className="checksn-details">
                    <span>
                        <p className="heading-info">
                            Thông tin chung
                        </p>
                        <table>
                            <tr>
                                <th>Tên sản phẩm: </th>
                                <td>TenSanPham</td>
                            </tr>
                            <tr>
                                <th>Mã sản phẩm: </th>
                                <td>MaSanPham</td>
                            </tr>
                            <tr>
                                <th>Serial Number:</th>
                                <td>SerialNumber</td>
                            </tr>
                        </table>
                    </span>
                    <span>
                        < p className="heading-info">
                            Thông tin nhà sản xuất
                        </p>
                        <table>
                        <tr>
                             <th>Năm sản xuất:</th>
                             <td>NamSanXuat</td>
                         </tr>
                         <tr>
                             <th>Nhà sản xuất: </th>
                             <td>TỔNG CÔNG TY SẢN XUẤT THIẾT BỊ VIETTEL</td>
                         </tr>
                         <tr>
                             <th>Địa chỉ: </th>
                             <td>An Khánh- Hoài Đức- Hà Nội</td>
                         </tr>
                         <tr>
                             <th>Hotline: </th>
                             <td>+842462650365</td>
                         </tr>
                         <tr>
                             <th>Email: </th>
                             <td>m1company@viettel.com.vn</td>
                         </tr>
                         <tr>
                             <th>Website: </th>
                             <td>m1.viettel.com.vn</td>
                         </tr>
                        </table>
                    </span>
                    <span>
                        <p className="heading-info">
                            Thông tin bảo hành
                        </p>
                        <table> 
                            <tr>
                             <th>Điều kiện bảo hành: </th>
                             <td>Theo điều khoản hợp đồng</td>
                         </tr>
                         <tr>
                             <th>Thời gian bảo hành: </th>
                             <td>24 tháng</td>
                         </tr>
                         </table>
                    </span>
                    <span>
                        <p className="heading-info">
                            Thông tin tiêu chuẩn
                        </p>
                        <table>
                         <tr>
                             <th>Chứng chỉ an toàn: </th>
                             <td> </td>
                         </tr>
                         <tr>
                             <th>Tiêu chuẩn quản lý: </th>
                             <td>TL9000, ISO9001</td>
                         </tr>
                         <tr>
                             <th>Điều kiện hoạt động: </th>
                             <td>&deg;C đến &deg;C, độ ẩm: đến 98</td>
                         </tr>
                        </table>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default withAppProvider(ChecksnPage);