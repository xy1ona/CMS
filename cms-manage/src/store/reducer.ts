interface IState {
    key: number;
}

// 定义默认数据
const defaultState: IState = {
    key: 1  // myHeader组件的key
};

interface IAction {
    type: string;
    value?: unknown;
}

// eslint-disable-next-line
export default (state = defaultState, action: IAction) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'changeKey':
            newState.key++;
            break;
        default:
            break;
    }
    return newState;
};