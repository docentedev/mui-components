import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MaterialType } from '.';
import { describe, expect, it } from 'vitest';

describe('MaterialType Component', () => {
    it('should render the material type', () => {
        const { getByText } = render(
            <MaterialType material="Gold" text="001" />
        );

        expect(getByText('001')).toBeInTheDocument();
    });
});