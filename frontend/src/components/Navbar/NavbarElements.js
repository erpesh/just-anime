import styled from 'styled-components'
import {Link} from "react-router-dom";

export const Nav = styled.nav`
  background: #070707;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
}
`

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 52px;
  z-index: 1;
  width: 100%;
  padding: 0 10px;
  max-width: 1355px;
`

export const NavLogo = styled(Link)`
  color: #BD00FF;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  width: 300px;
`

export const NavTitle = styled.span`
  font-family: 'Aubrey',sans-serif;
  font-size: 33px;
  margin-left: 5px;
  
  //
  //@media screen and (max-width: 615px) {
  //  display: none;
  //}
`

export const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 600px) {
    color: #FCFCFC;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    margin-top: -10px;
    font-size: 1.8rem;
    cursor: pointer;
  }
`

export const SignContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-self: flex-end;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  
  @media screen and (max-width: 600px){
    display: none;
  }
`

export const NavBtn = styled.nav`
  display: block;
`

export const NavBtnLink = styled(Link)`
  font-weight: 400;
  border-radius: 5px;
  background: #BD00FF;
  white-space: nowrap;
  padding: 5px 25px;
  margin: 0 7px;
  color: #FCFCFC;
  font-size: 16px;
  outline: none;
  border: 2px solid #070707;
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #070707;
    border: 2px solid #BD00FF;
  }

  @media screen and (max-width: 600px) {
    padding: 5px 15px;
  }
`

export const NavButton = styled.div`
  font-weight: 400;
  border-radius: 5px;
  background: #BD00FF;
  white-space: nowrap;
  padding: 5px 25px;
  margin: 0 7px;
  color: #FCFCFC;
  font-size: 16px;
  outline: none;
  border: 2px solid #070707;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #070707;
    border: 2px solid #BD00FF;
  }
  
  @media screen and (max-width: 600px) {
    padding: 5px 15px;
  }
`
