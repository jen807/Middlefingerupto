import styled from "styled-components";
import fingerPng from "./imgs/finger.png";
import { mainStyle } from "./Globalstyled";
import { useState, useRef } from "react";
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
`;

const PngFinger = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(${fingerPng});
  background-size: contain; /* 이미지 크기를 유지하면서 최대한 맞춤 */
  background-repeat: no-repeat;
  background-position: center;
  width: 400px;
  height: 400px;
  z-index: 1; /* 사용자 이미지보다 위에 오도록 설정 */
`;

const ExImg = styled.div`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 400px;
  z-index: 0; /* 배경보다 아래로 설정 */
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
    margin-top: 10px;
    cursor: pointer;
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
`;

const Button = styled.button`
  all: unset;
  background-color: black;
  padding: 0 20px;
  width: 100px;
  height: 50px;
  text-align: center;
  color: white;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-top: 10px;
  cursor: pointer;
  margin-right: 10px;
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

    if (textValue) {
      setLoading(true);
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

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const baseImage = new Image();
    baseImage.src = fingerPng;

    baseImage.onload = () => {
      ctx.drawImage(baseImage, 0, 0, 400, 400);

      if (imgUrl) {
        const overlayImage = new Image();
        overlayImage.src = imgUrl;

        overlayImage.onload = () => {
          ctx.drawImage(overlayImage, 0, 0, 400, 400);

          const link = document.createElement("a");
          link.download = "generated-image.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
      }
    };
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Title to="/" onClick={resetState}>
        Middle finger up to..
      </Title>
      <ImgBox>
        <PngFinger /> {/* 항상 finger.png 표시 */}
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
          <Button onClick={downloadImage}>Save</Button>
          <Button to="/" onClick={resetState}>
            Go back
          </Button>
        </Feedbackmsg>
      )}
      <Canvas ref={canvasRef} width="400" height="400" />
    </Container>
  );
};

export default Main;
