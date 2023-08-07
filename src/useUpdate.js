import { useState, useEffect } from "react";

const useUpdate = (url) => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch(url);
        const userdata = await response.json();
        setData(userdata);
    }

    useEffect (() => {
        getData();
      }, [url])

    return { data };
};

export default useUpdate;

