// src/components/buttons/LoadingButton.tsx
import {Button, useTheme, type ButtonProps, CircularProgress, Box} from "@mui/material";
import type {ReactNode} from "react";

export type LoadingButtonProps = ButtonProps & {
    loading?: boolean;
    /** The icon displayed when not loading */
    altIcon?: ReactNode;
};

export const LoadingButton = ({children, loading, altIcon, ...props}: LoadingButtonProps) => {
    const theme = useTheme();

    return (
        <Button {...props}>
            {!loading ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "auto",
                        mr: 1,
                    }}>
                    <CircularProgress color="inherit" size={theme.typography.fontSize} />
                </Box>
            ) : (
                altIcon
            )}
            {children}
        </Button>
    );
}
