import styled from 'styled-components'
import {FaTimes} from "react-icons/fa";
import {Link} from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #070707;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({isOpen}) => (isOpen? '100%':'0%')};
  top: ${({isOpen}) => (isOpen? '0':'-100%')};
`

export const SideLogo = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 1.5rem;
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

export const SideTitle = styled.span`
  font-family: 'Aubrey',sans-serif;
  font-size: 33px;
  margin-left: 5px;
`

export const CloseIcon = styled(FaTimes)`
  color: #FCFCFC;
`

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`

export const SidebarWrapper = styled.div`
  color: #FCFCFC;
`

export const SidebarMenu = styled.ul`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SidebarSignButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.0rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #FCFCFC;
  cursor: pointer;
  margin: 30px 0 0;
  
  &:hover {
    color: #BD00FF;
    transition: 0.2s ease-in-out;
  }
`
export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 2.0rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #FCFCFC;
  cursor: pointer;
  margin: 30px 0 0;
  
  &:hover {
    color: #BD00FF;
    transition: 0.2s ease-in-out;
  }
`