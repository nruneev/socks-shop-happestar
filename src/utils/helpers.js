import React, {useLayoutEffect, useState} from "react";

export function intervalChangeId(getNextId, setActiveId, timeout) {
    let next = getNextId.next();
    let id = next.value;
    let timerId = setInterval(() => {
        setActiveId(id);
        next = getNextId.next();
        id = next.value;
    }, timeout);
    return () => timerId;
}

export function getWrappedString(text) {
    return text.split('\n').map(function(item, key) {
        return (
            <span key={key}>
                {item}
                <br/>
            </span>
        )});
}

export async function get_item(id) {
    let result =[];
    await fetch('/php/tovarByID.php?id=' + id)
        .then(function(response){ return response.json(); })
        .then(function(data) {
            result = data;
        }).catch(reason => console.log(reason));
    return  result;
}

export function useWindowWidth() {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return width;
}
