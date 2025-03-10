const GoldLight = 'hsl(45.1deg 100% 70%)';
const GoldDark = 'hsl(44.71deg 41.46% 24.12%)';
const SilverLight = 'rgb(201 201 201)';
const SilverDark = 'rgb(87 87 87)';
const ExclusiveBrandLight = 'hsl(29.63deg 57.78% 48.31%)';
const ExclusiveBrandDark = '#371c03';
const CollectedLight = '#52bdeb';
const CollectedDark = '#0a4067';

const PrimaryMain = 'hsl(45.1deg 100% 70%)';
const PrimaryLight = 'hsl(45.1deg 100% 90%)';
const PrimaryDark = 'hsl(45 90% 60% / 1)'; // versión Dark se resta 10% de L y H

const SecondaryMain = 'hsl(0deg 0% 78.82%)';
// versión Dark se suma 10% de L y H
const SecondaryLight = 'hsl(0deg 0% 88.82%)';
// versión Dark se resta 10% de L y H
const SecondaryDark = 'hsl(0deg 0% 68.82%)';

const Dark = 'hsl(0deg 0% 0%)';
const Light = 'hsl(0deg 0% 100%)';

const GoldAbbr = 'AU';
const SilverAbbr = 'AG';
const CollectedAbbr = 'VI';
const ExclusiveBrandAbbr = 'RE';

const Token = {
    Color: {
        GoldLight,
        GoldDark,
        SilverLight,
        SilverDark,
        PrimaryMain,
        PrimaryLight,
        PrimaryDark,
        SecondaryMain,
        SecondaryLight,
        SecondaryDark,
        ExclusiveBrandLight,
        ExclusiveBrandDark,
        CollectedLight,
        CollectedDark,
        Dark,
        Light,
    },
    Abbr: {
        Gold: GoldAbbr,
        Silver: SilverAbbr,
        Collected: CollectedAbbr,
        ExclusiveBrand: ExclusiveBrandAbbr,
    },
}

export default Token;