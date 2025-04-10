import { links } from "../../lib/constants";
import NavItem from "../NavItem/NavItem";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <NavItem key={index} to={link.href}>
            {link.name}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
