import React ,{useEffect,} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// コンポーネント定義
const Result = ({ gameStarted }) => {
    const navigate=useNavigate();
    const location=useLocation();
    const { elapsedTime=0,correctCount=0,mistypeCount=0,accuracy=0,averageKeystrokes=0 }=location.state;

    //不正なアクセスを禁止する
    useEffect(() => {
        if (!gameStarted || !location.state) {
            navigate('/');
        }
    },[gameStarted,location.state,navigate]);

    // 数値を小数点第一位までに丸める
    const formattedAverageKeystrokes=Number(averageKeystrokes).toFixed(1);
    const formattedAccuracy=Number(accuracy).toFixed(1);

    //Startコンポーネントに遷移
    const handlePlayButtonClick = () => {
        navigate('/');
    };

    return (
        <>
            <GlobalStyle />
                <Container>
                    <Background/>
                        <Header data-testid="header-label">NS-TYPING</Header>
                        <BlackBoxContainer>
                            <ResultTitle>結果</ResultTitle>
                            <TextInfo>
                                ・経過時間: <GreenText>{elapsedTime}秒<br/></GreenText>
                                ・正しく打ったキーの数: <GreenText>{correctCount}<br/></GreenText>
                                ・平均キータイプ数: <GreenText>{formattedAverageKeystrokes}</GreenText>回/秒<br/>
                                ・ミスタイプ数: <GreenText>{mistypeCount}<br/></GreenText>
                                ・正確率: <GreenText>{formattedAccuracy}</GreenText>%
                            </TextInfo>
                            <ReturnButton onClick={handlePlayButtonClick}>タイトルに戻る</ReturnButton>
                        </BlackBoxContainer>
                </Container>
        </>
    );
}

export default Result;

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

const ResultTitle = styled.div`
    width: 173px;
    height: 64px;
    position: absolute;
    left: 263px;
    top: 91px;
    text-align: center;
    color: white;
    font-size: 50px;
    font-family: Arial;
    font-weight: 400;
`;

const ReturnButton = styled.div`
    width: 138px;
    height: 32px;
    position: absolute;
    left: 281px;
    top: 425px;
    background: #008000;
    color: white;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const GreenText = styled.span`
    color: #008000;
`;

const TextInfo = styled.div`
    position: absolute;
    left: 91px;
    top: 205px;
    color: white;
    font-size: 20px;
    font-family: Arial;
    font-weight: 400;
    word-wrap: break-word;
`;