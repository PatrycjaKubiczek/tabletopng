import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Start</Link>
          </li>
          <li>
            <Link to="/users">Użytkownicy</Link>
          </li>
          <li>
            <Link to="/teams">Zespoły</Link>
          </li>
          <li>
            <Link to="/table">Generator tabel</Link>
          </li>
        </ul>
      </nav>
      <div className="container" style={{ marginTop: "2rem", maxWidth: "80%" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
