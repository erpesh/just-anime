import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ListEdit from "./ListEdit";

const AnimeTable = ({header, data, tabs, pageWidth}) => {

    const [editItem, setEditItem] = useState(-1)

    return (
        data &&
        <>
            {data[header].length === 0 ? <div>List is empty</div> : <table className="table">
                <thead>
                <tr className="table-titles">
                    <th className="index-column">#</th>
                    <th className="name-column">Name</th>
                    {pageWidth > 400 &&
                    <>
                        <th className="progress-column">Progress</th>
                        <th className="type-column">Type</th>
                    </>}
                </tr>
                <tr>
                    <th colSpan="5"/>
                </tr>
                </thead>
                <tbody>
                {data[header].sort((a, b) => {
                    return a.Title.localeCompare(b.Title)
                }).map((anime, index) => {
                    return (
                        <React.Fragment key={index}>
                            <tr className="content-tr">
                                <td className="index-column" valign="top">
                                    <span>{index + 1}</span>
                                </td>
                                <td className="name">
                                    <Link to={`/anime/${anime['id']}`}>{anime["Title"]}</Link>
                                    <span className="edit-span" onClick={() => {
                                        editItem !== index ? setEditItem(index) : setEditItem(-1)
                                    }}>edit</span>
                                </td>
                                {pageWidth > 400 &&
                                <>
                                    <td className="episodes" valign="top">
                                        <span className="current-value">
                                            {anime['progress']}
                                        </span>
                                        <span className="separator">/</span>
                                        <span className="max-episodes-value">{anime['episodes'] || '?'}</span>
                                    </td>
                                    <td className="anime-type" valign='top'>{anime['type']}</td>
                                </>}
                            </tr>
                            {editItem === index ?
                                <ListEdit
                                    key={index}
                                    activeOption={header}
                                    tabs={tabs}
                                    data={data}
                                    anime={anime}
                                    setEditItem={setEditItem}/> : null}
                        </React.Fragment>
                    )
                })}
                </tbody>
            </table>}
        </>
    );
};

export default AnimeTable;