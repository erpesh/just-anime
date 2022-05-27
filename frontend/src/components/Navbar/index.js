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
import AuthContext from "../../context/AuthContext";
import AnimeSearch from "../AnimeSearch";
import {FaBars} from "react-icons/fa";

const Navbar = ({setIsModalActive, setIsLoginActive, toggle}) => {

    const {user, logoutUser} = useContext(AuthContext)

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to={"/"}>
                    <Logo/>
                    <NavTitle>Just Anime</NavTitle>
                </NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars/>
                </MobileIcon>
                <SignContainer>
                    <AnimeSearch/>
                    <NavBtn>
                        <NavBtnLink to="/search/anime?q=&order_by=members">Anime</NavBtnLink>
                    </NavBtn>
                    {!user ? <>
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