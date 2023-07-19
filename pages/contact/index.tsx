import { Button, Col, Form, Input, Row, Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { ContactInterface, IInforContact } from '../../model/contact';
import contactService from '../../services/contact.service';
import inforService from '../../services/infor.service';
import { useAppSelector } from '../../store/hook';
import { getContactAction } from '../../store/slices/contact.slice';
const ContactPage = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const contactData = useAppSelector((state) => state.contact.data);
  const [form] = Form.useForm();
  const [contact, setContact] = useState<ContactInterface>();
  const [inforContact, setInforContact] = useState<IInforContact>();

  // SEED
  const [width, setWidth]: any = useState(null);
  useEffect(() => {
    if (window) {
      setWidth(window.outerWidth)
    }
  }, []);
  // EFFECT
  useEffect(() => {
    dispatch(getContactAction() as any);
  }, []);

  useEffect(() => {
    const getAddressDetailt = async () => {
      const address = await contactService.getAddress();
      if (address && address.data) {
        setInforContact(address.data);
      }
    };
    getAddressDetailt();
  }, []);

  useEffect(() => {
    if (contactData && contactData.length > 0) {
      setContact(contactData[0]);
    }
  }, [contactData]);

  // FUNCTION
  const onFinish = async (value: any) => {
    const body = value;
    await inforService.postInfor(body);
    form.resetFields();
    toast.success(
      'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ liên lạc lại với bạn trong thời gian sớm nhất'
    );
  };

  // RENDER
  const configForm = {
    rules: [{ required: true, message: 'Vui lòng nhập vào thông tin' }],
  };
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
    labelAlign: 'left' as any,
    layout: 'vertical' as any,
  };
  const { TextArea } = Input;

  return (
    <div className="contact-page">
      <section className="section section-banners">
        <div className="image-banner">
          <Image src="/img/bannerContact.png" layout="fill" alt="banner" />
        </div>
        <div className="content-banner">
          <p className="heading">{t('CONTACT')}</p>
          <h1 className="title">
            <p>{t('CONTACT_NOW')}</p>
          </h1>
          <p>{t('CONTACT_SUBTITLE')}</p>
        </div>
      </section>
      <section className="section">
        <div className="section-pad section-form">
          <h1 className="title-common underline">{t('CONTACT_TITLE')} </h1>
          <Form {...layout} form={form} onFinish={onFinish}>
            <Row gutter={32}>
              <Col xs={{ span: 24 }} md={{ span: 12 }} className="form-right" >
                <Image
                  src="/img/logo_black.png"
                  width={320}
                  height={130}
                  alt="logo"
                />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item name="purpose" label={t('PURPOSE')} {...configForm}>
                  <Select style={{ width: "100%" }}>
                    <Select.Option value="order">{t('ORDER')}</Select.Option>
                    <Select.Option value="client">{t('PARTNER')}</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="name"
                  label={t('FULL_NAME')}
                  labelAlign="left"
                  {...configForm}
                >
                  <Input style={{ width: "100%" }} name="name" />
                </Form.Item>
                <Form.Item name="email" label={t('TEL_EMAIL')} {...configForm}>
                  <Input />
                </Form.Item>
                <Form.Item name="company" label={t('COMPANY')} {...configForm}>
                  <Input />
                </Form.Item>
                <Form.Item name="content" label={t('MESSAGES')} {...configForm}>
                  <TextArea rows={4} />
                </Form.Item>
                <Button
                  htmlType="submit"
                  className="btn-common btn-round-spec primary submit"
                  id="btnSend"
                  aria-label="Button send"
                >
                  {t('SEND')}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </section>
      <section className="section">
        <div className="section-pad section-contact">
          <h1 className="title-common underline">{inforContact?.title}</h1>
          <div className="contact-block hotline flex">
            <div className="">
              <h4 className="contact-block-title iBold">{t('ADDRESS')}:</h4>
            </div>
            {/* <ul> */}
            {inforContact &&
              inforContact.address &&
              Array.isArray(inforContact.address) &&
              inforContact.address.map((address, index) => (
                <div key={index}>
                  <p className="contact-info">&nbsp;{address}</p>
                </div>
              ))}
            {/* </ul> */}
          </div>
          <div className="contact-block hotline flex">
            <div className="">
              <h4 className="contact-block-title hotline iBold">
                {t('EMAIL')}:
              </h4>
            </div>
            <p className="contact-info">&nbsp;{inforContact?.email}</p>
          </div>
          <div className="contact-block hotline flex">
            <div className="">
              <h4 className="contact-block-title iBold">{t('HOTLINE')}: </h4>
            </div>
            <p className="contact-info">&nbsp;{inforContact?.hotline}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className=" section-pad section-map">
          {/* <img src="../img/map.png" className="map" loading="lazy" /> */}
          <div className="footer-middle-info">
            <div>
              <iframe
                width="100%"
                height="550"
                frameBorder="0"
                scrolling="no"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=viettel%20menufacturing+(fghhgf)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.maps.ie/distance-area-calculator.html">
                  distance maps
                </a>
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withAppProvider(ContactPage);
