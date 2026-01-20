import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  fromColor?: string;
  toColor?: string;
}

export const GradientBackground = ({
  className,
  fromColor = "#ffffff",
  toColor = "#f59e0b"
}: GradientBackgroundProps) => {
  return (
    <div
      className={cn("absolute inset-0 z-0", className)}
      style={{
        backgroundImage: `
          radial-gradient(125% 125% at 50% 10%, ${fromColor} 40%, ${toColor} 100%)
        `,
        backgroundSize: "100% 100%",
      }}
    />
  );
};
