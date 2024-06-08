import React, { useState }  from 'react';
import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom';
import Start from '../Routes/Start/index';
import Game from '../Routes/Game/index';
import Result from '../Routes/Result/index';

const App: React.FC = () =>  {
    const [gameStarted,setGameStarted]=useState<boolean>(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start setGameStarted={setGameStarted} />} />
                <Route path="/game" element={<Game gameStarted={gameStarted} />} />
                <Route path="/result" element={<Result gameStarted={gameStarted} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;