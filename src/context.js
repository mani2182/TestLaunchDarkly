import React, {useState} from 'react';
export const LDContext = React.createContext({
  ldResponse: [],
  setLdResponse: ldResponse => {},
});

export const LDContextProvider = props => {
  const setLdResponse = ldResponse => {
    setState({...state, ldResponse: ldResponse});
  };

  const initState = {
    ldResponse: [],
    setLdResponse: setLdResponse,
  };

  const [state, setState] = useState(initState);

  return (
    <LDContext.Provider value={state}>{props.children}</LDContext.Provider>
  );
};
