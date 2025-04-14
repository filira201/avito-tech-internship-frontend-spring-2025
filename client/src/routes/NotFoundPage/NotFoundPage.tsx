import { useNavigate } from "react-router";
import styles from "./notFoundPage.module.css";
import Button from "../../components/ui/Button/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.titleErrorCode}>Ошибка 404</h1>
        <h2 className={styles.title}>Страница не найдена</h2>
        <p className={styles.message}>
          Возможно, она была удалена или вы указали неверный адрес
        </p>

        <div className={styles.buttons}>
          <Button variant="secondary" size="large" onClick={() => navigate(-1)}>
            Назад
          </Button>
          <Button size="large" onClick={() => navigate("/")}>
            Главная
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
