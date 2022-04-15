import React from 'react';
import {CloseIcon, Icon, SidebarContainer, SidebarLink, SidebarMenu, SidebarWrapper} from "./SideBarElements";
import AnimeSearch from "../AnimeSearch";

const SideBar = () => {
    return (
        <SidebarContainer>
            <Icon>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <AnimeSearch/>
                    <SidebarLink to="/login">
                        Sign in
                    </SidebarLink>
                    <SidebarLink to="/register">
                        Sign up
                    </SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default SideBar;