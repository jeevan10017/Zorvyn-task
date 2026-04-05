import React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export function Select({
  value,
  onValueChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  size = "md",
}) {
  const { isDark } = useTheme();

  const triggerBase = [
    "inline-flex items-center justify-between gap-2 w-full rounded-lg border font-medium",
    "transition-all duration-150 outline-none focus:ring-0 cursor-pointer select-none",
    size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm",
    isDark
      ? [
          "bg-[#0d0d0d] border-[#242424] text-white",
          "hover:border-[#3a3a3a] hover:bg-[#111]",
          "data-[state=open]:border-[#444] data-[state=open]:bg-[#111]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
        ].join(" ")
      : [
          "bg-white border-[#e2e2e2] text-black",
          "hover:border-[#c8c8c8] hover:bg-[#fafafa]",
          "data-[state=open]:border-[#aaa] data-[state=open]:bg-[#fafafa]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
        ].join(" "),
  ].join(" ");

  const contentBase = [
    "z-[200] min-w-[var(--radix-select-trigger-width)] rounded-xl border shadow-2xl overflow-hidden",
    "animate-slide-up",
    isDark
      ? "bg-[#111] border-[#242424] text-white shadow-black/60"
      : "bg-white border-[#e2e2e2] text-black shadow-black/10",
  ].join(" ");

  const itemBase = [
    "flex items-center gap-2.5 px-3 py-1 text-sm cursor-pointer outline-none select-none",
    "transition-colors duration-100",
    isDark
      ? "text-[#ccc] data-[highlighted]:bg-[#1a1a1a] data-[highlighted]:text-white data-[state=checked]:text-white"
      : "text-[#444] data-[highlighted]:bg-[#f5f5f5] data-[highlighted]:text-black data-[state=checked]:text-black",
  ].join(" ");

  const scrollBtnBase = [
    "flex items-center justify-center h-6 cursor-default",
    isDark ? "text-[#555] bg-[#111]" : "text-[#aaa] bg-white",
  ].join(" ");

  const placeholderColor = isDark ? "text-[#555]" : "text-[#bbb]";

  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <RadixSelect.Trigger className={triggerBase}>
        <RadixSelect.Value
          placeholder={<span className={placeholderColor}>{placeholder}</span>}
        />
        <RadixSelect.Icon asChild>
          <ChevronDown size={13} className={isDark ? "text-[#555]" : "text-[#aaa]"} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={contentBase}
          position="popper"
          sideOffset={6}
          align="start"
          avoidCollisions
        >
          <RadixSelect.ScrollUpButton className={scrollBtnBase}>
            <ChevronUp size={12} />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item key={opt.value} value={opt.value} className={itemBase}>
                {/* Optional color dot */}
                {opt.color && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: opt.color }}
                  />
                )}
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="ml-auto">
                  <Check size={11} className={isDark ? "text-white" : "text-black"} />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className={scrollBtnBase}>
            <ChevronDown size={12} />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
