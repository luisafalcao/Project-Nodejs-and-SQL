"use client";

import { useEffect, useState } from "react";
// import { Container, Row, Col } from "react-grid-system";

export default function Home() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/cursos`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cursos);
        setCursos(data.cursos);
      });
  }, []);

  return (
    <main>
      {/* <Container>
        <Row>
          <Col sm={4}>One of three columns</Col>
          <Col sm={4}>One of three columns</Col>
          <Col sm={4}>One of three columns</Col>
        </Row>
      </Container> */}
      <ul>
        {cursos.map((curso, index) => {
          return <li key={index}>{curso.name}</li>;
        })}
      </ul>
    </main>
  );
}
