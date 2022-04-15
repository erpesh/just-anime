import React, {useContext, useState} from 'react';
import AuthContext from "../../context/AuthContext";

const AnimeStatesDropdown = ({animeData}) => {
    return (
        <Dropdown>
            <DropdownToogle animeData={animeData}>
                <DropdownItems animeData={animeData}/>
            </DropdownToogle>
        </Dropdown>
    );
};

export default AnimeStatesDropdown;