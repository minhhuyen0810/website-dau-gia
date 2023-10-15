import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionView from '../../layout/sections/renderSection';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { PropsPageInterface } from '../../types/page.interface';
import PreloadImage from '../../layout/components/PreloadImage';
import { useAsyncFn, useEffectOnce } from 'react-use';
import {
  getDetailProductAction,
  getListProductAction,
} from '../../store/slices/product.slice';
import { useAppSelector } from '../../store/hook';
import { Button, Card, DatePicker, Form, Input, List, Select } from 'antd';
import dayjs from 'dayjs';
const ProductPage = (props: PropsPageInterface) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [state, setState] = useState<any>();
  const dataReducer = useAppSelector((state) => state.product);
  const router = useRouter();
  const { id } = router.query;
  const [dataAction, setDataAction] = useState<any>({
    keyword: null,
    auctionStatus: null,
    resultStatus: null,
    type: null,
    fromDate: null,
    toDate: null,
  });
  //EFFECT
  useEffectOnce(() => {
    dispatch(getListProductAction({}) as any);
  });
  useEffect(() => {
    if (dataReducer) {
      console.log('state: >>', dataReducer?.data);
      setState(dataReducer?.data);
    }
  }, [dataReducer]);
  // FUNCTION

  const _onChangePage = async (page: number) => {
    dispatch(getListProductAction({ page: page - 1 }) as any);
  };
  function formatCurrency(number: number): string {
    return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
  const _onFinish = async () => {
    _onSubmitCourse();
  };
  const _onSubmitCourse = async () => {
    const body = {
      keyword: dataAction?.keyword,
      auctionStatus: dataAction?.auctionStatus,
      resultStatus: dataAction?.resultStatus,
      type: dataAction?.type,
      fromDate: dataAction?.fromDate,
      toDate: dataAction?.toDate,
    } as any;

    if (dayjs.isDayjs(body.fromDate)) {
      body.fromDate = body.fromDate.valueOf(); // Chuyển đổi thành timestamp
    }
    if (dayjs.isDayjs(body.toDate)) {
      body.toDate = body.toDate.valueOf(); // Chuyển đổi thành timestamp
    }
    console.log('fromDate:', body.fromDate);
    console.log('toDate:', body.toDate);
    await dispatch(
      getListProductAction({
        keyword: body.keyword,
        auctionStatus: body.auctionStatus,
        resultStatus: body.resultStatus,
        type: body.type,
        fromDate: body.fromDate,
        toDate: body.toDate,
      }) as any
    );
  };
  const onChangeValue = (valueUp: any, propName: string) => {
    if (propName === 'keyword') {
      setDataAction({
        ...dataAction,
        keyword: valueUp,
      });
      form.setFieldsValue({
        ...dataAction,
        keyword: valueUp,
      });
    }
    if (propName === 'auctionStatus') {
      setDataAction({
        ...dataAction,
        auctionStatus: valueUp,
      });
      form.setFieldsValue({
        ...dataAction,
        auctionStatus: valueUp,
      });
    }
    if (propName === 'resultStatus') {
      setDataAction({
        ...dataAction,
        resultStatus: valueUp,
      });
      form.setFieldsValue({
        ...dataAction,
        resultStatus: valueUp,
      });
    }
    if (propName === 'type') {
      setDataAction({
        ...dataAction,
        type: valueUp,
      });
      form.setFieldsValue({
        ...dataAction,
        type: valueUp,
      });
    }
    if (propName === 'fromDate') {
      setDataAction({
        ...dataAction,
        fromDate: valueUp,
      });
      form.setFieldsValue({
        ...dataAction,
        fromDate: valueUp,
      });
    }
    if (propName === 'toDate') {
      setDataAction({
        ...dataAction,
        toDate: valueUp,
      });
      form.setFieldsValue({
        ...dataAction,
        toDate: valueUp,
      });
    }
  };
  const handleClickItem = (value: string) => {
    router.push(`/product/${value}`);
  };
  // RENDER
  return (
    <div className="product-page padding-120">
      <section className="section section-banners">
        <PreloadImage
          src="/img/bannerdanhmuctaisan.png"
          altAttribute="banner"
          cssClass="image-banner"
          layout="fill"
          priority
        />
        <div className="content-banner">
          <h1 className="title-common">Danh mục tài sản đấu giá</h1>
        </div>
      </section>
      <section className="flex section section-product ">
        <div className=" w-1/4 p-3 product-select">
          <Form
            className="form-create-currency row"
            form={form}
            layout="vertical"
            onFinish={_onFinish}
          >
            <div>
              <Form.Item label="Từ khoá" name="keyword">
                <Input
                  className="w-full"
                  value={dataAction.keyword}
                  onChange={(e) => onChangeValue(e.target.value, `keyword`)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Trạng thái đấu giá" name="auctionStatus">
                <Select
                  optionFilterProp="name"
                  className="w-full"
                  onChange={(value) => onChangeValue(value, `auctionStatus`)}
                  allowClear
                  showSearch
                  options={[
                    { value: 'FINISHED', label: 'Đã kết thúc' },
                    { value: 'HAPPENING', label: 'Đang diễn ra' },
                    { value: 'UP_COMING', label: 'Sắp diễn ra' },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Kết quả đấu giá" name="resultStatus">
                <Select
                  className="w-full"
                  optionFilterProp="name"
                  onChange={(value) => onChangeValue(value, `resultStatus`)}
                  allowClear
                  showSearch
                  options={[
                    { value: 'CANCEL', label: 'Huỷ' },
                    { value: 'FAIL', label: 'Thất bại' },
                    { value: 'SUCCESSFUL', label: 'Thành công' },
                    { value: 'WAIT_PAYMENT', label: 'Chờ thanh toán' },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Phân loại" name="type">
                <Select
                  className="w-full"
                  optionFilterProp="name"
                  allowClear
                  showSearch
                  onChange={(value) => onChangeValue(value, `type`)}
                  options={[
                    { value: 'LUXURY_BRAND', label: 'Hàng hiệu' },
                    { value: 'OTHER', label: 'Khác' },
                    { value: 'REAL_ESTATE', label: 'Bất động sản' },
                    { value: 'VEHICLE', label: 'Phương tiện giao thông' },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Từ ngày:"
                name="fromDate"
                rules={[
                  {
                    validator: (_: any, value: any) => {
                      if (
                        value &&
                        dataAction.toDate &&
                        value > dataAction.toDate
                      ) {
                        return Promise.reject(
                          new Error(
                            'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!'
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  value={dataAction.fromDate}
                  className="w-full"
                  placeholder={'Thời gian bắt đầu'}
                  onChange={(value) => onChangeValue(value, `fromDate`)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Đến ngày:"
                name="toDate"
                rules={[
                  {
                    validator: (_: any, value: any) => {
                      if (
                        value &&
                        dataAction.fromDate &&
                        value < dataAction.fromDate
                      ) {
                        return Promise.reject(
                          new Error(
                            'Thời gian kết thúc phải lớn hơn thời gian bắt đầu!'
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  value={dataAction.toDate}
                  className="w-full"
                  placeholder={'Thời gian kết thúc'}
                  onChange={(value) => onChangeValue(value, `toDate`)}
                />
              </Form.Item>
            </div>
            <div className="text-center">
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </div>
          </Form>
        </div>
        <div className="w-3/4 p-3 product-list">
          <h2 className="flex justify-center">Danh mục các sản phẩm</h2>
          <List
            grid={{ gutter: 12, column: 3 }}
            itemLayout="vertical"
            size="large"
            pagination={{
              defaultCurrent: 1,
              onChange: _onChangePage,
              pageSize: state?.size,
              total: state?.totalElements,
            }}
            dataSource={state?.content}
            renderItem={(item: any) => (
              <List.Item>
                <Card cover={<img alt="example" src={item.imageUrl} />}>
                  <a onClick={() => handleClickItem(item.id)}>
                    <h3>{item.name}</h3>
                  </a>
                  <div>Giá khởi điểm: {formatCurrency(item.minPrice)}</div>
                  <div>Trạng thái đấu giá: {item.auctionStatusAsText}</div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default withAppProvider(ProductPage);
