
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import Nav from '../components/Layout/Nav'


export default function PageLayout({ children }) {

    return (
        <div className='sm:w-[1400px] scroll-smooth lg:w-[1400px] md:w-[1400px] bg-[#e5e7eb] m-auto'>
            <Nav />
            {/* <Header /> */}
            {children}
            <Footer />
        </div>
    )
}
