"use client";

import { useEffect, useState } from "react";
// import PORT from "../../server/server";

export default function Home() {
  const [message, setMessage] = useState("Loading...");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setPeople(data.people);
      });
  }, []);

  return (
    <main>
      <h2>{message}</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    </main>
  );
}
