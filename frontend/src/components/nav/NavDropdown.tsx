import React, {ReactNode} from "react";
import styles from "./Nav.module.scss";

type Props = {
  children?: ReactNode;
};

const NavDropdown = ({ children }: Props) => {
  return <div className={styles.dropdown_container}>{children}</div>;
};

export default NavDropdown;
