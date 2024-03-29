import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'modules/userData';
import Loading from 'components/templates/Loading';
import BaseLayout from 'components/templates/BaseLayout';

export default function AuthWithBaseLayout(SpecificComponent, option, adminRoute = null) {
  /*
    여기서 option은 null, true, false가 존재
    null 은 아무나 출입이 가능한 페이지
    true 는 로그인한 유저만 출입 가능한 페이지
    false 는 로그인한 유저는 출입 불가능한 페이지
    */

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth.request({ history: props.history, option, adminRoute }));
    }, [dispatch, props.history]);

    let user = useSelector((state) => state.userData)?.data;
    if (user) {
      console.log(user);
      return (
        <BaseLayout user={user}>
          <SpecificComponent {...props} user={user} />
        </BaseLayout>
      );
    } else {
      const initialUser = {
        isAuth: false,
        _id: '',
        id: '',
        email: '',
        name: '',
        image: '',
        likedClubs: [],
      };
      return (
        <BaseLayout user={initialUser}>
          <Loading />
        </BaseLayout>
      );
    }
  }
  return AuthenticationCheck;
}
