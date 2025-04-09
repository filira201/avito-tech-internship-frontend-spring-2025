import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Ошибка 404</h1>
      <h2>Страница не найдена</h2>

      <button onClick={() => navigate("/boards")}>Доски</button>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default NotFoundPage;
