import { Link } from "react-router-dom";
import './header.css'
function Header() {
  return(
    <header>
      <Link className="logo" to="/">Movies Flix</Link>
      <Link className="favorites" to="/favorites">My favorites</Link>
    </header>
  );
}

export default Header;