import Navbar from "../Navbar/Navbar";
import Button from "../ui/Button/Button";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Navbar />
        <Button size="small" onClick={() => console.log("click")}>
          Создать задачу
        </Button>
      </div>
    </header>
  );
};

export default Header;
