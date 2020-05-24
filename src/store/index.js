import {createStore,applyMiddleware,combineReducers} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk"
import {counterReducer} from './count.redux';
import {user} from './user.redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';
// const store=createStore(
//     combineReducers({counter:counterReducer,user}),
//     applyMiddleware(logger,thunk));

//1.创建saga中间件并注册
const sageMiddleware=createSagaMiddleware();
const store=createStore(
    combineReducers({user}),
    applyMiddleware(logger,sageMiddleware)
);
sageMiddleware.run(mySaga);
export default store;