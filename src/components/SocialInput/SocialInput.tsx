import React, { forwardRef, useState } from "react";
import styles from "./SocialInput.module.css";
import { cn } from "../../utils/cva";
import { WarningIcon } from "../Icon/icons";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  SpotifyIcon,
  TikTokIcon,
  SnapchatIcon,
  XIcon,
  OffSpotifyIcon,
  OffTikTokIcon,
  OffSnapchatIcon,
  OffYoutubeIcon,
  OffInstagramIcon,
  OffXIcon,
  OffFacebookIcon,
  OnlyFansIcon,
  OffOnlyFansIcon,
} from "../../assets";

export interface SocialInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant:
    | "facebook"
    | "instagram"
    | "youtube"
    | "spotify"
    | "tiktok"
    | "snapchat"
    | "x"
    | "onlyfans"
  error?: boolean;
  size?: "L" | "M" | "S";
  tooltip?: string;
  inputFeedback?: string;
  inputLabel?: string;
}

export const SocialInput = forwardRef<HTMLInputElement, SocialInputProps>(
  (
    { error = false, size = "L", inputFeedback, className, variant, ...props },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState("");

    const wrapperClasses = cn(
      styles.wrapper,
      styles[`size${size}`],
      error && styles.wrapperError
    );

    const inputClasses = cn(
      styles.input,
      error && styles.inputError,
      className
    );

    const imageSource = () => {
      switch (variant) {
        case "facebook":
          return currentValue === "" ? OffFacebookIcon : FacebookIcon;
        case "instagram":
          return currentValue === "" ? OffInstagramIcon : InstagramIcon;
        case "youtube":
          return currentValue === "" ? OffYoutubeIcon : YoutubeIcon;
        case "spotify":
          return currentValue === "" ? OffSpotifyIcon : SpotifyIcon;
        case "tiktok":
          return currentValue === "" ? OffTikTokIcon : TikTokIcon;
        case "snapchat":
          return currentValue === "" ? OffSnapchatIcon : SnapchatIcon;
        case "x":
          return currentValue === "" ? OffXIcon : XIcon;
        case "onlyfans":
          return currentValue === "" ? OffOnlyFansIcon : OnlyFansIcon;
        default:
          return currentValue === "" ? OffFacebookIcon : FacebookIcon; // Fallback icon
      }
    };

    return (
      <div className={wrapperClasses}>
        <div className={styles.inputWrapper}>
          <div className={styles.trailingIcon}>
            <img src={imageSource()} className={styles.icon} alt={`${variant} icon`} />
          </div>
          <input ref={ref} className={inputClasses} {...props} onChange={(e)=> {
            setCurrentValue(e.target.value);
            props.onChange?.(e);
          }} />
        </div>
        {inputFeedback && (
          <div className={cn(styles.inputFeedback, error && styles.errorText)}>
            <WarningIcon width={16} height={16} />
            {inputFeedback}
          </div>
        )}
      </div>
    );
  }
);

SocialInput.displayName = "SocialInput";
