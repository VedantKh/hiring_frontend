"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useController, Control } from "react-hook-form";

interface PriceSliderProps {
  control: Control<any>;
  name: string;
}

export function PriceSlider({ control, name }: PriceSliderProps) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: 3500,
  });

  const [showTooltip, setShowTooltip] = React.useState(false);
  const min = 500;
  const max = 10000;
  const step = 500;

  return (
    <div className="w-full py-2">
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <TooltipProvider>
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onTouchStart={() => setShowTooltip(true)}
                onTouchEnd={() => setShowTooltip(false)}
              />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              className="bg-primary text-primary-foreground px-2 py-1 rounded shadow-lg"
            >
              <p className="font-semibold">
                {value === 10000 ? "> $10000" : `< $${value}`}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SliderPrimitive.Root>
    </div>
  );
}
