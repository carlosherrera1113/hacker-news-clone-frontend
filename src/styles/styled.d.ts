import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
        mediaQueries: {
            smallest: string;
            smaller: string;
            small: string;
            medium: string;
            large: string;
            larger: string;
            largest: string;
        };
    }
}
