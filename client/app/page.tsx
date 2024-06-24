"use client";

import { useEffect, useState } from "react";
import Curso from "./components/curso";
import Navbar from "./components/navbar";

export default function Home() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCursos(data.data);
      });
  }, []);

  return (
    <main>
      <Navbar />

      <section className="w-10/12 m-auto">
        <div className="px-2">
          <div className="flex -mx-2">
            {cursos.map((curso, index) => {
              return (
                <div key={index} className="w-1/3 px-2">
                  <Curso data={curso} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
