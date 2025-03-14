import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Breadcrumb from './index';


describe('Breadcrumb', () => {
    test('should render', () => {
        render(
            <Breadcrumb items={[{ label: 'Home' }, { label: 'Page'}]} />
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Page')).toBeInTheDocument();
    });
});