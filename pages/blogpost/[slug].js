import React, { useState } from "react";

import styles from "../../styles/BlogPost.module.css";
import * as fs from "fs";

const Slug = (props) => {
  const [data] = useState(props.blog);

  const createMarkup = (c) => {
    return { __html: c };
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{data && data.title}</h1>
        {data && (
          <div dangerouslySetInnerHTML={createMarkup(data.content)}></div>
        )}
        <hr />
      </main>
    </div>
  );
};

// Used for server side generation

// export async function getServerSideProps(context) {
//   let { slug } = context.query;

//   const data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   const blog = await data.json();

//   return {
//     props: { blog }, // will be passed to the page component as props
//   };
// }

// Used for static site generation

//The below function will tell how many pages needs to be generated

export async function getStaticPaths() {
  let blogData = await fs.promises.readdir(`blogdata`);
  
  blogData =blogData.map((item)=>{
  return { params: { slug: item.split(".")[0] } }
})

  return {
    paths: blogData,
    fallback: true, // will be passed to the page component as props
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  let blog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  return {
    props: { blog: JSON.parse(blog) }, // will be passed to the page component as props
  };
}
export default Slug;
