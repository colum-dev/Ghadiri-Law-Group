import "./page.module.css";
import '../../src/app/assets/styles/common/Common.scss';
import UserHome from "./views/home/UserHome";
import MainUserLayout from "./layouts/admin/user/MainUserLayout";
import { getPublicAbout, getPublicHero, getPublicHome, getPublicBlogPosts } from "./utilities/serverApi";
import { toCardArticle } from "./utilities/blog";

export default async function Home() {
  const [hero, about, content, blogs] = await Promise.all([getPublicHero('home'), getPublicAbout(), getPublicHome(), getPublicBlogPosts({ limit: 6 })]);
  return (
    <MainUserLayout>
      <UserHome hero={hero} about={about} content={content} blogs={(blogs?.items || []).map(toCardArticle)} />
    </MainUserLayout>
  );
}
