import styles from "./stepper.module.css";
import { CheckOutlinedIcon, CheckFullIcon } from "../Icon/icons";
import { cn } from "../../utils/cva";

export interface StepperItemProps {
  label: string;
  state: "inProgress" | "completed" | "pending";
  variant?: "default" | "bar";
}

export const StepperItem = ({
  label,
  state = "pending",
  variant = "default",
}: StepperItemProps) => {
  if (variant === "bar") {
    return (
      <div className={cn(styles.stepperItemBar, state === "completed" && styles.itemBarCompleted, state === "pending" && styles.itemBarPending, state === "inProgress" && styles.itemBarInProgress)}/>
    );
  }

  return (
    <div
      className={cn([
        styles.stepperItem,
        state === "pending" && styles.itemPending,
      ])}
    >
      {state === "completed" && <CheckFullIcon width={20} height={20} />}
      {(state === "inProgress" || state === "pending") && (
        <CheckOutlinedIcon width={20} height={20} />
      )}
      <span
        className={cn([
          styles.stepperItemLabel,
          state === "completed" && styles.textCompleted,
        ])}
      >
        {label}
      </span>
    </div>
  );
};
