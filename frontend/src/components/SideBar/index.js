import React, {useContext} from 'react';
import {
    CloseIcon,
    Icon,
    SidebarContainer,
    SidebarSignButton,
    SidebarMenu,
    SidebarWrapper,
    SidebarLink,
    SideTitle,
    SideLogo
} from "./SideBarElements";
import AuthContext from "../../context/AuthContext";
import {ReactComponent as Logo} from "../Navbar/assets/logo.svg";

const SideBar = ({setIsLoginActive, setIsModalActive, isOpen, toggle}) => {

    const {user, logoutUser} = useContext(AuthContext)

    return (
        <SidebarContainer isOpen={isOpen}>
            <SideLogo>
                <Logo/>
                <SideTitle>Just Anime</SideTitle>
            </SideLogo>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/search/anime?q=&order_by=members" onClick={toggle}>
                        Anime
                    </SidebarLink>
                    {!user ?
                        <>
                            <SidebarSignButton onClick={() => {
                                setIsModalActive(true)
                                setIsLoginActive(true)
                                toggle()
                            }}>
                                Sign in
                            </SidebarSignButton>
                        </> :
                        <>
                            <SidebarLink to="/profile" onClick={toggle}>
                                Profile
                            </SidebarLink>
                            <SidebarSignButton onClick={() => {
                                logoutUser()
                                toggle()
                            }}>
                                Logout
                            </SidebarSignButton>
                        </>
                    }
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default SideBar;