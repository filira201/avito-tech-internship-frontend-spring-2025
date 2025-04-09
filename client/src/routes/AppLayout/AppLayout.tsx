import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <header>header</header>
      <main>
        <div>
          <Outlet />
        </div>
        <footer>footer</footer>
      </main>
    </>
  );
};

export default AppLayout;
