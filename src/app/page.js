import styles from "./page.module.css";
import '../../src/app/assets/styles/common/Common.scss';
import UserHome from "./views/home/UserHome";
import MainUserLayout from "./layouts/admin/user/MainUserLayout";
import { getPublicAbout, getPublicHero } from "./utilities/serverApi";

export default async function Home() {
  const [hero, about] = await Promise.all([getPublicHero('home'), getPublicAbout()]);

  return (
    <MainUserLayout>
      <UserHome hero={hero} about={about} />
    </MainUserLayout>
  );
}
