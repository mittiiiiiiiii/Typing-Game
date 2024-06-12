import React from 'react';
import { render,screen,fireEvent,waitFor } from '@testing-library/react';
import { MemoryRouter,Route,Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Result from './Result';
import Game from '../Game/index';
import Start from '../Start/index'

//テスト用の初期データ
const initialState = {
    elapsedTime: "00:14:26",
    correctCount: 10,
    averageKeystrokes: 0.7,
    mistypeCount: 4,
    accuracy: 71.43,
};

describe('Result コンポーネント',() => {
    test('期待されたテキストで正しくレンダリングされる',() => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/result', state: initialState }]}>
                <Result gameStarted={true} />
            </MemoryRouter>
        );

        //Headerのテキストをテスト
        const headerLabel = screen.getByTestId('header-label');
        expect(headerLabel).toBeInTheDocument();
        expect(headerLabel).toBeVisible();
        expect(headerLabel).toHaveTextContent('NS-TYPING');

        //経過時間、正しく打ったキーの数、平均キータイプ数、ミスタイプ数、正確率のテキストをテスト
        expect(screen.getByText(/経過時間:/)).toBeInTheDocument();
        expect(screen.getByText(/正しく打ったキーの数:/)).toBeInTheDocument();
        expect(screen.getByText(/平均キータイプ数:/)).toBeInTheDocument();
        expect(screen.getByText(/回\/秒/)).toBeInTheDocument();
        expect(screen.getByText(/ミスタイプ数:/)).toBeInTheDocument();
        expect(screen.getByText(/正確率:/)).toBeInTheDocument();
        expect(screen.getByText(/%$/)).toBeInTheDocument();
    });

    test('リターンボタンが存在するか',() => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/result', state: initialState }]}>
            <Result gameStarted={true} />
            </MemoryRouter>
        );

        const returnButton = screen.getByText('タイトルに戻る');
        expect(returnButton).toBeInTheDocument();
        expect(returnButton).toBeVisible();
    });

    test('「タイトルに戻る」ボタンで Start に遷移する',async () => {
        const mockSetGameStarted = jest.fn();

        render(
            <MemoryRouter initialEntries={['/game']}>
                <Routes>
                <Route path="/" element={<Start setGameStarted={mockSetGameStarted} />} />
                    <Route path="/game" element={<Game gameStarted={true} />} />
                    <Route path="/result" element={<Result gameStarted={true} />} />
                </Routes>
            </MemoryRouter>
        );

        for (let i=0;i<10;i++){
            const currentSymbol=screen.getByTestId('current-symbol').textContent;
            fireEvent.keyPress(screen.getByTestId('current-symbol'), { key: currentSymbol });
        }

        //Result コンポーネントに遷移後の表示を確認
        await waitFor(() => {
            expect(screen.getByText('結果')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('タイトルに戻る'));

        await waitFor(() => {
            expect(screen.getByText('数字・記号専用のタイピング練習ゲーム')).toBeInTheDocument();
        });
    });
});