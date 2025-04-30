import styles from "./stepper.module.css";
import { StepperItem } from "./StepperItem";
import React, { ComponentProps, useEffect, useState } from "react";
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export interface StepperProps {
    children: React.ReactNode;
}

/**
 * A stepper component that displays a sequence of steps with connecting lines.
 * Automatically switches between default and bar variants based on screen size.
 * 
 * @component
 * @param {React.ReactNode} props.children - The child elements, should be StepperItems components
 * @returns {JSX.Element} A stepper component with validated children and connecting lines
 *
 * @example
 * <Stepper>
 *   <StepperItems label="Step 1" state="completed" />
 *   <StepperItems label="Step 2" state="inProgress" />
 *   <StepperItems label="Step 3" state="pending" />
 * </Stepper>
 */
export const Stepper = ({ children }: StepperProps) => {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const isValidChild = (child: React.ReactNode): boolean => { 
    return React.isValidElement(child) && child.type === StepperItem;
  };

  const validatedChildren = React.Children.map(children, (child) => {
    if (!isValidChild(child)) {
      console.warn('Stepper children should be StepperItems components');
      return null;
    }
    if (!React.isValidElement(child)) {
      return null;
    }
    return React.cloneElement(child as React.ReactElement<ComponentProps<typeof StepperItem>>, {
      variant: isMobile ? "bar" : "default"
    });
  });

  return <div className={styles.stepper}>
    {React.Children.map(validatedChildren, (child, index) => (
      <>
        {child}
        {index < React.Children.count(validatedChildren) - 1 && !isMobile && (
          <div className={styles.stepperItemLine} />
        )}
      </>
    ))}
  </div>;
};
