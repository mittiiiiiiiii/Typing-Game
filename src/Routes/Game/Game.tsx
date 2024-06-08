import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {Container, Background, Header, BlackBoxContainer} from '../../utils/CommonComponents'

const symbols: string[]=['@','#','$','%','&','*','!','?','+','=','<','>','/','\\','|','^','~','`','_','-','(',')','{','}','[',']','.',',',';',':','"',"'",'0','1','2','3','4','5','6','7','8','9'];

//Propsの型定義
type GameProps = {
    gameStarted: boolean;
};

//コンポーネント定義
const Game: React.FC<GameProps> = ({ gameStarted }) => {
    const navigate=useNavigate();
    const [currentSymbol,setCurrentSymbol]=useState<string>('');
    const [questionCount,setQuestionCount]=useState<number>(0);
    const [correctCount,setCorrectCount]=useState<number>(0);
    const [mistypeCount,setMistypeCount]=useState<number>(0);
    const [elapsedTime,setElapsedTime]=useState<number>(0);

    //不正なアクセスをブロック
    useEffect(() => {
        if (!gameStarted) {
        navigate('/');
        }
    },[gameStarted,navigate]);

    //ゲーム開始時の処理
    useEffect(() => {
        const start: Date=new Date();
        const newTimer: NodeJS.Timeout=setInterval(() => {
                const now: Date=new Date();
                setElapsedTime(Math.floor((now.getTime() - start.getTime())/1000));
            }, 1000);
        return () => clearInterval(newTimer);
    },[]);

    //ランダムな記号を選択
    useEffect(() => {
        setCurrentSymbol(symbols[Math.floor(Math.random()*symbols.length)]);
    },[questionCount]);

    //キーイベントのハンドラー
    const handleKeyPress=useCallback((event: KeyboardEvent) => {
        if (event.key===currentSymbol) {
            setCorrectCount(correctCount+1);
        if (questionCount<9) {
            setQuestionCount(questionCount+1);
        } else if (questionCount===9) {
            const totalTime: number=elapsedTime;
            const accuracy: number=(((correctCount+1)/(correctCount+mistypeCount+1))*100);
            const averageKeystrokes: number=totalTime/(correctCount+mistypeCount+1);
            navigate('/result', {
            state: {
                elapsedTime: totalTime,
                correctCount: correctCount+1,
                mistypeCount: mistypeCount,
                accuracy: accuracy.toFixed(2),
                averageKeystrokes: averageKeystrokes.toFixed(2),
            }
            });
        }
        } else {
            setMistypeCount(mistypeCount+1);
        }
    },[currentSymbol,correctCount,mistypeCount,questionCount,navigate,elapsedTime]);

    //キーイベントのリスナーを追加するためのuseEffect
    useEffect(() => {
        window.addEventListener('keypress',handleKeyPress as () => KeyboardEvent);
        return () => {
            window.removeEventListener('keypress',handleKeyPress as () => KeyboardEvent);
        };
    },[handleKeyPress]);

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
                            <InstructionText>表示された数字または記号のキーを押してください</InstructionText>
                            <SymbolDisplay data-testid="current-symbol">{currentSymbol}</SymbolDisplay>
                            <QuestionStats>問題数: {questionCount}<br/><br/><br/>
                            <span data-testid="correct-count">正解数: {correctCount}</span></QuestionStats>
                            <ReturnButton onClick={handlePlayButtonClick as () => void}>タイトルに戻る</ReturnButton>
                        </BlackBoxContainer>
                </Container>
        </>
    );
};

export default Game;

//グローバルスタイルを追加
export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
`;

const InstructionText = styled.div`
    width: 435px;
    height: 19px;
    position: absolute;
    left: 132px;
    top: 70px;
    text-align: center;
    color: white;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    word-wrap: break-word;
`;

const ReturnButton = styled.div`
    width: 138px;
    height: 32px;
    position: absolute;
    left: 281px;
    top: 412px;
    background: #008000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    cursor: pointer; //ボタンとしての視覚的なフィードバック
`;

const SymbolDisplay = styled.div`
    width: 154px;
    height: 110px;
    position: absolute;
    left: 273px;
    top: 187px;
    text-align: center;
    color: white;
    font-size: 90px;
    font-family: Arial;
    font-weight: 400;
    word-wrap: break-word;
`;

const QuestionStats = styled.div`
    width: 91px;
    height: 92px;
    position: absolute;
    left: 67px;
    top: 352px;
    color: white;
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    word-wrap: break-word;
`;