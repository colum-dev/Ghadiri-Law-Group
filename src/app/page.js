import Image from "next/image";
import styles from "./page.module.css";
import '../../src/app/assets/styles/common/Common.scss';
import UserHome from "./views/home/UserHome";
import MainUserLayout from "./layouts/admin/user/MainUserLayout";
import { getPublicHero } from "./utilities/serverApi";

export default async function Home() {
  const hero = await getPublicHero('home');

  return (
    <MainUserLayout>
      <UserHome hero={hero} />
    </MainUserLayout>
  );
}
