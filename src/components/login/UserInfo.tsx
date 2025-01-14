import { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { UserAccountContext } from "../../App";
import { UserAccount } from "./model/UserAccount";

interface UserInfoProps {
    jwt: string | null;
}

const UserInfo = (props: any) => {
    let navigate: NavigateFunction = useNavigate();
    const userAccountContext = useContext(UserAccountContext);

    const onLogout = () => {
        sessionStorage.removeItem('jwt');
        userAccountContext?.setUserAccount(null);
        navigate('/');
        return; 
    };

    return (
        <div className="user-info">
            {userAccountContext?.userAccount?.lastName},
            {userAccountContext?.userAccount?.firstName}
            &nbsp;&nbsp;&nbsp;
            <span className="hyperlink" onClick={onLogout}>
                Logout
            </span>
        </div>
    );
};

export default UserInfo;