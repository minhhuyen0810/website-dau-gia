import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import withAppProvider from "../../layout/wrapper/withAppProvider";
import { useAppSelector } from "../../store/hook";
import { getCheckSnAction } from "../../store/slices/checkSn.slice";
import useTranslation from "next-translate/useTranslation";
const DetailChecksnPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation('common');
    const checkSnState = useAppSelector((state) => state.checkSn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getCheckSnAction(id as string) as any);
        }
    }, [id]);

    return (
        <div className="containersn">
            <h1>{t('PRODUCT_INFO')}</h1>
            {
                checkSnState.data ? (
                    <div className="checksn">
                        {/* <img src="/checksn.png" alt="Sản phẩm" /> */}
                        {/* <Image src="/checksn.png" width={513} height={582} alt="Sản phẩm" /> */}
                        <div className="checksn-details">
                            <div>
                                <div>
                                    <span>{t('SERIAL_NO')} {checkSnState?.data?.serialno}</span>
                                </div>
                                <div>
                                    <span>{t('PRODUCT_NAME')} {checkSnState?.data?.namesr}</span>
                                </div>
                                <div>
                                    <span>{t('PRODUCT_ID')} {checkSnState?.data?.producT_ID}</span>
                                </div>
                            </div>

                            <div>
                                <p className="heading-info">
                                {t('PRODUCER')}
                                </p>
                                <div>
                                    <span>{t('YEAR_MANUFACTURE')} {checkSnState?.data?.fiscalyear}</span>
                                </div>
                                <div>
                                    <span>{t('PRODUCER_CHILD')} {checkSnState?.data?.producer}</span>
                                </div>
                                <div>
                                    <span>{t('ADDRESS')}: {checkSnState?.data?.address}</span>
                                </div>
                                <div>
                                    <span>{t('PHONE')}: {checkSnState?.data?.phone}</span>
                                </div>
                                <div>
                                    <span>{t('EMAIL')}: {checkSnState?.data?.email}</span>
                                </div>
                                <div>
                                    <span> Website:  {checkSnState?.data?.website}</span>
                                </div>
                            </div>
                            <div>
                                <p className="heading-info">
                                {t('GUARANTEE')}
                                </p>
                                <div>
                                    <span>{t('GUARANTEE_INFO')} {checkSnState?.data?.description}</span>
                                </div>
                                <div>
                                    <span>{t('GUARANTEE_TIME')} {checkSnState?.data?.conditionswork}</span>
                                </div>
                            </div>
                            <div>
                                <p className="heading-info">
                                {t('OTHER_INFO')}
                                </p>
                                <div>
                                    <span>{t('CETIFICATE')} {checkSnState?.data?.certificate}</span>
                                </div>
                                <div>
                                    <span>{t('STANDARD')} {checkSnState?.data?.standard}</span>
                                </div>
                                <div>
                                    <span>{t('CONDITIONS')} {checkSnState?.data?.conditionswarranty}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span className="noData">Sản phẩm chưa được cập nhật trên hệ thống</span>
                )
            }
        </div>
    );
}
export default withAppProvider(DetailChecksnPage);
