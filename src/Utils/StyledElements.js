import styled from 'styled-components';

const Split = styled.div`
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
`;

const SplitLeft = styled(Split)`
    left: 0;
`;

const SplitRight = styled(Split)`
    right: 0;
`;

const Center = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const Spacer = styled.div`
    flex: 1;
`;

export {SplitLeft, SplitRight, Center, Spacer};