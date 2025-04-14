import { FC } from "react";
import { useNavigate } from "react-router";
import styles from "./errorPage.module.css";
import Button from "../ui/Button/Button";

interface ErrorPageProps {
  error: unknown;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  const navigate = useNavigate();

  let errorMessage = "Произошла неизвестная ошибка";

  if (typeof error === "object" && error !== null) {
    if ("status" in error) {
      errorMessage = `Ошибка ${error.status}`;
    } else if ("message" in error) {
      errorMessage = error.message as string;
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Что-то пошло не так. {errorMessage}</h1>
      <div className={styles.buttonsContainer}>
        <Button variant="secondary" size="large" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button size="large" onClick={() => navigate("/")}>
          Главная
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
