import merge from 'lodash.merge';
import { Theme } from '@mui/material';
import Stack from './Stack';

export default function ComponentsOverrides(theme: Theme) {
    return merge(
        Stack(theme)
    );
}
