import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./appLayout.module.css";
import ModalTask from "../../components/ModalTask/ModalTask";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div id="modals">
          <ModalTask />
        </div>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
