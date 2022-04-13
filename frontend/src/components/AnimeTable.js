import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ListEdit from "./ListEdit";

const AnimeTable = ({header, data, tabs}) => {

    const [editItem, setEditItem] = useState(-1)

    const handleEditClick = () => {
        setEditItem()
    }

    return (
        data &&
        <div>
            {data[header].length === 0 ? <div>List is empty</div> : <table className="table">
                <thead>
                    <tr className="table-titles">
                        <th className="index-column">#</th>
                        <th>Name</th>
                        <th>Progress</th>
                        <th>Type</th>
                    </tr>
                    <tr>
                        <th colSpan="5"/>
                    </tr>
                </thead>
                <tbody>
                {data[header].map((anime, index) => {
                    return (<>
                        <tr key={index} className="content-tr">
                            <td className="index-column">
                                <span>{index + 1}</span>
                            </td>
                            <td className="name">
                                <Link to={`/anime/${anime['id']}`}>{anime["Title"]}</Link>
                                <span className="edit-span" onClick={() => {
                                    editItem !== index? setEditItem(index) : setEditItem(-1)
                                }}>edit</span>
                                {/*<ListEdit activeOption={header} tabs={tabs} data={data} anime={anime}/>*/}
                            </td>
                            <td className="episodes">
                                <span className="current-value">
                                    {anime['progress']}
                                </span>
                                <span className="separator">/</span>
                                <span className="max-episodes-value">{anime['episodes'] || '?'}</span>
                            </td>
                            <td className="anime-type">{anime['type']}</td>
                        </tr>
                        {editItem === index?
                            <ListEdit
                                activeOption={header}
                                tabs={tabs}
                                data={data}
                                anime={anime}
                                setEditItem={setEditItem}/> : null}
                        </>
                    )})}
                </tbody>
            </table>}
        </div>
    );
};

export default AnimeTable;