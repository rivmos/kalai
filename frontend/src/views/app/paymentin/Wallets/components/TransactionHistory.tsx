import { useEffect } from 'react'
import {
    getTransctionHistoryData,
    setSelectedTab,
    setTableData,
    initialTableData,
    setTransactionHistoryData,
    useAppDispatch,
    useAppSelector,
    Trade,
    TransactionDetails,
} from '../store'
import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import OrderTable from './OrderTable'
import DepositWithdrawalTable from './DepositWithdrawalTable'

const { TabNav, TabList, TabContent } = Tabs

const transactionHistoryData =
{
    trade: [
        {
            actionType: 0,
            status: 1,
            action: 'Buy BTC',
            date: 1660132800,
            symbol: 'BTC',
            price: 35843.12,
            amount: 1.214321,
        },
        {
            actionType: 0,
            status: 1,
            action: 'Buy BTC',
            date: 1659132800,
            symbol: 'BTC',
            price: 7324.94,
            amount: 0.256578,
        },
        {
            actionType: 1,
            status: 0,
            action: 'Sell ETH',
            date: 1658132800,
            symbol: 'ETH',
            price: 16834.42,
            amount: 9.346292,
        },
        {
            actionType: 2,
            status: 2,
            action: 'Swap ETH to BTC',
            date: 1658132800,
            symbol: 'ETH',
            price: 4000.0,
            amount: 2.220581,
        },
        {
            actionType: 0,
            status: 0,
            action: 'Buy SOL',
            date: 1656232800,
            symbol: 'SOL',
            price: 6372.57,
            amount: 163.3846,
        },
        {
            actionType: 0,
            status: 0,
            action: 'Buy BTC',
            date: 1655532800,
            symbol: 'BTC',
            price: 5288.36,
            amount: 0.185462,
        },
        {
            actionType: 0,
            status: 0,
            action: 'Buy ETH',
            date: 1654932800,
            symbol: 'ETH',
            price: 1376.76,
            amount: 0.762942,
        },
        {
            actionType: 1,
            status: 0,
            action: 'Sell BTC',
            date: 1654132800,
            symbol: 'BTC',
            price: 9345.74,
            amount: 0.315731,
        },
        {
            actionType: 2,
            status: 2,
            action: 'Swap BTC to ETH',
            date: 1650132800,
            symbol: 'BTC',
            price: 6540.21,
            amount: 0.227392,
        },
        {
            actionType: 0,
            status: 2,
            action: 'Buy ETH',
            date: 1649832800,
            symbol: 'ETH',
            price: 3832.55,
            amount: 2.131846,
        },
        {
            actionType: 2,
            status: 2,
            action: 'Swap BTC to ETH',
            date: 1650132800,
            symbol: 'BTC',
            price: 6540.21,
            amount: 0.227392,
        },
        {
            actionType: 0,
            status: 2,
            action: 'Buy ETH',
            date: 1649832800,
            symbol: 'ETH',
            price: 3832.55,
            amount: 2.131846,
        },
    ],
    deposit: [
        {
            id: '1r4t4LPT89',
            date: 1660132800,
            amount: 5221.42,
            status: 1,
        },
        {
            id: 'x4M7vUk0Ph',
            date: 1659132800,
            amount: 2511.79,
            status: 0,
        },
        {
            id: 'NMEddCfzOU',
            date: 1658132800,
            amount: 1621.69,
            status: 0,
        },
        {
            id: '73FCyE5A01',
            date: 1657332800,
            amount: 8204.37,
            status: 2,
        },
        {
            id: 'BXfw8E4jqh',
            date: 1656232800,
            amount: 9323.16,
            status: 0,
        },
        {
            id: 'VVC9sqyGW0',
            date: 1655532800,
            amount: 3247.87,
            status: 0,
        },
        {
            id: 'knl7mhjFVJ',
            date: 1654932800,
            amount: 1935.31,
            status: 0,
        },
    ],
    withdraw: [
        {
            id: 'BxwE2fNELZ',
            date: 1660132800,
            amount: 4522.75,
            status: 1,
        },
        {
            id: 'G1xtpaE76e',
            date: 1659132800,
            amount: 5761.13,
            status: 0,
        },
        {
            id: 'hpqMH7sUc4',
            date: 1658132800,
            amount: 9762.43,
            status: 0,
        },
        {
            id: 'WAYL1VDzQ2',
            date: 1657332800,
            amount: 1123.56,
            status: 2,
        },
        {
            id: 'KEzIP7m6Dn',
            date: 1656232800,
            amount: 3276.14,
            status: 0,
        },
        {
            id: 'UumwPM9ZOY',
            date: 1655532800,
            amount: 5422.05,
            status: 0,
        },
        {
            id: 'INfkGxbeFR',
            date: 1654932800,
            amount: 1258.39,
            status: 1,
        },
        {
            id: '0p1ozYRslq',
            date: 1654132800,
            amount: 9858.17,
            status: 0,
        },
    ],
}


const TransactionHistory = () => {


    const dispatch = useAppDispatch()

    const data = useAppSelector(
        (state) => state.cryptoWallets.data.transactionHistoryData
    )

    // const loading = useAppSelector(
    //     (state) => state.cryptoWallets.data.transactionHistoryLoading
    // )

    const loading = false

    const selectedTab = useAppSelector(
        (state) => state.cryptoWallets.data.selectedTab
    )

    const tableData = useAppSelector(
        (state) => state.cryptoWallets.data.tableData
    )


    useEffect(() => {
        dispatch(getTransctionHistoryData({ tab: selectedTab, ...tableData }))
    }, [dispatch, selectedTab, tableData])

    const handleTabChange = (val: string) => {
        dispatch(setTransactionHistoryData([]))
        dispatch(setSelectedTab(val))
        dispatch(setTableData(initialTableData))
    }

    return (
        <Card>
            <h4 className="mb-4">Payments History</h4>
            <Tabs value={selectedTab} variant="pill" onChange={handleTabChange}>
                {/* <TabList>
                    <TabNav value="trade">Trade</TabNav>
                    <TabNav value="deposit">Deposit</TabNav>
                    <TabNav value="withdraw">Withdraw</TabNav>
                </TabList> */}
                <div className="mt-4">
                    {/* <TabContent value="trade">
                        <OrderTable
                            data={transactionHistoryData.trade as Trade[]}
                            loading={loading}
                            tableData={tableData}
                        />
                    </TabContent> */}
                    {/* <TabContent value="deposit"> */}
                        <DepositWithdrawalTable
                            data={transactionHistoryData.deposit as TransactionDetails[]}
                            loading={loading}
                            tableData={tableData}
                        />
                    {/* </TabContent> */}
                    {/* <TabContent value="withdraw">
                        <DepositWithdrawalTable
                            data={transactionHistoryData.withdraw as TransactionDetails[]}
                            loading={loading}
                            tableData={tableData}
                        />
                    </TabContent> */}
                </div>
            </Tabs>
        </Card>
    )
}

export default TransactionHistory
