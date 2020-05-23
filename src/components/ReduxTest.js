import React from 'react'
//import store from '../store'
import{connect}from 'react-redux';
import {add,minus,asyncAdd} from '../store/count.redux';
//把状态映射到属性中
const mapStateToProps=state=>({num:state.counter});
const mapDispatchToProps={add,minus,asyncAdd};
@connect(
    mapStateToProps,
    mapDispatchToProps
)
class ReduxTest extends React.Component {
    render() {
        const {num,add,minus,asyncAdd}=this.props;
        return (
            <div>
                <p>{num}</p>
                <div>
                    <button onClick={minus}>-</button>
                    <button onClick={add}>+</button>
                    <button onClick={asyncAdd}>asyncAdd</button>
                </div>
            </div>
        )
    }
   
}
//高阶组件配置
export default  ReduxTest;