import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 50%;
    margin-top: 10px;
    overflow-x: auto;
    overflow-y: auto;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 10px 20px;
`;

type DropshadowProps = {
    height: number;
};

const Dropshadow = styled.div<DropshadowProps>`
    border-radius: 3px;
    background-color: rgb(255, 255, 255, 0.1);
    width: 202px;
    height: ${({ height }) => height}px;
    z-index: 1;
`;

type ColumnDropshadowProps = {
    $marginLeft: number;
};

const ColumnDropshadow = styled(Dropshadow)<ColumnDropshadowProps>`
    margin-left: ${({ $marginLeft }) => $marginLeft - 1}px;
    position: absolute;
`;

export { Container, Dropshadow, ColumnDropshadow };
