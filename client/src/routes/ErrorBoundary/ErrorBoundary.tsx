import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import Button from "../../components/ui/Button/Button";
import styles from "./errorBoundary.module.css";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.titleErrorCode}>Что-то пошло не так</h1>
        {isRouteErrorResponse(error) ? (
          <p className={styles.message}>
            Стасут: {error.status} Текст: {error.statusText}
          </p>
        ) : (
          <p>
            Ошибка:{" "}
            {error instanceof Error && "message" in error
              ? error.message
              : "Неизвестная ошибка"}
          </p>
        )}

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

export default ErrorBoundary;
