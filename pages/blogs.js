import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Blogs.module.css";
import * as fs from "fs";

// Used for server side rendering

// export async function getServerSideProps() {
//   let data = await fetch("http://localhost:3000/api/blogs");
//   let allBlogs = await data.json();

//   return {
//     props: { allBlogs }, // will be passed to the page component as props
//   };
// }

// Used for static site generation
export async function getStaticProps() {
  let data = await fs.promises.readdir("blogdata");

  let allBlogs = [];
  let myFile;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    myFile = await fs.promises.readFile(`blogdata/${item}`, "utf-8");
    allBlogs.push(JSON.parse(myFile));
  }

  return {
    props: { allBlogs }, // will be passed to the page component as props
  };
}

const Blogs = (props) => {
  const [data] = useState(props.allBlogs);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div key={item.title}>
                <Link href={`/blogpost/${item.slug}`}>
                  <h3 className={styles.blogs}>{item.title}</h3>
                </Link>
                <p className={styles.desc}>{item.metadesc.substr(0, 200)}...</p>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Blogs;
