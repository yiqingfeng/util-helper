/**
 * @description utils 集合
 */
import * as util from './util';
import ajax from './ajax';
import File from './file';

export default {
    ajax,
    File,
    ...util,
};
