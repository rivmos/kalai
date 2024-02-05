import React, {useEffect} from "react"
import { getHome, useAppSelector } from "../../store"
import { injectReducer, useAppDispatch } from "@/store"
import { ReviewSectionDataState } from "@/views/web/types/types"
export default function TestimonialContent({data} : {data: ReviewSectionDataState}) {
    return (
        <>
            <div className="txt-box">
                <svg xmlns="http://www.w3.org/2000/svg" height="320" viewBox="0 0 331 320" width="331"><path d="m321.8 300.26.23.44c1.7 3.36 3.35 6.8 4.97 10.33l3.66-1.63-.46 10.06-7.76-6.4 3.64-1.62-.6-1.32a328.58 328.58 0 0 0-4.34-8.97l-.22-.44zm-11.68-21 .26.42c2.06 3.36 4.07 6.83 6.05 10.4l.24.43-.88.48-.24-.43c-1.96-3.56-3.97-7-6.03-10.36l-.26-.42zm-13.62-19.83.3.4c2.4 3.13 4.75 6.38 7.05 9.75l.28.41-.83.56-.28-.4c-2.29-3.36-4.62-6.6-7-9.72l-.31-.4zm-15.78-18.15.35.36c2.78 2.82 5.5 5.77 8.16 8.85l.32.38-.75.65-.33-.38c-2.65-3.06-5.35-6-8.11-8.8L280 242zm-18.15-15.82.4.3a155.7 155.7 0 0 1 9.34 7.6l.38.33-.66.75-.38-.33a154.7 154.7 0 0 0-9.28-7.55l-.4-.3zM31.7 220.61l.48.14c3.6 1 7.5 1.63 11.74 1.88l.5.03-.06 1-.5-.03c-4.3-.25-8.29-.9-11.95-1.92l-.48-.13zm36.47.04.18.98-.49.1c-4.17.79-8.15 1.35-11.93 1.68l-.5.04-.09-1 .5-.04c3.75-.32 7.7-.88 11.83-1.67zm174.01-7.9.44.22c3.56 1.83 7.04 3.83 10.46 5.98l.43.26-.53.85-.43-.27c-3.4-2.13-6.86-4.11-10.38-5.93l-.45-.23zm-150.9 1.7.31.95-.47.16a214.1 214.1 0 0 1-11.53 3.46l-.48.13-.26-.97.48-.13c3.7-1 7.52-2.14 11.47-3.44zm-78.95-6.76.3.4a35.39 35.39 0 0 0 8.75 7.9l.42.28-.54.84-.42-.27a36.39 36.39 0 0 1-8.98-8.14l-.31-.39zm101.77-.78.29.96-.48.14a302.07 302.07 0 0 0-11.42 3.61l-.48.16-.32-.94.48-.16c3.85-1.3 7.67-2.52 11.45-3.63zm105.75-3.2.48.15c3.84 1.2 7.62 2.55 11.34 4.06l.46.2-.38.92-.46-.2c-3.69-1.5-7.44-2.84-11.26-4.02l-.48-.15zm-82.4-2.51.2.98-.49.1c-3.85.75-7.75 1.62-11.69 2.6l-.48.11-.25-.97.49-.12c3.96-.98 7.87-1.85 11.74-2.6zm58.84-2.54.5.06c4 .54 7.96 1.23 11.85 2.07l.5.1-.22.99-.49-.11c-3.86-.84-7.79-1.53-11.78-2.06l-.5-.06zm-35-.75.09 1-.5.04c-3.92.32-7.88.76-11.9 1.33l-.5.07-.13-1 .5-.06c4.03-.57 8.01-1.02 11.95-1.34zm23.46-.31.5.03-.06 1-.5-.03c-3.92-.22-7.91-.3-11.96-.23h-.5l-.01-1h.5c4.07-.07 8.08.01 12.03.23zM3.22 185.85l.1.49a61.27 61.27 0 0 0 3.36 11.41l.19.47-.92.38-.2-.46a62.26 62.26 0 0 1-3.41-11.61l-.1-.5zM.7 162.12l1 .03-.02.5c-.12 4.2-.07 8.19.17 11.95l.03.5-1 .06-.03-.5c-.24-3.8-.3-7.8-.17-12.04zm2.4-23.96.98.15-.08.5c-.63 4.1-1.14 8.07-1.52 11.87l-.05.5-1-.1.06-.5c.38-3.82.89-7.8 1.53-11.92zm4.65-23.6.98.23-.12.49c-.93 4.02-1.78 7.92-2.52 11.71l-.1.5-.98-.2.1-.49c.75-3.8 1.59-7.72 2.53-11.75zm6.13-23.25.96.27-.14.48a499.5 499.5 0 0 0-3.2 11.56l-.12.48-.96-.25.12-.49c1-3.77 2.06-7.63 3.2-11.57zm7.16-22.96.95.32-.16.47c-1.28 3.88-2.5 7.69-3.67 11.42l-.15.47-.95-.3.14-.47c1.17-3.74 2.4-7.55 3.68-11.43zm7.92-22.68.94.34-.17.47c-1.4 3.82-2.74 7.59-4.03 11.3l-.16.46-.95-.33.17-.47c1.29-3.7 2.64-7.47 4.03-11.3zm8.53-22.48.93.37-.18.46a1057.6 1057.6 0 0 0-4.31 11.2l-.18.46-.94-.36.18-.46c1.4-3.68 2.84-7.42 4.32-11.2zm9-22.26.93.39-.2.46a1276.5 1276.5 0 0 0-4.54 11.1l-.19.46-.92-.37.18-.47c1.48-3.65 3-7.35 4.55-11.1z"/></svg>
                <div className="start-ancor-box">
                    <div className="start-box">
                        <img src="/img/web/start-image.png" alt="" />
                        <span>{data.heading}</span>
                    </div>
                    <div className="viewall-sec">
                        <div className="img-boxx">
                            {data.cards.map(cards => (
                                <img key={cards.id} src={cards.image} alt="" />
                            ))}
                            
                        </div>
                        <a href={data.buttonLink}><span>{data.buttonText}</span> <img src="/img/web/icons/btn-right-arrow.png" alt="" /></a>
                    </div>
                </div>
            </div>
        </>

    )
}