import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Icon, { type IconName } from "./Icon";

export type SelectOption = { value: string; label: string; hint?: string };

type Props = {
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
  icon?: IconName;
  placeholder?: string;
  label?: string;
};

/** shadcn/ui–style select: trigger + animated popover listbox with keyboard support */
export default function Select({ value, options, onChange, icon, placeholder, label }: Props) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState(0);
  const [rect, setRect] = useState<{ left: number; top: number; width: number; up: boolean } | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const id = useId();

  const current = options.find((o) => o.value === value);

  const place = useCallback(() => {
    const r = trigger.current?.getBoundingClientRect();
    if (!r) return;
    const h = Math.min(options.length * 46 + 12, 280);
    const up = r.bottom + h + 12 > window.innerHeight && r.top > h + 12;
    setRect({ left: r.left, width: r.width, top: up ? r.top - h - 8 : r.bottom + 8, up });
  }, [options.length]);

  const show = () => {
    place();
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setClosing(false);
    setOpen(true);
  };

  const hide = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 140);
  }, []);

  const pick = (v: string) => {
    onChange(v);
    hide();
    trigger.current?.focus();
  };

  useLayoutEffect(() => {
    if (open) list.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!list.current?.contains(t) && !trigger.current?.contains(t)) hide();
    };
    const onScroll = (e: Event) => {
      if (!list.current?.contains(e.target as Node)) hide();
    };
    document.addEventListener("pointerdown", onDoc);
    window.addEventListener("resize", hide);
    document.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      window.removeEventListener("resize", hide);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [open, hide]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(options[active].value);
    } else if (e.key === "Escape" || e.key === "Tab") {
      hide();
      trigger.current?.focus();
    }
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`sel-trigger ${open ? "open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => (open ? hide() : show())}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            show();
          }
        }}
      >
        {icon && (
          <span className="sel-ic">
            <Icon name={icon} size={16} />
          </span>
        )}
        <span className={`grow sel-value ${current ? "" : "ph"}`}>{current?.label ?? placeholder}</span>
        <Icon name="chevronDown" size={18} className="sel-chev" />
      </button>

      {open &&
        rect &&
        createPortal(
          <div
            ref={list}
            id={id}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${id}-${active}`}
            className={`sel-pop ${rect.up ? "up" : ""} ${closing ? "closing" : ""}`}
            style={{ left: rect.left, top: rect.top, width: rect.width }}
            onKeyDown={onKey}
          >
            {options.map((o, i) => (
              <div
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={o.value === value}
                className={`sel-opt ${i === active ? "active" : ""} ${o.value === value ? "on" : ""}`}
                style={{ animationDelay: `${i * 25}ms` }}
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(o.value)}
              >
                <span className="grow">
                  {o.label}
                  {o.hint && <small>{o.hint}</small>}
                </span>
                {o.value === value && <Icon name="check" size={17} stroke={2.6} />}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
