
export type BannerDataState = {
    largeHeading: string
    subHeading: string
    btnText: string
    btnLink: string
    image: string
}
export type OfferDataCards = {
    id: number,
    title: string,
    description: string,
    image: string,
    path: string
}
export type VideoDataState = {
    heading: string,
    largeHeading: string,
    videoLink: string
    image: string
}
export type OfferDataState = {
    heading: string,
    largeHeading: string,
    subHeading: string,
    btnText: string,
    btnLink: null | string,
    cards: OfferDataCards[]
}
export type FeatureCardState = {
    id: number
    title: string
    description: string
    image: string
    path?: string
}
export type FeatureDataState = {
    heading: string,
    subHeading: string,
    largeHeading: string,
    featureCards: FeatureCardState[]
}

export type CampaignCardState = {
    id: number
    title: string
    upto: string
    subTitle: string
    imgLink: string
    tags: string[]
}

export type CampaignDataState = {
    sectionName: string,
    heading: string,
    subHeading: string,
    cardLink: string,
    campaignCards: CampaignCardState[]
}

export type ProjectManagementCardState = {
    id: number,
    title: string,
    heading: string,
    subHeading: string,
    image: string
}

export type ProjectManagementDataState = {
    heading: string,
    sub_heading: string,
    buttonText: string,
    buttonLink: string,
    cards: ProjectManagementCardState[]
}

export type ReviewSectionCardState = {
    id: number,
    testimonial: string,
    name: string,
    position: string,
    image: string,
}

export type ReviewSectionDataState = {
    heading: string,
    buttonText: string,
    buttonLink: string,
    cards: ReviewSectionCardState[]
}

export type ContactDataState = {
    title: string,
    message: string,
    phoneNumber: string,
    buttonText: string,
    buttonLink: string
}

export type HomePageState = {
    banner?: BannerDataState,
    offer?: OfferDataState,
    campaign?: CampaignDataState,
    Features?: FeatureDataState,
    video?: VideoDataState
    projectManagement?: ProjectManagementDataState,
    reviewSection?: ReviewSectionDataState
    contacts?: ContactDataState
}
