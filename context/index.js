import { useState, useEffect, useReducer, createContext } from 'react';

// create context
const Context = createContext();

const navHeight = '60px';

const value = { navHeight };

// context provider
const Provider = ({ children }) => {
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
