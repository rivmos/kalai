import {
    HiOutlineChartSquareBar,
    HiOutlineUserGroup,
    HiOutlineTrendingUp,
    HiOutlineUserCircle,
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineShieldCheck,
    HiOutlineColorSwatch,
    HiOutlineChatAlt,
    HiOutlineDesktopComputer,
    HiOutlinePaperAirplane,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiOutlineKey,
    HiOutlineBan,
    HiOutlineHand,
    HiOutlineDocumentText,
     HiOutlineStar,
    HiOutlineTemplate,
    HiOutlineLockClosed,
    HiOutlineDocumentDuplicate,
    HiOutlineViewGridAdd,
    HiOutlineShare,
    HiOutlineVariable,
    HiShoppingCart,
    HiOutlineCode,
} from 'react-icons/hi'
import { LuShoppingCart } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    // home: <HiOutlineDesktopComputer />,
    services: <HiOutlineUserGroup />,
    engines: <HiOutlineTrendingUp />,
    company: <HiOutlineUserCircle />,
    catalogue: <HiOutlineBookOpen />,
    user: <HiOutlineCurrencyDollar />,
    dashboard: <HiOutlineDesktopComputer/>,
    podsandpodjinn: <HiOutlineUserGroup/>,
    projects: <HiOutlineDocumentText/>,
    commcenter: <HiOutlineChatAlt/>,
    pipeline: <HiOutlineColorSwatch />,
    bidmanagement: <HiOutlineChartPie />,
    anm: <HiOutlineTrendingUp />,
    rna: <HiOutlineDocumentText />,
    paymentin:<BsCashCoin />,
    paymentout:<BsCashCoin />,
    rating: <HiOutlineStar />,
    account: <HiOutlineUserCircle />,
}

export default navigationIcon
