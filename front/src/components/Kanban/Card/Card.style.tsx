import styled from "styled-components";

const Container = styled.div<{ $isDragging: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    border: 1px solid;
    background-color: ${(props) => (props.$isDragging ? "#000000" : "#121212")};
`;

export default Container;
