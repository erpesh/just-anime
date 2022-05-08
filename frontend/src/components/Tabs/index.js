import './tabs.css'
import React from 'react';
import AnimeTable from "./AnimeTable";

function Tabs({data, tabs}) {

    return (
        <div className="container">
            <div className="content-tabs">
                {tabs.map((tab, index) => {
                    return <div className={"content"} key={index}>
                        <div className="content-header">{tab}</div>
                        <AnimeTable header={tab} data={data} tabs={tabs}/>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Tabs;