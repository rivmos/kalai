import { ReactNode } from "react"
import { MdOutlinePercent } from "react-icons/md";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { HiOutlinePaintBrush } from "react-icons/hi2";


const StatCard = ({ iconSrc, title, stat }: { iconSrc: ReactNode, title: string, stat: string }) => {
    return (
        <div className="h-56 p-4 bg-white flex flex-col justify-center rounded-lg shadow-xl text-center w-80">
            <div className="flex justify-center items-center mb-4 text-4xl">
                {iconSrc}
            </div>

            <div className="text-xl font-medium">{title}</div>
        </div>
    )
}

const Stats = () => {
    return (
        <>
        <div className="h-full bg-orange-200">
        <div className="container mx-auto py-16" >
            <div className='grid grid-cols-1 lg:grid-cols-3 h-full'>
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                    <div className="py-0 md:py-4 lg:py-10 pb-3 mt-72 h-4/6 relative bg-yellow-100 group hover:bg-yellow-200 cursor-pointer transition ease-out duration-300"> 
                        <div>
                            <div className="w-4 h-1/5absolute right-0 -top-48 bg-yellow-100 group-hover:bg-yellow-50"></div>
                            <img src="https://chairish-prod.freetls.fastly.net/image/product/master/95da1a5a-0065-41c4-99c8-4b129de30cd9/blossoming-flowers-original-artwork-by-katharina-husslein-1391" alt="https://www.pngegg.com/en/png-nllal/download" />
                        </div>
                        <div className="px-7 mt-10 mb-24">
                            <h1 className="text-3xl font-bold group-hover:text-yellow-600 transition ease-out duration-300">Curation of Top Art</h1>
                            <p className="mt-2 opacity-60 group-hover:opacity-70 ">Diverse collection of roof lights of quality</p>
                        </div>
                    </div>
                </div>
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                    <div className="py-0 md:py-4 lg:py-10  pb-3 mt-32 h-4/6 relative bg-red-200 group hover:bg-red-300 cursor-pointer transition ease-out duration-300"> 
                        <div>
                            {/* <div className="w-4 h-1/5 bg-red-50	absolute right-0 bg-red-200  group-hover:bg-red-100"></div> */}
                            <img src="https://www.iartgallery.in/cdn/shop/products/image_898fdec5-1574-48b0-89c8-d834d5f86421_grande.png" alt="https://www.pngegg.com/en/png-zquqj/download" />
                        </div>
                       <div className="px-7 mt-10 mb-24">
                            <h1 className="text-3xl font-bold group-hover:text-red-500 transition ease-out duration-300 hover:custom-hover-effect">100% Authentic</h1>
                            <p className="mt-2 opacity-60 group-hover:opacity-70 ">Comfortable collection of perfect lounge chairs</p>
                        </div>
                    </div>
                </div>
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                    <div className="py-0 md:py-4 lg:py-10 pb-3 mt-5 h-4/6 relative bg-orange-100 group hover:bg-orange-300 cursor-pointer transition ease-out duration-300"> 
                         <div>
                            <div className="w-4 h-1/5 bg-orange-5 absolute right-0 -bottom-44 bg-orange-100 group-hover:bg-orange-50"></div>
                            <img src="https://chairish-prod.freetls.fastly.net/image/product/sized/6783c173-e63a-4ee5-a467-44c483b46e96/contemporary-original-abstract-mixed-media-painting-0270" alt="https://www.pngegg.com/en/png-epwii/download" />
                        </div>
                        <div className="px-7 mt-10 mb-24">
                            <h1 className="text-3xl font-bold group-hover:text-orange-500 transition ease-out duration-300">Commission Arts</h1>
                            <p className="mt-2 opacity-60 group-hover:opacity-70 ">Best selection of scandinavia couch for your home</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default Stats