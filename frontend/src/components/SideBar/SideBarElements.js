import styled from 'styled-components'
import {FaTimes} from "react-icons/fa";
import {Link} from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #070707;
  display: grid;
  align-items: center;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({isOpen}) => (isOpen? '100%':'0%')};
  top: ${({isOpen}) => (isOpen? '0':'-100%')};
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;
  
  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
  
`

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #FCFCFC;
  cursor: pointer;
  
  &:hover {
    color: #BD00FF;
    transition: 0.2s ease-in-out;
  }
`