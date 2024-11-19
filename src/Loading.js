import styled from "styled-components";
import { PacmanLoader } from "react-spinners";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <PacmanLoader color="black" />
    </Container>
  );
};

export default Loading;
