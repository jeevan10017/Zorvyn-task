import React from "react";
import { useTheme } from "../../hooks/useTheme";

/**
 * Shared style builder
 */
function useInputClass(hasIcon = false, size = "md") {
  const { isDark } = useTheme();
  return [
    "w-full rounded-lg border font-medium transition-all duration-150 outline-none",
    "focus:ring-2 focus:ring-offset-0",
    size === "sm" ? "text-xs py-1.5" : "text-sm py-2",
    hasIcon ? "pl-8 pr-3" : "px-3",
    isDark
      ? [
          "bg-[#0d0d0d] border-[#242424] text-white placeholder-[#444]",
          "hover:border-[#3a3a3a]",
          "focus:border-[#555] focus:ring-white/8 focus:bg-[#111]",
        ].join(" ")
      : [
          "bg-white border-[#e2e2e2] text-black placeholder-[#bbb]",
          "hover:border-[#c8c8c8]",
          "focus:border-[#aaa] focus:ring-black/6 focus:bg-white",
        ].join(" "),
  ].join(" ");
}

/**
 * <TextInput>  — standard text / search field
 */
export function TextInput({
  value,
  onChange,
  placeholder,
  icon: Icon,
  iconRight,
  size = "md",
  className = "",
  ...rest
}) {
  const { isDark } = useTheme();
  const inputClass = useInputClass(!!Icon, size);
  const iconColor = isDark ? "text-[#555]" : "text-[#bbb]";

  return (
    <div className={`relative w-full ${className}`}>
      {Icon && (
        <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${iconColor}`}>
          <Icon size={13} />
        </span>
      )}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
        {...rest}
      />
      {iconRight && (
        <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${iconColor}`}>
          {iconRight}
        </span>
      )}
    </div>
  );
}

/**
 * <NumberInput>  — currency / numeric field with $ prefix
 */
export function NumberInput({ value, onChange, placeholder = "0.00", min = "0", step = "0.01", size = "md", ...rest }) {
  const { isDark } = useTheme();
  const inputClass = [
    "w-full rounded-r-lg border-y border-r font-medium font-mono transition-all duration-150 outline-none pl-2 pr-3",
    size === "sm" ? "text-xs py-1.5" : "text-sm py-2",
    "focus:ring-2 focus:ring-offset-0",
    isDark
      ? "bg-[#0d0d0d] border-[#242424] text-white placeholder-[#444] hover:border-[#3a3a3a] focus:border-[#555] focus:ring-white/8 focus:bg-[#111]"
      : "bg-white border-[#e2e2e2] text-black placeholder-[#bbb] hover:border-[#c8c8c8] focus:border-[#aaa] focus:ring-black/6",
  ].join(" ");

  const prefixClass = [
    "flex items-center px-2.5 rounded-l-lg border-y border-l text-sm font-semibold flex-shrink-0",
    isDark
      ? "bg-[#111] border-[#242424] text-[#555]"
      : "bg-[#f5f5f5] border-[#e2e2e2] text-[#bbb]",
  ].join(" ");

  return (
    <div className="flex w-full">
      <span className={prefixClass}>$</span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className={inputClass}
        {...rest}
      />
    </div>
  );
}

/**
 * <DateInput>  — date picker with full theme support
 */
export function DateInput({ value, onChange, size = "md", ...rest }) {
  const { isDark } = useTheme();
  const inputClass = [
    "w-full rounded-lg border font-medium transition-all duration-150 outline-none px-3",
    size === "sm" ? "text-xs py-1.5" : "text-sm py-2",
    "focus:ring-2 focus:ring-offset-0",
    // Date inputs render their own calendar picker — we style the visible part
    isDark
      ? [
          "bg-[#0d0d0d] border-[#242424] text-white",
          "hover:border-[#3a3a3a]",
          "focus:border-[#555] focus:ring-white/8 focus:bg-[#111]",
          "[color-scheme:dark]",          // ← makes the browser date picker dark
        ].join(" ")
      : [
          "bg-white border-[#e2e2e2] text-black",
          "hover:border-[#c8c8c8]",
          "focus:border-[#aaa] focus:ring-black/6",
          "[color-scheme:light]",
        ].join(" "),
  ].join(" ");

  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      className={inputClass}
      {...rest}
    />
  );
}

/**
 * <FieldLabel>  — consistent label above inputs
 */
export function FieldLabel({ children, className = "" }) {
  const { isDark } = useTheme();
  return (
    <label
      className={`block text-[10px] uppercase tracking-widest font-semibold mb-1.5 ${
        isDark ? "text-[#666]" : "text-[#999]"
      } ${className}`}
    >
      {children}
    </label>
  );
}
