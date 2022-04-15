import React from 'react';
import {
    MobileIcon,
    Nav,
    NavbarContainer,
    NavBtn,
    NavBtnLink,
    NavLogo,
    NavTitle,
    SignContainer
} from "./NavbarElements";
import {ReactComponent as Logo} from "./assets/logo.svg";
import AnimeSearch from "../AnimeSearch";
import {FaBars} from "react-icons/fa";

const Navbar = () => {
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
                    <AnimeSearch/>
                    <NavBtn>
                        <NavBtnLink to="/login">Sign in</NavBtnLink>
                    </NavBtn>
                    <NavBtn>
                        <NavBtnLink to="/register">Sign up</NavBtnLink>
                    </NavBtn>
                </SignContainer>
            </NavbarContainer>
        </Nav>

    );
};

export default Navbar;