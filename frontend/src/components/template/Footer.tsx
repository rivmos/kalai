import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import Logo from './Logo'
import { Link } from 'react-router-dom'

export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
}

const FooterContent = () => {
    return (


        <>
            <div className="mx-auto w-full py-8 lg:py-12">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <Logo className='!w-32' />
                            {/* Optionally, add site name next to logo if desired */}
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Explore</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/collections" className="hover:underline">Collections</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/artists" className="hover:underline">Artists</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/exhibitions" className="hover:underline">Exhibitions</Link>
                                </li>
                                <li>
                                    <Link to="/events" className="hover:underline">Events</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Connect</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://instagram.com/kalai" className="hover:underline">Instagram</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://facebook.com/kalai" className="hover:underline">Facebook</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://twitter.com/kalai" className="hover:underline">Twitter</a>
                                </li>
                                <li>
                                    <a href="https://youtube.com/kalai" className="hover:underline">YouTube</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Information</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/terms-conditions" className="hover:underline">Terms & Conditions</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/faq" className="hover:underline">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" className="hover:underline">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Kalai. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Update social media icons and links as needed */}
                    </div>
                </div>
            </div>


        </>

    )
}

export default function Footer({
    pageContainerType = 'contained',
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center ${PAGE_CONTAINER_GUTTER_X}`
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
