import styled from "styled-components";
import fingerPng from "./imgs/finger.png";
import { mainStyle } from "./Globalstyled";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  /* padding: ${mainStyle.pcPadding}; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Link)`
  font-size: 46px;
  font-weight: 900;
  cursor: pointer;
  text-decoration: none;
  color: black;
  text-align: center;
`;

const ImgBox = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin: 30px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  overflow: hidden;

  @media (max-width: 430px) {
    width: 300px;
    height: 300px;
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
  background-position: center;
  width: 400px;
  height: 400px;

  @media (max-width: 430px) {
    width: 300px;
    height: 300px;
  }
`;

const ExImg = styled.div`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 400px;

  @media (max-width: 430px) {
    width: 300px;
    height: 300px;
  }
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  input[type="text"],
  input[type="file"] {
    all: unset;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #b1b1b1;
    padding: 10px;
    font-size: 20px;
    

    @media (max-width: 430px) {
      width: 300px;
      padding: 8px;
    }
  }

  button {
    all: unset;
    background-color: black;
    padding: 0 20px;
    width: 100px;
    height: 50px;
    text-align: center;
    color: white;
    cursor: pointer;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-top: 20px;
  }
`;
const Feedbackmsg = styled.div`
  text-align: center;
  font-size: 26px;
  color: #6d6d6d;
  margin-top: 10px;

  p {
    margin-bottom: 10px;
  }

  p:last-child {
    font-size: 18px; /* DON'T BE TOO MEAN TO PEOPLE 글자 크기 조정 */
  }
`;

const Button = styled.button`
  all: unset;
    background-color: black;
    padding: 0 20px;
    width: 100px;
    height: 50px;
    text-align: center;
    color: white;
    cursor: pointer;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-top: 20px;
    font-size: 20px;
`;

const Canvas = styled.canvas`
  display: none;
`;

const Main = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef();

  const SubmitHandler = (e) => {
    e.preventDefault();
    const textValue = e.target[0].value;
    const fileValue = e.target[1].files[0];

    setLoading(true);
    if (textValue) {
      setTimeout(() => {
        setImgUrl(textValue);
        setIsGenerated(true);
        setLoading(false);
      }, 2000);
    } else if (fileValue) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
        setIsGenerated(true);
        setLoading(false);
      };
      reader.readAsDataURL(fileValue);
    }
  };

  const resetState = () => {
    setImgUrl("");
    setIsGenerated(false);
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Title to="/" onClick={resetState}>
        Middle finger up to..
      </Title>
      <ImgBox>
        <PngFinger />
        {imgUrl && <ExImg imgUrl={imgUrl} />}
      </ImgBox>
      {!isGenerated ? (
        <Form onSubmit={SubmitHandler}>
          <input type="text" placeholder="Enter your img url" />
          <input type="file" accept="image/*" />
          <button type="submit">Generate</button>
        </Form>
      ) : (
        <Feedbackmsg>
          <p>Done!</p>
          <p>DON'T BE TOO MEAN TO PEOPLE</p>
          <Button onClick={resetState}>Go back</Button>
        </Feedbackmsg>
      )}
      <Canvas ref={canvasRef} />
    </Container>
  );
};

export default Main;
