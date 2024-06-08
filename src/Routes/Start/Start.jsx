import React from 'react';
import styled,{ createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// コンポーネント定義
const Start = ({ setGameStarted }) => {
  const navigate=useNavigate();

  //Gameコンポーネントに遷移
  const handlePlayButtonClick = () => {
    setGameStarted(true);
    navigate('/game');
  };

  return (
    <>
      <GlobalStyle />
        <Container>
          <Background/>
            <Header data-testid="header-label">NS-TYPING</Header>
            <BlackBoxContainer>
              <Title data-testid="title-label">NS-TYPING</Title>
              <Description>数字・記号専用のタイピング練習ゲーム</Description>
              <PlayButton onClick={handlePlayButtonClick}>プレイする</PlayButton>
            </BlackBoxContainer>
        </Container>
    </>
  );
};

export default Start;

// グローバルスタイルを追加
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Background = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 150px 200px 0px;
  background-color: rgb(222, 222, 222);
  background-image: linear-gradient(rgb(236, 235, 235) 50%, transparent 50%, transparent);
  background-size: 5px 5px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background: #008000;
  color: white;
  font-size: 70px;
  font-family: Impact;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 3.5px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1);
`;

const BlackBoxContainer = styled.div`
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translateX(-50%);
  background: #1E1E1E;
  border: 10px solid yellow;
`;

const Title = styled.div`
  width: 179px;
  height: 45px;
  position: absolute;
  left: 260px;
  top: 52px;
  color: white;
  font-size: 40px;
  font-family: Impact;
  text-align: center;
`;

const Description = styled.div`
  width: 292px;
  height: 19px;
  position: absolute;
  left: 204px;
  top: 204px;
  color: white;
  font-size: 16px;
  font-family: Arial;
  text-align: center;
`;

const PlayButton = styled.div`
  width: 100px;
  height: 45px;
  position: absolute;
  left: 300px;
  top: 329px;
  background: #008000;
  color: white;
  font-size: 16px;
  font-family: Arial;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;