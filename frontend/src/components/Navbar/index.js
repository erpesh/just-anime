import React, {useContext} from 'react';
import {
    MobileIcon,
    Nav,
    NavbarContainer,
    NavBtn,
    NavBtnLink, NavBtnLogout,
    NavLogo,
    NavTitle,
    SignContainer
} from "./NavbarElements";
import {ReactComponent as Logo} from "./assets/logo.svg";
import AnimeSearch from "../AnimeSearch";
import {FaBars} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {

    const {user, logoutUser} = useContext(AuthContext)

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to={"/"}>
                    <Logo/>
                    <NavTitle>Just Anime</NavTitle>
                </NavLogo>
                {/*<MobileIcon>*/}
                {/*    <FaBars/>*/}
                {/*</MobileIcon>*/}
                <SignContainer>
                    {/*<AnimeSearch/>*/}
                    <NavBtn>
                        <NavBtnLink to="/search/anime?q=&order_by=members">Search</NavBtnLink>
                    </NavBtn>
                    {!user ? <>
                            <NavBtn>
                                <NavBtnLink to="/login">Sign in</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavBtnLink to="/register">Sign up</NavBtnLink>
                            </NavBtn></> :
                        <>
                            <NavBtn>
                                <NavBtnLink to="/profile">Profile</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavBtnLogout onClick={() => logoutUser()}>Logout</NavBtnLogout>
                            </NavBtn>
                        </>}
                </SignContainer>
            </NavbarContainer>
        </Nav>

    );
};

export default Navbar;