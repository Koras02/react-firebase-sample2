import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext';

// 로그아웃시 로그인 화면으로 돌아가기위한 리다이렉션 route설정
// component 를 Component로 전환
export default function PrivateRoute({ component: Component, ...rest }
    ) {
       const { currentUser} = useAuth();
        return (
       <Route
         {...rest}
         render={props => {
             // 현재 사용자로 판단되면 렌더링  개인이 랜더링 하고 login 페이지 이동
             // 시작 할때 로그인 화면으로 이동시키게 고정되며 localhost로 들어가도 처음 시작 화면인 
             //  로그이인 되지 않을시 로그인 화면으로 리다이렉션이 된다.
            return currentUser ? <Component {...props} /> :  <Redirect 
            to="/login" />
         }}
       >

       </Route>
     
    )
}
