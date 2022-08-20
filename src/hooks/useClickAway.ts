import { useEffect, useState, useRef } from "react";

export default function useClickAway<T extends HTMLElement>(
  onClickAway: () => void
) {
  const [active, setActive] = useState(false);

  const ref = useRef<T | null>(null);

  const cbRef = useRef(onClickAway);

  useEffect(() => {
    cbRef.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target instanceof Node)) return;
      if (!ref.current?.contains(e.target)) cbRef.current();
    }
    if (active) document.addEventListener("mousedown", handleClick);
    else document.removeEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [active]);
  return { ref, active, setActive };
}
