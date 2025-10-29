
export type OrbitalTier = 'core' | 'inner' | 'outer';
export type SizePreset = 'small' | 'medium' | 'large' | 'extra-large';

interface OrbitalProperties {
  size: number;
  orbit: number;
  angle: number;
  speed: number;
}

const tierConfig: Record<OrbitalTier, { orbit: number, speed: number }> = {
  core: { orbit: 0, speed: 0 },
  inner: { orbit: 280, speed: 0.6 },
  outer: { orbit: 380, speed: 0.4 },
};

const sizeConfig: Record<SizePreset, { size: number }> = {
  small: { size: 50 },
  medium: { size: 70 },
  large: { size: 90 },
  'extra-large': { size: 192 }, // Sun size
};

export function getOrbitalProperties(tier: OrbitalTier = 'inner', sizePreset: SizePreset = 'medium'): OrbitalProperties {
  const tierProps = tierConfig[tier] || tierConfig.inner;
  const sizeProps = sizeConfig[sizePreset] || sizeConfig.medium;

  return {
    ...tierProps,
    ...sizeProps,
    angle: Math.random() * 360, // Randomize starting angle for variety
  };
}

    