import Image from "next/image";
import styles from "./page.module.css";
import '../../src/app/assets/styles/common/Common.scss';
import UserHome from "./views/home/UserHome";
import MainUserLayout from "./layouts/admin/user/MainUserLayout";

export default function Home() {
  return (
    <MainUserLayout>
      <UserHome />
    </MainUserLayout>
  );
}
