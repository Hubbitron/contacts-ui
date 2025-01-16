import { useContext, useState } from "react";
import { UserAccountContext } from "../../App";
import { Navigate, NavigateFunction, useNavigate } from "react-router";

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes = (props: ProtectedRoutesProps) => {
  let jwt = sessionStorage.getItem("jwt");
    if (!jwt || jwt === '') {
      return <Navigate to = "/" />;
    }

    return props.children;
};

export default ProtectedRoutes;