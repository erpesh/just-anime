import React, {useState} from 'react';
import AnimeTable from "./AnimeTable";

function Tabs({data, tabs}) {

    const [toggleState, setToggleState] = useState(0)

    return (
        <div className="container">
            <div className="bloc-tabs">
                {tabs.map((tab, index) => {
                    return <div
                        className={"tabs".concat(toggleState === index? ' active-tabs': '')}
                        key={index}
                        onClick={() => setToggleState(index)}>{tab}</div>
                })}
            </div>

            <div className="content-tabs">
                {tabs.map((tab, index) => {
                    return <div className={"content".concat(toggleState === index? ' active-content': '')} key={index}>
                        <AnimeTable header={tab} data={data} tabs={tabs}/>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Tabs;