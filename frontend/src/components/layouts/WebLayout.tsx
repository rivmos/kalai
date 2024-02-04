import Header from '@/components/template/Header'
import View from '@/views'
import WebHeader from '../template/WebHeader'
import Footer from '../template/Footer'

const WebLayout = () => {
    return (
        <div>
            <WebHeader />
            <div className="flex flex-col flex-auto min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                <View />
            </div>
            <div className='container mx-auto m-0'>
                <Footer pageContainerType='gutterless' />
            </div>
        </div>
    )
}

export default WebLayout
