import styled from "styled-components";
import fingerPng from "./imgs/finger.png";
import { mainStyle } from "./Globalstyled";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Container = styled.section`
  width: 100%;
  padding: ${mainStyle.pcPadding};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Link)`
  font-size: 46px;
  font-weight: 900;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const ImgBox = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin-bottom: 30px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const ExImg = styled.div`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 400px;
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  justify-content: space-between;
  input {
    all: unset;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #b1b1b1;
    padding: 10px;
    font-size: 20px;
    margin-right: 20px;
  }

  button {
    all: unset;
    background-color: black;
    padding: 0 20px;
    width: 100px;
    height: 50px;
    text-align: center;
    color: white;
    font-weight: 300;
    letter-spacing: 0.5px;
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
  width: 400px;
  height: 400px;
`;

const Feedbackmsg = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  p {
    margin-bottom: 10px;
  }
`;

const Main = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (inputValue) {
      setLoading(true);
      setTimeout(() => {
        setImgUrl(inputValue);
        setIsGenerated(true);
        setLoading(false);
      }, 2000);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Title to="/">Middle finger up to..</Title>
      <ImgBox>
        <PngFinger />
        {imgUrl && <ExImg imgUrl={imgUrl} />}
      </ImgBox>
      {!isGenerated ? (
        <Form onSubmit={SubmitHandler}>
          <input type="text" placeholder="Enter your img url" />
          <button type="submit">Generate</button>
        </Form>
      ) : (
        <Feedbackmsg>
          <p>Done! Press the photo for download</p>
          <p>DON'T BE TOO MEAN TO PEOPLE</p>
        </Feedbackmsg>
      )}
    </Container>
  );
};

export default Main;
