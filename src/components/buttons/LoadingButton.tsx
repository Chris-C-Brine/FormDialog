// src/components/buttons/LoadingButton.tsx
import {Button, CircularProgress, Box} from "@mui/material";
import {LoadingButtonProps} from "../../types";

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
 * - When `loading` is true, the button shows a circular progress indicator
 * - When `loading` is false or undefined, the button shows its normal content
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
export const LoadingButton = ({children, loading = false, altIcon, loadingIconProps, ...props}: LoadingButtonProps) => {
  return (
    <Button {...props}>
      {!loading ? altIcon : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "auto",
            mr: 1,
          }}>
          <CircularProgress {...loadingIconProps}/>
        </Box>
      )}
      {children}
    </Button>
  );
};
