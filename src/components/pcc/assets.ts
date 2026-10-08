const bottleScene = '/pcc-bottle-official.svg';
const tableScene = '/pcc-table.svg';
const labelScene = '/pcc-label.svg';
const eventScene = '/pcc-event.svg';
const logoFull = '/pcc-logo.svg';
const logoIcon = '/pcc-icon-logo.svg';
const bottleBlueprint = '/pcc-bottle-blueprint.svg';

export const pccAssets = {
  heroSlide01: bottleScene,
  heroSlide02: tableScene,
  heroSlide03: eventScene,
  solutionCustomLabels: labelScene,
  solutionBottleBranding: bottleScene,
  solutionTableBranding: tableScene,
  solutionEventBranding: eventScene,
  solutionBusinessSupply: bottleScene,
  industryCafes: tableScene,
  industryRestaurants: tableScene,
  industryHotels: tableScene,
  industryEvents: eventScene,
  workMarinate: tableScene,
  workCafeNuwara: bottleScene,
  workSeema: tableScene,
  workDivineStreet: eventScene,
  workChillKandy: bottleScene,
  finalCtaImage: tableScene,
  pccLogoIcon: logoIcon,
  pccLogoFull: logoFull,
  bottleBlueprint,
} as const;

export type PccAssetId = keyof typeof pccAssets;
