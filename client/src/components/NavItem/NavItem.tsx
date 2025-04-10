import { FC, ReactNode } from "react";
import { NavLink } from "react-router";
import classNames from "classnames";
import styles from "./navItem.module.css";

interface NavItemProps {
  to: string;
  children: ReactNode;
}

const NavItem: FC<NavItemProps> = ({ to, children }) => {
  return (
    <li className={styles.listItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(styles.link, {
            [styles.active]: isActive,
          })
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
