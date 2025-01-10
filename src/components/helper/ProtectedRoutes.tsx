import { useContext, useState } from "react";
import { UserAccountContext } from "../../App";
import { Navigate, NavigateFunction, useNavigate } from "react-router";

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes = (props: ProtectedRoutesProps) => {
    const userAccountContext = useContext(UserAccountContext);
    if (userAccountContext?.userAccount === null) {
        return <Navigate to = "/" />;
    }

    return props.children;
};

export default ProtectedRoutes;
