import bottle from '@/assets/pcc-bottle.svg';
const BASE='https://id-preview--4141feba-bc0f-4506-acbe-cc0ff60e041d.lovable.app/__l5e/assets-v1/';
const restaurant=BASE+'9d744daa-307f-4088-9658-eb376a7b97a4/restaurant-scene.jpg';
const bottleRange=BASE+'66a139da-4e82-4609-a75c-d02e374d7dc4/bottle-range.jpg';
const finalTable=BASE+'55c362ec-6776-4905-82e7-b285a11a1b71/final-table.jpg';
export const pccAssets={heroSlide01:bottle,heroSlide02:restaurant,heroSlide03:finalTable,solutionCustomLabels:restaurant,solutionBottleBranding:bottle,solutionTableBranding:finalTable,solutionEventBranding:restaurant,solutionBusinessSupply:bottleRange,industryCafes:restaurant,industryRestaurants:finalTable,industryHotels:restaurant,industryEvents:finalTable,workMarinate:restaurant,workCafeNuwara:finalTable,workSeema:bottleRange,workDivineStreet:bottle,workChillKandy:restaurant,finalCtaImage:finalTable,pccLogoIcon:null,pccLogoFull:null,bottleBlueprint:null} as const;
export type PccAssetId=keyof typeof pccAssets;