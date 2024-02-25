import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ArtworkTableSearch from './ArtworkTableSearch'
import ArtworkFilter from './ArtworkFilter'
import { Link } from 'react-router-dom'

const ArtistTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ArtworkTableSearch />
            <ArtworkFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/artwork/add"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Artwork
                </Button>
            </Link>
        </div>
    )
}

export default ArtistTableTools
