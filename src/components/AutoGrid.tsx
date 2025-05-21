import { Grid, type GridProps } from "@mui/material";
import { Children, type FC, type ReactElement, type ReactNode } from "react";
import {AutoGridProps} from "../types";



/**
 * A responsive grid component that automatically arranges children in equal columns
 *
 * AutoGrid simplifies the creation of grid layouts by automatically calculating
 * column sizes based on the provided `columnCount`. It's particularly useful
 * for form layouts where fields need to be arranged in a consistent grid pattern.
 *
 * @example
 * // Basic usage with 2 columns
 * <AutoGrid
 *   columnCount={2}
 *   components={[
 *     <TextFieldElement key="name" label="Name" />,
 *     <TextFieldElement key="email" label="Email" />
 *   ]}
 * />
 *
 * @example
 * // With spacing and custom props
 * <AutoGrid
 *   columnCount={3}
 *   rowSpacing={2}
 *   columnSpacing={3}
 *   components={[
 *     <TextFieldElement key="first" label="First Name" />,
 *     <TextFieldElement key="middle" label="Middle Name" />,
 *     <TextFieldElement key="last" label="Last Name" />
 *   ]}
 * />
 *
 * @note Be careful of transferring keys of children to the wrapper Grid.
 * If not done correctly, it will cause React to discard the old tree and remount children components.
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