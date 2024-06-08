import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

export const Background = styled.div`
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

export const Header = styled.div`
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
    white-space: nowrap;
`;

export const BlackBoxContainer = styled.div`
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translateX(-50%);
    background: #1E1E1E;
    border: 10px solid yellow;
`;