import BlogSidebar from "../components/Blog/BlogSidebar";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Nav from "../components/Layout/Nav";

export default function PageLayout({ children }) {
  return (
    <div className="sm:w-[1400px]  lg:w-[1400px] md:w-[1400px]  m-auto bg-white">
      <Nav />
      <BlogSidebar>{children}</BlogSidebar>
    </div>
  );
}
