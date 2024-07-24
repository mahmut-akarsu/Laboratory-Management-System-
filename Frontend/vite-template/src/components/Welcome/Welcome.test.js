import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';
describe('Welcome component', () => {
    it('has correct Vite guide link', () => {
        render(_jsx(Welcome, {}));
        expect(screen.getByText('this guide')).toHaveAttribute('href', 'https://mantine.dev/guides/vite/');
    });
});
