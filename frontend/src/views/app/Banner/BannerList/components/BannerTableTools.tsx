import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import BannerTableSearch from './BannerTableSearch'
import BannerFilter from './BannerFilter'
import { Link } from 'react-router-dom'

const BannerTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <BannerTableSearch />
            {/* <BannerFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
            <Link
                className="block lg:inline-block ml-2 md:mb-0 mb-4"
                to="/app/banners/add"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Banner Image
                </Button>
            </Link>
        </div>
    )
}

export default BannerTableTools
