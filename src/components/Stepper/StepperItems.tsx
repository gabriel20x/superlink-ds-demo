import styles from "./stepper.module.css";
import { CheckOutlinedIcon, CheckFullIcon } from "../Icon/icons";
import { cn } from "../../utils/cva";

interface StepperItemsProps {
  label: string;
  state: "inProgress" | "completed" | "pending";
}

export const StepperItems = ({ label, state = "pending" }: StepperItemsProps) => {
  return (
    <div className={cn([styles.stepperItem, state === "pending" && styles.itemPending])}>
      {state === "completed" && <CheckFullIcon width={20} height={20} />}
      {(state === "inProgress" || state === "pending") && <CheckOutlinedIcon width={20} height={20} />}
      <span className={cn([styles.stepperItemLabel, state === "completed" && styles.textCompleted])}>{label}</span>
    </div>
  );
};
