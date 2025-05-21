// src/utils/ThemeBridge.tsx
import { useTheme as useMuiTheme } from '@mui/material/styles';
import React, { createContext, useEffect, useState, ReactNode, PropsWithChildren } from 'react';

// Create a context that will hold the parent theme
const ParentThemeContext = createContext<any>(null);

export const ThemeBridge: React.FC<PropsWithChildren> = ({ children }) => {
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
