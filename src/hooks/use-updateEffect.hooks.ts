import { DependencyList, EffectCallback, useEffect } from "react";
import useIsFirstRender from "./use-isFirstRender.hooks";

export default function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    !isFirst && effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
