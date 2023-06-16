
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import Nav from '../components/Layout/Nav'


export default function PageLayout({ children }) {

    return (
        <div className='sm:w-[1400px]  lg:w-[1400px] md:w-[1400px]  m-auto'>
            <Nav />
            {/* <Header /> */}
            {children}
            <Footer />
        </div>
    )
}
