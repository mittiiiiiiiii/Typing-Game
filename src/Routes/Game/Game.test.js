import React from 'react';
import { render,screen,fireEvent,waitFor } from '@testing-library/react';
import { MemoryRouter,BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Game from './index';
import Start from '../Start/index'
import Result from '../Result/index';

describe('Game コンポーネント',() => {
    test('期待されたテキストで正しくレンダリングされる',() => {
        render(<Router><Game /></Router>);

        //Headerのテキストをテスト
        const headerLabel=screen.getByTestId('header-label');
        expect(headerLabel).toBeInTheDocument();
        expect(headerLabel).toBeVisible();
        expect(headerLabel).toHaveTextContent('NS-TYPING');

        //InstructionTextの存在と内容を確認
        const instructionText = screen.getByText('表示された数字または記号のキーを押してください');
        expect(instructionText).toBeInTheDocument();
        expect(instructionText).toBeVisible();

        //QuestionStatsの存在と内容を確認
        const questionStats=screen.getByText(/問題数:/);
        expect(questionStats).toBeInTheDocument();
        expect(questionStats).toBeVisible();
    });

    test('リターンボタンが存在するか',() => {
        render(<Router><Game /></Router>);

        const playButton=screen.getByText('タイトルに戻る');
        expect(playButton).toBeInTheDocument();
        expect(playButton).toBeVisible();
    });

    test('正しいキーを押すと正解数が増加する',() => {
        render(
            <MemoryRouter>
                <Game gameStarted={true} />
            </MemoryRouter>
        );

        let correctCountElement=screen.getByTestId('correct-count');
        expect(correctCountElement.textContent).toBe('正解数: 0');

        const currentSymbol=screen.getByTestId('current-symbol').textContent;
        fireEvent.keyPress(screen.getByTestId('current-symbol'), { key: currentSymbol });

        expect(correctCountElement.textContent).toBe('正解数: 1');
    });

    test('間違ったキーを押すと正解数が変わらない', () => {
        render(
            <MemoryRouter>
                <Game gameStarted={true} />
            </MemoryRouter>
        );

        let correctCountElement=screen.getByTestId('correct-count');
        expect(correctCountElement.textContent).toBe('正解数: 0');

        fireEvent.keyPress(screen.getByTestId('current-symbol'),{ key: 'wrongKey' });

        expect(correctCountElement.textContent).toBe('正解数: 0');
    });

    test('「タイトルに戻る」ボタンで Start に遷移する',async () => {
        const mockSetGameStarted = jest.fn();

        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Start setGameStarted={mockSetGameStarted} />} />
                    <Route path="/game" element={<Game gameStarted={true} />} />
                </Routes>
            </Router>
        );

        //Game コンポーネントに遷移
        fireEvent.click(screen.getByText('プレイする'));

        fireEvent.click(screen.getByText('タイトルに戻る'));

        await waitFor(() => {
            expect(screen.getByText('数字・記号専用のタイピング練習ゲーム')).toBeInTheDocument();
        });
    });

    test('10回正解後に Result に遷移する',async () => {
        render(
            <MemoryRouter initialEntries={['/game']}>
                <Routes>
                    <Route path="/game" element={<Game gameStarted={true} />} />
                    <Route path="/result" element={<Result gameStarted={true} />} />
                </Routes>
            </MemoryRouter>
        );

        for (let i=0;i<10;i++) {
            const currentSymbol=screen.getByTestId('current-symbol').textContent;
            fireEvent.keyPress(screen.getByTestId('current-symbol'), { key: currentSymbol });
        }

        //Result コンポーネントに遷移後の表示を確認
        await waitFor(() => {
            expect(screen.getByText('結果')).toBeInTheDocument();
        });
    });
});