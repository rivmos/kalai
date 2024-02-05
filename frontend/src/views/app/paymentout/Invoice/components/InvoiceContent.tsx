import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Loading from '@/components/shared/Loading'
import Logo from '@/components/template/Logo'
import ContentTable from './ContentTable'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGePaymentOutInvoiceData } from '@/services/PaymentOut'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useAppSelector } from '@/store'
import dayjs from 'dayjs'
import type { Product, Summary } from './ContentTable'

type Invoice = {
    id: string
    recipient: string
    email: string
    address: string[]
    phoneNumber: string
    dateTime: number
    product: Product[]
    paymentSummary: Summary
}
const invoiceData = {
    recipient: 'Ron Vargas',
    email: 'ronnie_vergas@infotech.io',
    address: ['6786 E Nc 150 Hwy', 'Sherrills Ford, North Carolina(NC)'],
    phoneNumber: '(704) 483-2042',
    dateTime: 1646396117,
    product: [
        {
            id: '13',
            name: 'White Backpack',
            productCode: 'BIS-013',
            img: '/img/products/product-2.jpg',
            price: 252,
            quantity: 2,
            total: 504,
            details: {
                color: ['White'],
                size: ['One size'],
            },
        },
        {
            id: '18',
            name: 'Strip Analog Watch',
            productCode: 'BIS-018',
            img: '/img/products/product-7.jpg',
            price: 389,
            quantity: 1,
            total: 389,
            details: {
                color: ['Red'],
                gender: ['Unisex'],
            },
        },
        {
            id: '19',
            name: 'Beats Solo Headphone',
            productCode: 'BIS-019',
            img: '/img/products/product-8.jpg',
            price: 869,
            quantity: 1,
            total: 869,
            details: {
                color: ['Red'],
            },
        },
    ],
    paymentSummary: {
        subTotal: 1762,
        tax: 105.72,
        deliveryFees: 15,
        total: 1870.72,
    },
}
type GetAccountInvoiceDataRequest = { id: string }

type GetAccountInvoiceDataResponse = Invoice

const InvoiceContent = () => {
    const { textTheme } = useThemeClass()

    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Partial<Invoice>>({})

    const mode = useAppSelector((state) => state.theme.mode)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        if (id) {
            setLoading(true)
            const response = await apiGePaymentOutInvoiceData<
                GetAccountInvoiceDataResponse,
                GetAccountInvoiceDataRequest
            >({ id })
            if (response) {
                setLoading(false)
                setData(response.data)
            }
        }
    }

    return (
        <Loading loading={loading}>
            {!isEmpty(invoiceData) && (
                <>
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
                        <div>
                            <Logo className="mb-3" mode={mode} />
                            <address className="not-italic">
                                <div>
                                    <h5>Elstar, Inc.</h5>
                                    <br />
                                    <span>9498 Harvard Street</span>
                                    <br />
                                    <span>Fairfield, Chicago Town 06824</span>
                                    <br />
                                    <abbr title="Phone">Phone:</abbr>
                                    <span>(123) 456-7890</span>
                                </div>
                            </address>
                        </div>
                        <div className="my-4">
                            <div className="mb-2">
                                <h4>Invoice #{invoiceData?.id}</h4>
                                <span>
                                    Date:{' '}
                                    {dayjs
                                        .unix(invoiceData.dateTime as number)
                                        .format('dddd, DD MMMM, YYYY')}
                                </span>
                            </div>
                            <h6>{invoiceData.recipient}</h6>
                            <div className="mt-4 flex">
                                <HiLocationMarker
                                    className={`text-xl ${textTheme}`}
                                />
                                <div className="ltr:ml-3 rtl:mr-3">
                                    {invoiceData?.address?.map((line) => (
                                        <div key={line} className="mb-1">
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <HiPhone className={`text-xl ${textTheme}`} />
                                <div className="ltr:ml-3 rtl:mr-3">
                                    {invoiceData.phoneNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContentTable
                        products={invoiceData?.product}
                        summary={invoiceData.paymentSummary}
                    />
                    <div className="print:hidden mt-6 flex items-center justify-between">
                        <small className="italic">
                            Invoice was created on a computer and is valid
                            without the signature and seal.
                        </small>
                        <Button variant="solid" onClick={() => window.print()}>
                            Print
                        </Button>
                    </div>
                </>
            )}
        </Loading>
    )
}

export default InvoiceContent
