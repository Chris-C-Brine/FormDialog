// src/utils/ThemeBridge.tsx
import { useTheme as useMuiTheme } from '@mui/material/styles';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Create a context that will hold the parent theme
const ParentThemeContext = createContext<any>(null);

export const useParentTheme = () => useContext(ParentThemeContext);

interface ThemeBridgeProps {
    children: ReactNode;
}

export const ThemeBridge: React.FC<ThemeBridgeProps> = ({ children }) => {
    const parentTheme = useMuiTheme();
    const [themeSnapshot, setThemeSnapshot] = useState(parentTheme);

    // Update the snapshot when the parent theme changes
    useEffect(() => {
        setThemeSnapshot(parentTheme);
    }, [parentTheme]);

    // Pass the parent theme to our components
    return (
        <ParentThemeContext.Provider value={themeSnapshot}>
            {children}
        </ParentThemeContext.Provider>
    );
};
