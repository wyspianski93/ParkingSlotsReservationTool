import { Link } from "react-router-dom";

export function Dashboard(): JSX.Element {
  return (
    <>
      <div>Dashboard</div>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </>
  );
}
