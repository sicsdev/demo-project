import Article from "@/app/components/ArticleSubLayout/Article";
import "react-toastify/dist/ReactToastify.css";

export default function ArticleLayout({ children }) {
  return (
    <>
      <Article>{children}</Article>
    </>
  );
}
