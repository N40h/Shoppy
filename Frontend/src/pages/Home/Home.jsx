/* eslint-disable no-unused-vars */
import React from "react"
import Menu from "../../components/Menu/Menu"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateToken } from "./redux/reducers/authSlice";

export default function Home() {
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch();

    useEffect(() => {
      const storedToken = sessionStorage.getItem('user');
  
      if (storedToken && !token) {
        dispatch(updateToken(storedToken))
      }
    }, [token, dispatch])

    return (
        <React.Fragment>
            <Menu />
        </React.Fragment>
    )
}