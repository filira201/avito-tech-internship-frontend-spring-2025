import { useParams } from "react-router";

const BoardPage = () => {
  const { id } = useParams();

  return <div>BoardPage ID: {id}</div>;
};

export default BoardPage;
