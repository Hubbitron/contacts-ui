import { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { UserAccountContext } from "../../App";

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
            <div className="hyperlink" onClick={onLogout}>
                Logout
            </div>
        </div>
    );
};

export default UserInfo;