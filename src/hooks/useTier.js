import { useMemo } from 'react';
import { TIERS } from '../data/constants';

export function useTier(pontos) {
  return useMemo(() => {
    const tierIndex = TIERS.findIndex(t => pontos >= t.min && pontos <= t.max);
    const tier      = TIERS[tierIndex] ?? TIERS[0];
    const nextTier  = tierIndex < TIERS.length - 1 ? TIERS[tierIndex + 1] : null;
    const progress  = nextTier
      ? ((pontos - tier.min) / (nextTier.min - tier.min)) * 100
      : 100;
    return { tier, nextTier, progress: Math.min(progress, 100) };
  }, [pontos]);
}
