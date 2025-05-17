import { Grid } from "@mui/material";
import type { FC } from "react";

/**
 * A utility component that creates flexible space within Grid layouts
 *
 * GridSpacer uses the flex property to create expandable space in a Grid container.
 * It helps with responsive layouts by pushing adjacent elements apart
 * without requiring fixed dimensions or explicit spacing values.
 *
 * The component applies `flex="1 0 0"` which means:
 * - Flex grow: 1 (expands to fill available space)
 * - Flex shrink: 0 (doesn't shrink below base size)
 * - Flex basis: 0 (starts with zero width)
 *
 * This is particularly useful in action buttons layouts where you want
 * some buttons aligned left and others aligned right, with flexible
 * space between them that adapts to the container width.
 *
 * @example
 * // Basic usage in a button row
 * <Grid container>
 *   <Grid>
 *     <Button>Cancel</Button>
 *   </Grid>
 *   <GridSpacer />
 *   <Grid>
 *     <Button>Submit</Button>
 *   </Grid>
 * </Grid>
 *
 * @example
 * // Used in FormDialogActions
 * <Grid container>
 *   <Grid>
 *     <FormCancelButton />
 *   </Grid>
 *   <GridSpacer />
 *   <Grid>
 *     <FormSubmitButton />
 *   </Grid>
 * </Grid>
 */
export const GridSpacer: FC = () => <Grid flex="1 0 0" sx={{w: 0}} />;