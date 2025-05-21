import { Grid } from "@mui/material";
import { Children, type FC, type ReactElement } from "react";
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
export const AutoGrid: FC<AutoGridProps> = ({ components, columnWidths, columnCount, ...props }) => {
  // Discriminant narrow: check which prop is present
  let columnSizes: number[] = [];

  if (columnWidths && columnWidths.length) {
    // Use explicit columnWidths if provided
    columnSizes = columnWidths;
  } else if (columnCount) {
    // Fall back to equally divided columns
    // e.g. columnCount=4 → [3,3,3,3]
    columnSizes = Array(columnCount).fill(Math.floor(12 / columnCount));
  } else {
    // Default to 1 full-width column
    columnSizes = [12];
  }

  const columnLength = columnSizes.length;

  return (
    <Grid container {...props}>
      {Children.toArray(components).map((child, idx) => (
        <Grid
          key={(child as ReactElement).key}
          size={{
            xs: columnSizes[idx % columnLength]
          }}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  )
};