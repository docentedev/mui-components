import Token from '../../tokens';
import { Material } from './types';

export const getColorBackground = (material: Material) => {
    switch (material) {
        case 'Gold':
            return Token.Color.GoldLight;
        case 'Silver':
            return Token.Color.SilverLight;
        case 'ExclusiveBrand':
            return 'hsl(0deg 0% 20%)';
        case 'Collected':
            return 'hsl(0deg 0% 50%)';
    }
}

export const getColorText = (material: Material) => {
    switch (material) {
        case 'Gold':
            return Token.Color.GoldDark;
        case 'Silver':
            return Token.Color.SilverDark;
        case 'ExclusiveBrand':
            return 'hsl(0deg 0% 100%)';
        case 'Collected':
            return 'hsl(0deg 0% 100%)';
    }
}

export const getAbbr = (material: Material) => {
    switch (material) {
        case 'Gold':
            return Token.Abbr.Gold;
        case 'Silver':
            return Token.Abbr.Silver;
        case 'ExclusiveBrand':
            return Token.Abbr.ExclusiveBrand;
        case 'Collected':
            return Token.Abbr.Collected;
    }
}