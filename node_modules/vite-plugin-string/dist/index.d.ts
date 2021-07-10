import { Plugin } from 'vite';
import { FilterPattern } from '@rollup/pluginutils';
export interface Options {
    include?: FilterPattern;
    exclude?: FilterPattern;
    compress?: boolean | ((code: string) => string);
}
export default function (userOptions?: Options): Plugin;
