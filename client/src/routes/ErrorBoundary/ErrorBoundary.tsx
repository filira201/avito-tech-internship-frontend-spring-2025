import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Что-то пошло не так</h1>
      {isRouteErrorResponse(error) ? (
        <p>
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
      <button onClick={() => navigate("/boards")}>Доски</button>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default ErrorBoundary;
