import React, {useEffect} from 'react'
import { Dialog } from "@/components/ui"
import { useState } from "react"
//import { useGetHomePageDataQuery } from "../store"
import { homePageData } from "@/mock/data/webHomeData"
import { getHome,useAppSelector } from '../store'
import { injectReducer, useAppDispatch } from '@/store'
import { VideoDataState } from '../../types/types'

const Video = ({data} : {data : VideoDataState}) => {
    const [isOpen, setIsOpen] = useState(false)

    const openVideo = () => {
        setIsOpen(true)
    }
    
    const closeVideo = () => {
        setIsOpen(false)
    }
   
    return (
        <div className="video-sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="video-box">
                        <button onClick={openVideo} >Watch Video</button>
                        <img src={data.image} className="video-img" />
                        <img src="/img/web/video-bg.png" className="video-bg" />
                            <Dialog className="video-dialog"  isOpen={isOpen} onClose={closeVideo} onRequestClose={closeVideo} width={1000} height={580}>
                                <video controls autoPlay={true} muted>
                                    {<source
                                        src={data.videoLink}
                                        type="video/mp4"
                                    />}
                                </video>
                            </Dialog>                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>{data.heading}</h4>
                        <h2>{data.largeHeading}</h2>         
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default Video
