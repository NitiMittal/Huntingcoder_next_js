import React from 'react';
import Link from "next/link";
import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <nav >
    <ul className={styles.mainnav}>
    <Link href="/"><a><li> Home</li></a></Link>  
    <Link href="/about"><a><li> About</li></a></Link>  
    <Link href="/blogs"><a><li> Blogs</li></a></Link>  
    <Link href="/contact"><a><li> Contact</li></a></Link>  
    </ul>
  </nav>
  )
}

export default Navbar