import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, email, phone, desc };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/api/postcontact/", requestOptions)
      .then((response) => response.text())
      .then((data) => alert("Thanks for contacting us"));

    setUsername("");
    setEmail("");
    setPhone("");
    setDesc("");
  };
  return (
    <div className={styles.container}>
      {/* <main className={styles.main}> */}
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formLabel}>
            Enter your name
          </label>
          <input
            required
            type="text"
            className={styles.formControl}
            id="name"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formLabel}>
            Email address
          </label>
          <input
            type="email"
            className={styles.formControl}
            id="email"
            aria-describedby="emailHelp"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formLabel}>
            Phone Number
          </label>
          <input
            type="phone"
            required
            className={styles.formControl}
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="desc" required className={styles.formLabel}>
            Concerns
          </label>
          <textarea
            className={styles.formControl}
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <input
          type="button"
          className={styles.btn}
          disabled={
            username === "" || email === "" || phone === "" || desc === ""
          }
          value="Submit"
        ></input>
      </form>
      {/* </main> */}
    </div>
  );
};

export default Contact;
