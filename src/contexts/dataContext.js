import React, { useState } from 'react';

const DataContext = React.createContext({
    isLoggedIn: "yunusemregunes"
});

export const DataContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState("yunusemregunes");

    return <DataContext.Provider value={[isLoggedIn, setIsLoggedIn]}>{props.children}</DataContext.Provider>
};

export default DataContext;
