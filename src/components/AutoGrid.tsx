import { Grid, type GridProps } from "@mui/material";
import { Children, type FC, type ReactElement, type ReactNode } from "react";

export type AutoGridProps = Omit<GridProps, "container" | "children"> & {
  components?: ReactNode[];
  columnCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

/**
 * Dev Note:
 *  Be careful of transferring keys of children to the wrapper, Grid. 
 *  If not done correctly, it will cause React to discard the old tree and remount children components
 */
export const AutoGrid: FC<AutoGridProps> = ({ components, columnCount = 1, ...props }) => (
  <Grid container {...props}>
    {Children.toArray(components).map((child) => (
      <Grid
        key={(child as ReactElement).key}
        size={{
          xs: 12 / columnCount,
        }}
      >
        {child}
      </Grid>
    ))}
  </Grid>
);