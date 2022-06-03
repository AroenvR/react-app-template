import { useEffect } from "react";

import api from "../service/api";

const Component = () => {

    useEffect(() => {

        let url = `https://api.coingecko.com/api/v3/ping`
        api.get(url)
            .then(resp => {
                console.log(resp);
            })
            .catch(ex => {
                console.log(ex);
            })

    }, []);

    return (
        <h1>Hello, World!</h1>
    );
}

export default Component;