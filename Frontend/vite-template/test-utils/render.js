import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { theme } from '../src/theme';
export function render(ui) {
    return testingLibraryRender(_jsx(_Fragment, { children: ui }), {
        wrapper: ({ children }) => (_jsx(MantineProvider, { theme: theme, children: children })),
    });
}
