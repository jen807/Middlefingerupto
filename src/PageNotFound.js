import styled from "styled-components";
import fingerPng from "./imgs/finger.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 300px;
  font-size: 30px;
  line-height: 40px;

  p {
    color: red;
    cursor: pointer;
  }
`;

const PngFinger = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(${fingerPng});
  background-size: contain;
  background-repeat: no-repeat;
  width: 700px;
  height: 700px;
`;

const PageNotFound = () => {
  return (
    <Container>
      Ayo why are you here.
      <Link to="/">
        <p>go back!</p>
      </Link>
      <PngFinger />
    </Container>
  );
};

export default PageNotFound;
