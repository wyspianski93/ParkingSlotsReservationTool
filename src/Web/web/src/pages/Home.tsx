import { Link } from "react-router-dom";

export function Home(): JSX.Element {
  return (
    <>
      <div>Home</div>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </>
  );
}
