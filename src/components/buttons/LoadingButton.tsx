// src/components/buttons/LoadingButton.tsx
import {Button, useTheme, type ButtonProps, CircularProgress, Box} from "@mui/material";
import type {ReactNode} from "react";

/**
 * Props for the LoadingButton component
 */
export type LoadingButtonProps = ButtonProps & {
    /**
     * Controls the loading state of the button
     * When false, displays a loading spinner; when true or undefined, displays normal content
     */
    loading?: boolean;

    /**
     * Optional icon to display when the button is not in loading state
     * Can be used to provide a visual indicator of the button's action
     */
    altIcon?: ReactNode;
};

/**
 * A button component with built-in loading state visualization
 *
 * This component extends Material UI's Button with loading functionality:
 * - Displays a spinner when in loading state
 * - Shows an optional alternative icon when not loading
 * - Maintains consistent layout during state transitions
 * - Automatically sizes the spinner based on the current theme's font size
 *
 * The loading state can be controlled through the `loading` prop:
 * - When `loading` is false, the button shows a circular progress indicator
 * - When `loading` is true or undefined, the button shows its normal content
 *
 * @example
 * // Basic usage
 * <LoadingButton loading={isLoading}>
 *   Submit
 * </LoadingButton>
 *
 * @example
 * // With alternative icon
 * <LoadingButton
 *   loading={!isProcessing}
 *   altIcon={<SaveIcon />}
 * >
 *   Save
 * </LoadingButton>
 *
 * @example
 * // With custom styling
 * <LoadingButton
 *   loading={isSubmitting}
 *   variant="contained"
 *   color="primary"
 *   fullWidth
 * >
 *   Process Payment
 * </LoadingButton>
 */
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
