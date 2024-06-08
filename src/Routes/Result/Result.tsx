import React ,{ useEffect,useState } from 'react';
import styled,{ createGlobalStyle } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import {Container, Background, Header, BlackBoxContainer} from '../../utils/CommonComponents'

//Propsの型定義
type ResultProps = {
    gameStarted: boolean;
};

type State = {
    elapsedTime: number;
    correctCount: number;
    mistypeCount: number;
    accuracy: number;
    averageKeystrokes: number;
};

//コンポーネント定義
const Result: React.FC<ResultProps> = ({ gameStarted }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState<State>({ elapsedTime: 0,correctCount: 0,mistypeCount: 0,accuracy: 0,averageKeystrokes: 0 });

    //不正なアクセスを禁止する
    useEffect(() => {
        if (!gameStarted||!location.state) {
            navigate('/');
        } else {
            setState(location.state as State);
        }
    },[gameStarted,location.state,navigate]);

    //数値を小数点第一位までに丸める
    const formattedAverageKeystrokes: string=Number(state.averageKeystrokes).toFixed(1);
    const formattedAccuracy: string=Number(state.accuracy).toFixed(1);

    //Startコンポーネントに遷移
    const handlePlayButtonClick = (): void => {
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
                                ・経過時間: <GreenText>{state.elapsedTime}秒<br/></GreenText>
                                ・正しく打ったキーの数: <GreenText>{state.correctCount}<br/></GreenText>
                                ・平均キータイプ数: <GreenText>{formattedAverageKeystrokes}</GreenText>回/秒<br/>
                                ・ミスタイプ数: <GreenText>{state.mistypeCount}<br/></GreenText>
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
export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
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