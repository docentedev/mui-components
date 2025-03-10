import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MaterialType } from '.';
import { describe, expect, it } from 'vitest';

describe('MaterialType Component', () => {
    it('should render the material type', () => {
        const { getByRole } = render(
            <MaterialType material="Gold" label="AU" />
        );
        const label = getByRole('span');
        expect(label).toBeInTheDocument();
    });
});