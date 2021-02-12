import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'modules/userData';
import Loading from 'components/templates/Loading';

export default function Auth(SpecificComponent, option, adminRoute = null){

    /*
    여기서 option은 null, true, false가 존재
    null 은 아무나 출입이 가능한 페이지
    true 는 로그인한 유저만 출입 가능한 페이지
    false 는 로그인한 유저는 출입 불가능한 페이지
    */

    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth.request({history: props.history, option, adminRoute}));
        }, []);

        let user = useSelector((state) => state.userData)?.data;
        if(user){
            return(
                <SpecificComponent {...props} user={user} />
            )
        } else {
            return(
                <Loading />
            )
        }
    }
    return AuthenticationCheck
}