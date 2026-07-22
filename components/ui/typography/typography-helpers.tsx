// components/ui/typography/typography-helpers.tsx
// Convenience components for common typography patterns.

"use client";

import { forwardRef } from "react";
import { Text, type TextProps } from "./text";

const createTextComponent = (
  variant: TextProps["variant"],
  defaultAs: React.ElementType
) =>
  forwardRef<HTMLElement, TextProps>((props, ref) => (
    <Text ref={ref} variant={variant} as={defaultAs} {...props} />
  ));

export const Hero = createTextComponent("hero", "h1");
Hero.displayName = "Hero";

export const Display = createTextComponent("display", "h1");
Display.displayName = "Display";

export const H1 = createTextComponent("h1", "h1");
H1.displayName = "H1";

export const H2 = createTextComponent("h2", "h2");
H2.displayName = "H2";

export const H3 = createTextComponent("h3", "h3");
H3.displayName = "H3";

export const H4 = createTextComponent("h4", "h4");
H4.displayName = "H4";

export const Title = createTextComponent("title", "h4");
Title.displayName = "Title";

export const Body = createTextComponent("body", "p");
Body.displayName = "Body";

export const BodySmall = createTextComponent("bodySmall", "p");
BodySmall.displayName = "BodySmall";

export const Caption = createTextComponent("caption", "span");
Caption.displayName = "Caption";

export const Label = createTextComponent("label", "label");
Label.displayName = "Label";

export const Overline = createTextComponent("overline", "span");
Overline.displayName = "Overline";
