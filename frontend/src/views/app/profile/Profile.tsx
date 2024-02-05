import { useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import CustomerProfile from './components/CustomerProfile'
import PaymentHistory from './components/PaymentHistory'
import CurrentSubscription from './components/CurrentSubscription'
import PaymentMethods from './components/PaymentMethods'
import reducer, { getUserProfile, useAppDispatch, useAppSelector } from './store'
import { injectReducer } from '@/store'
import isEmpty from 'lodash/isEmpty'
import useQuery from '@/utils/hooks/useQuery'
import { useParams } from 'react-router-dom'
import EducationDetails from './components/EducationDetails'
import Skills from './components/Skills'

injectReducer('userProfile', reducer)

const CustomerDetail = () => {
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const query = useQuery()

    const data = useAppSelector(
        (state) => state.userProfile.data.profileData
    )
    const loading = useAppSelector(
        (state) => state.userProfile.data.loading
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        if (id) {
            dispatch(getUserProfile({ id }))
        }
    }

    return (
        <Container className="h-full mt-4">
            <h4 className='my-2'>User Details</h4>
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div>
                            <CustomerProfile data={data} />
                        </div>
                        <div className="w-full">
                            <AdaptableCard>
                                <CurrentSubscription />
                                {/* <PaymentHistory /> */}
                                <EducationDetails />
                                <Skills />
                                {/* <PaymentMethods /> */}
                            </AdaptableCard>
                        </div>
                    </div>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
        </Container>
    )
}

export default CustomerDetail
