"use client";

import { useEffect, useState } from "react";
// import { Container, Row, Col } from "react-grid-system";

export default function Home() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.alunos);
        setAlunos(data.alunos);
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
        {alunos.map((aluno, index) => {
          return <li key={index}>{aluno.name}</li>;
        })}
      </ul>
    </main>
  );
}
