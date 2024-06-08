import React from 'react';
import { render,screen,fireEvent,waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Start from './index';
import Game from '../Game/index';

describe('Start コンポーネント',() => {
    test('期待されたテキストで正しくレンダリングされる',() => {
        render(<Router><Start /></Router>);

        //Header のテキストをテスト
        const headerLabel=screen.getByTestId('header-label');
        expect(headerLabel).toBeInTheDocument();
        expect(headerLabel).toBeVisible();
        expect(headerLabel).toHaveTextContent('NS-TYPING');

        //Title のテキストをテスト
        const titleLabel=screen.getByTestId('title-label');
        expect(titleLabel).toBeInTheDocument();
        expect(titleLabel).toBeVisible();
        expect(titleLabel).toHaveTextContent('NS-TYPING');

        //Description のテキストをテスト
        const descriptionText=screen.getByText('数字・記号専用のタイピング練習ゲーム');
        expect(descriptionText).toBeInTheDocument();
        expect(descriptionText).toBeVisible();
    });
    test('プレイボタンが存在するか',() => {
        render(<Router><Start /></Router>);

        const playButton = screen.getByText('プレイする');
        expect(playButton).toBeInTheDocument();
        expect(playButton).toBeVisible();
    });

    test('プレイボタンのクリックで Game に遷移する',async () => {
        //setGameStartedのモック関数を作成
        const mockSetGameStarted = jest.fn();

        render(
            <Router>
                <Start setGameStarted={mockSetGameStarted} />
                <Game />
            </Router>
        );

        const playButton=screen.getByText('プレイする');
        fireEvent.click(playButton);

        //Game コンポーネントの特定の要素が表示されるまで待機
        await waitFor(() => {
            const gameInstructionText=screen.getByText('表示された数字または記号のキーを押してください');
            expect(gameInstructionText).toBeInTheDocument();
        });

        //setGameStartedが呼ばれたかを検証
        expect(mockSetGameStarted).toHaveBeenCalledWith(true);
    });
});