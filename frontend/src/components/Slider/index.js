import React, {useEffect, useRef} from 'react';
import './slider.css';

const Slider = ({children}) => {

    let ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (element) {
            const onWheel = e => {
                e.preventDefault();
                console.log(e.deltaY)
                element.scrollTo({
                    left: element.scrollLeft + e.deltaY * 8,
                    behavior: "smooth"
                })
            }
            element.addEventListener("wheel", onWheel);

            return () => element.removeEventListener("wheel", onWheel);
        }
    },[])

    return (
        <div className="slider-container">
            <div
                ref={ref}
                className="slider-items">
                {React.Children.map(children, child => React.Children.only(child))}
            </div>
        </div>
    );
};

export default Slider;