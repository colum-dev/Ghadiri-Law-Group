import "./page.module.css";
import '../../src/app/assets/styles/common/Common.scss';
import UserHome from "./views/home/UserHome";
import MainUserLayout from "./layouts/admin/user/MainUserLayout";
import { getPublicAbout, getPublicHero, getPublicHome } from "./utilities/serverApi";

export default async function Home() {
  const [hero, about, content] = await Promise.all([getPublicHero('home'), getPublicAbout(), getPublicHome()]);
  return (
    <MainUserLayout>
      <UserHome hero={hero} about={about} content={content} />
    </MainUserLayout>
  );
}
