import { useAppDispatch } from "../../hooks/redux";
import { openModal } from "../../store/reducers/modalSlice";
import Navbar from "../Navbar/Navbar";
import Button from "../ui/Button/Button";
import styles from "./header.module.css";

const Header = () => {
  const dispath = useAppDispatch();

  const handleClick = () => {
    dispath(openModal({ isCreate: true }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Navbar />
        <Button size="small" onClick={handleClick}>
          Создать задачу
        </Button>
      </div>
    </header>
  );
};

export default Header;
