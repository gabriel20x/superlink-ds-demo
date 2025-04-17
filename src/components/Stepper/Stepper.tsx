import styles from "./stepper.module.css";
import { StepperItems } from "./StepperItems";
import React from "react";

interface StepperProps {
    children: React.ReactNode;
}

export const Stepper = ({ children }: StepperProps) => {
  const isValidChild = (child: React.ReactNode): boolean => {
    return React.isValidElement(child) && child.type === StepperItems;
  };

  const validatedChildren = React.Children.map(children, (child) => {
    if (!isValidChild(child)) {
      console.warn('Stepper children should be StepperItems components');
      return null;
    }
    return child;
  });

  return <div className={styles.stepper}>
    {React.Children.map(validatedChildren, (child, index) => (
      <>
        {child}
        {index < React.Children.count(validatedChildren) - 1 && (
          <div className={styles.stepperItemLine} />
        )}
      </>
    ))}
  </div>;
};
