import React, { Component } from 'react';
import {BrowserRouter,Link,Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import  {login}from '../store/user.redux'

function Home(params){
    return (
        <div>
        <h3>课程列表</h3>
        <ul>
            <li>
                <Link to="/detail/web">web架构师</Link>
            </li>
            <li>
                <Link to="/detail/python">python架构师</Link>
            </li>
        </ul>
    </div>
    )
}
//当前用户信息
function About(params){
    return (
    <div>
       <h3>个人中心</h3>
       <div>
           <Link to="/about/me">个人信息</Link>
           <Link to="/about/order">订单查询</Link>
       </div>
       <Switch>
           <Route path="/about/me" component={Me}/>
           <Route path="/about/order" component={Order}/>
           <Redirect to="/about/me"/>
       </Switch>
    </div>
    )
}
function Me(){
    return <div>Me</div>
}
function Order(){
    return <div>order</div>
}
function NoMatch({location}){
    return(
        <div>
            404,{location.pathname}不存在
        </div>
    )
}
//传递进来的路由器对象
function Detail(props){
    //1.history:导航指令，history.back()
    //2.match:获取参数信息
    //3.location：当前url信息
    console.log(props);
    return (
        <div>
            当前课程：{props.match.params.course}
            <button onClick={props.history.goBack}>后退</button>
        </div>
        
    )
}
//路由守卫
//希望的用法
const PrivateRoute=connect(state=>({isLogin:state.user.isLogin}))(
    ({component:Comp,isLogin,...rest})=>{
        //做认证
        //render:根据条件动态渲染组件
        return(
            <Route
            {...rest}
            render={props=>
            isLogin?(<Comp/>):(
            <Redirect to={{
                pathname:'/login',
                state:{redirect:props.location.pathname}
            }}/>)
            }
            />
        )
    }
)
// function PrivateRoute({component:Comp,isLogin,...rest}){
//     //做认证
//     //render:根据条件动态渲染组件
//     return(
//         <Route
//         {...rest}
//         render={props=>
//         isLogin?(<Comp/>):(
//         <Redirect to={{
//             pathname:'/login',
//             state:{redirect:props.location.pathname}
//         }}/>)
//         }
//         />
//     )
// }
//登录组件
const Login=connect(
    state=>({
        isLogin:state.user.isLogin,
        loading:state.user.loading
    }),
    {login}
)(function Login({location,isLogin,login,loading}){
    const redirect=location.state.redirect||'/';
    if(isLogin){
        return<Redirect to={redirect}/>
    }
    return(
        <div>
            <p>用户登录</p>
            <hr/>
            <button onClick={login} disabled={loading}>
               {loading?'登录中':'登录'} 
            </button>
        </div>
    )
})

export default class RouteSample extends Component {
    render() {
        return (
            <div>
                {/* 父容器放在最外层 */}
               <BrowserRouter>
               <div>
                   {/* 导航的链接 */}
                   <div>
                    <Link to="/">首页</Link>
                    <Link to="/about">关于</Link>
                   </div>
                   {/* 路由的配置 ：路由即组件*/}
                   {/* 如果要单独显示，不匹配可以加exact */}
                   {/* 路由匹配是包容性质 */}
                   <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/detail/:course" component={Detail} />
                    <PrivateRoute path="/about" component={About} />
                    <Route path="/login" component={Login} />
                    {/* 404，没有path，必然匹配 */}
                    <Route component={NoMatch}/>
                   </Switch>
               </div>
               </BrowserRouter>
            </div>
        )
    }
}
