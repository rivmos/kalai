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

            {/* <div className="text-4xl font-bold mb-2">{stat}</div> */}

            {/* <hr className="border-t border-gray-300 mx-auto w-16 mb-2" /> */}

            <div className="text-xl font-medium">{title}</div>
        </div>
    )
}

const Stats = () => {
    return (
        // <div className=' bg-greySection py-12'>
        //     <div className='container mx-auto flex justify-around'>
        //     <StatCard  stat='10.5k' title='Curation of Top Art' iconSrc={<MdOutlineLocalFireDepartment />}/>
        //     <StatCard  stat='8600+' title='100% Authentic' iconSrc={<MdOutlinePercent />}/>
        //     <StatCard  stat='1200' title='Commission Arts' iconSrc={<HiOutlinePaintBrush />}/>
        //     <StatCard  stat='75' title='By The Artist' iconSrc={<MdOutlineLocalFireDepartment />}/>
        //     </div>
        // </div>
        <>
        {/* <h3 className='text-center'>Artworks</h3>
        <p className='text-center mt-2 mb-8'>Discover from a curated collection of works by renowned Indian artists</p> */}
        <div className="h-full bg-indigo-50">
        <div className="container mx-auto py-16" >
            <div className='grid grid-cols-3 h-full'>
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                    <div className=" py-10 pb-3 mt-72 h-4/6 relative bg-green-100 group hover:bg-green-200 cursor-pointer transition ease-out duration-300"> 
                        <div>
                            <div className="w-4 h-1/5 bg-red-50	absolute right-0 -top-48 bg-green-100 group-hover:bg-green-50"></div>
                            <img src="https://chairish-prod.freetls.fastly.net/image/product/master/95da1a5a-0065-41c4-99c8-4b129de30cd9/blossoming-flowers-original-artwork-by-katharina-husslein-1391" alt="https://www.pngegg.com/en/png-nllal/download" />
                        </div>
                        <div className="px-7 mt-10 mb-24">
                            <h1 className="text-3xl font-bold group-hover:text-green-400 transition ease-out duration-300">Curation of Top Art</h1>
                            <p className="mt-2 opacity-60 group-hover:opacity-70 ">Diverse collection of roof lights of quality</p>
                        </div>
                    </div>
                </div>
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                    <div className=" py-10  pb-3 mt-32 h-4/6 relative bg-indigo-100 group hover:bg-indigo-200 cursor-pointer transition ease-out duration-300"> 
                        <div>
                            {/* <div className="w-4 h-1/5 bg-red-50	absolute right-0 bg-indigo-100  group-hover:bg-indigo-50"></div> */}
                            <img src="https://www.iartgallery.in/cdn/shop/products/image_898fdec5-1574-48b0-89c8-d834d5f86421_grande.png" alt="https://www.pngegg.com/en/png-zquqj/download" />
                        </div>
                       <div className="px-7 mt-10 mb-24">
                            <h1 className="text-3xl font-bold group-hover:text-indigo-400 transition ease-out duration-300 hover:custom-hover-effect">100% Authentic</h1>
                            <p className="mt-2 opacity-60 group-hover:opacity-70 ">Comfortable collection of perfect lounge chairs</p>
                        </div>
                    </div>
                </div>
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                    <div className=" py-10 pb-3 mt-5 h-4/6 relative bg-pink-100 group hover:bg-pink-200 cursor-pointer transition ease-out duration-300"> 
                         <div>
                            <div className="w-4 h-1/5 bg-pink-5 absolute right-0 -bottom-44 bg-pink-100 group-hover:bg-pink-50"></div>
                            <img src="https://chairish-prod.freetls.fastly.net/image/product/sized/6783c173-e63a-4ee5-a467-44c483b46e96/contemporary-original-abstract-mixed-media-painting-0270" alt="https://www.pngegg.com/en/png-epwii/download" />
                        </div>
                        <div className="px-7 mt-10 mb-24">
                            <h1 className="text-3xl font-bold group-hover:text-pink-400 transition ease-out duration-300">Commission Arts</h1>
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