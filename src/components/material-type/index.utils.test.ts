import { describe, it, expect } from 'vitest';
import { getColorBackground, getColorText, getAbbr } from './index.utils';
import { Material } from './types';
import Token from '../../tokens';

describe('Utils for MaterialType', () => {
    const materials: Material[] = ['Gold', 'Silver', 'ExclusiveBrand', 'Collected'];

    materials.forEach((material) => {
        describe(`For material ${material}`, () => {
            it('should return the correct background color', () => {
                const result = getColorBackground(material);
                switch (material) {
                    case 'Gold':
                        expect(result).toBe(Token.Color.GoldLight);
                        break;
                    case 'Silver':
                        expect(result).toBe(Token.Color.SilverLight);
                        break;
                    case 'ExclusiveBrand':
                        expect(result).toBe('hsl(0deg 0% 20%)');
                        break;
                    case 'Collected':
                        expect(result).toBe('hsl(0deg 0% 50%)');
                        break;
                }
            });

            it('should return the correct text color', () => {
                const result = getColorText(material);
                switch (material) {
                    case 'Gold':
                        expect(result).toBe(Token.Color.GoldDark);
                        break;
                    case 'Silver':
                        expect(result).toBe(Token.Color.SilverDark);
                        break;
                    case 'ExclusiveBrand':
                        expect(result).toBe('hsl(0deg 0% 100%)');
                        break;
                    case 'Collected':
                        expect(result).toBe('hsl(0deg 0% 100%)');
                        break;
                }
            });

            it('should return the correct abbreviation', () => {
                const result = getAbbr(material);
                switch (material) {
                    case 'Gold':
                        expect(result).toBe(Token.Abbr.Gold);
                        break;
                    case 'Silver':
                        expect(result).toBe(Token.Abbr.Silver);
                        break;
                    case 'ExclusiveBrand':
                        expect(result).toBe(Token.Abbr.ExclusiveBrand);
                        break;
                    case 'Collected':
                        expect(result).toBe(Token.Abbr.Collected);
                        break;
                }
            });
        });
    });
});
