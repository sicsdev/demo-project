
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'


export default function PageLayout({ children }) {

    return (
        <div className='sm:w-[1400px]  lg:w-[1400px] md:w-[1400px]  m-auto'>
            <Header /> {children}<Footer />
        </div>
    )
}
