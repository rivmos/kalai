import Tabs from '@/components/ui/Tabs'
import { ProjectManagementDataState } from '@/views/web/types/types'

const { TabNav, TabList, TabContent } = Tabs
export default function HomeTab({ data }: { data: ProjectManagementDataState }) {
    return (
        <div className='management-tab-sec'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Tabs defaultValue="tab1">
                            <TabList>
                                {data.cards.map((card, index) => {
                                    return (
                                        <TabNav key={index} value={`tab${index + 1}`}>
                                           {card.title}
                                        </TabNav>
                                    )
                                })}
                            </TabList>
                            <div className="management-tabing-sec">
                                {data.cards.map((card, index) => {
                                    return (
                                        <TabContent key={index} value={`tab${index + 1}`}>
                                            <h3>{card.heading}</h3>
                                            <p>{card.subHeading}</p>
                                            <img src={card.image} alt="" />
                                        </TabContent>
                                    )
                                })}
                            </div>
                        </Tabs>
                    </div>
                    <div className="col-md-6">
                        <div className='headd-secc'>
                            <h2>{data.heading}</h2>
                            <p>{data.sub_heading}</p>
                            <a href={data.buttonLink} className='btn'>{data.buttonText} <img src="/img/web/icons/btn-right-arrow.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
