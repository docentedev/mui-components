import Token from '../../tokens';
import { Material } from './types';

export const getColorBackground = (material: Material) => {
    switch (material) {
        case 'Gold':
            return Token.Color.GoldLight;
        case 'Silver':
            return Token.Color.SilverLight;
        case 'ExclusiveBrand':
            return Token.Color.ExclusiveBrandLight;
        case 'Collected':
            return Token.Color.CollectedLight;
    }
}

export const getColorText = (material: Material) => {
    switch (material) {
        case 'Gold':
            return Token.Color.GoldDark;
        case 'Silver':
            return Token.Color.SilverDark;
        case 'ExclusiveBrand':
            return Token.Color.ExclusiveBrandDark;
        case 'Collected':
            return Token.Color.CollectedDark;
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