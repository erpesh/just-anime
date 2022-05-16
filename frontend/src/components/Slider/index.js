import React, {useEffect, useRef, useState} from 'react';
import './slider.css';

const Slider = ({children}) => {

    const [state, setState] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0,
    })

    let ref = useRef(null);

    const onMouseMove = e => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
            return;
        }
        e.preventDefault()

        const {clientX, scrollX, isScrolling} = state;

        if (isScrolling) {
            console.log(ref.current.scrollLeft);
            ref.current.scrollLeft += scrollX + e.clientX - clientX;
            setState({
                ...state,
                scrollX: scrollX + e.clientX - clientX,
                clientX: e.clientX,
            })
            console.log(scrollX + e.clientX - clientX);
        }
    }

    const onMouseUp = e => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
            return;
        }
        e.preventDefault()

        setState({
            ...state,
            isScrolling: false,
        })
    }

    const onMouseDown = e => {
        if (ref && ref.current && !ref.current.contains(e.target)) {
            return;
        }
        e.preventDefault()

        setState({
            ...state,
            isScrolling: true,
            clientX: e.clientX
        })
    }

    // scrolling
    useEffect(() => {
        const element = ref.current;
        if (element) {
            const onWheel = e => {
                e.preventDefault();
                element.scrollTo({
                    left: element.scrollLeft + e.deltaY * 10 , // 1250 - max width, 125 - e.deltaY
                    behavior: "smooth"
                })
            }
            element.addEventListener("wheel", onWheel);

            return () => element.removeEventListener("wheel", onWheel);
        }
    }, [])

    // draggable
    useEffect(() => {
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        }
    },[])

    return (
        <div className="slider-container">
            <div
                ref={ref}
                className="slider-items"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {React.Children.map(children, child => React.Children.only(child))}
            </div>
        </div>
    );
};

export default Slider;