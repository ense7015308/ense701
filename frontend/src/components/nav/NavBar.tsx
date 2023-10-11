import React, { ReactNode } from "react"; // Import ReactNode type from 'react'
import styles from "./Nav.module.scss";

type Props = {
  children?: ReactNode; // Use ReactNode type here
};

const NavBar = ({ children }: Props) => {
  return <nav className={styles.navbar}>{children}</nav>;
};

export default NavBar;
