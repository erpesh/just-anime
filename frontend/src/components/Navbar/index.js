import React, {useContext} from 'react';
import {
    MobileIcon,
    Nav,
    NavbarContainer,
    NavBtn,
    NavBtnLink,
    NavButton,
    NavLogo,
    NavTitle,
    SignContainer
} from "./NavbarElements";
import {ReactComponent as Logo} from "./assets/logo.svg";
import AnimeSearch from "../AnimeSearch";
import {FaBars} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const Navbar = ({setIsModalActive, setIsLoginActive}) => {

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
                    <NavBtn onClick={() => window.location.reload()}>
                        <NavBtnLink to="/search/anime?q=&order_by=members">Search</NavBtnLink>
                    </NavBtn>
                    {!user ? <>
                            {/*<NavBtn>*/}
                            {/*    <NavBtnLink to="/login">Sign in</NavBtnLink>*/}
                            {/*</NavBtn>*/}
                            <NavBtn>
                                <NavButton onClick={() => {
                                    setIsModalActive(true)
                                    setIsLoginActive(true)
                                }}>Sign in</NavButton>
                            </NavBtn></> :
                        <>
                            <NavBtn>
                                <NavBtnLink to="/profile">Profile</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavButton onClick={() => logoutUser()}>Logout</NavButton>
                            </NavBtn>
                        </>}
                </SignContainer>
            </NavbarContainer>
        </Nav>

    );
};

export default Navbar;