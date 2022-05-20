import React from "react";
import ReactDOM from 'react-dom'
import 'base.less'
import BaseRouter from 'router'
import {Provider} from 'react-redux'
import store from "store";

ReactDOM.render(
    <Provider store={store}>
        <BaseRouter />
    </Provider>,
    document.getElementById("root")
)

