import { useMemo } from "react";
import { TIERS } from "../data/constants";

export function useTier(pontos) {
  return useMemo(() => {
    const idx = TIERS.findIndex((t) => pontos >= t.min && pontos <= t.max);
    const tier = TIERS[idx] ?? TIERS[0];
    const nextTier = idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
    const progress = nextTier
      ? ((pontos - tier.min) / (nextTier.min - tier.min)) * 100
      : 100;
    return { tier, nextTier, progress: Math.min(progress, 100) };
  }, [pontos]);
}
