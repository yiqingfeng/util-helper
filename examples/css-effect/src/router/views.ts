
import { RouteRecordRaw } from 'vue-router'

const content = require.context('../views', false, /[\w_-]+.vue$/)

const routes: RouteRecordRaw[] = [];

content.keys()
    .forEach(fileName => {
        const name: string = (fileName.match(/([\w_-]+).vue$/)?.[1] ?? '').toLowerCase();
        if (name) {
            const VueComponent: any = content(fileName)?.default;
            routes.push({
                path: `/${name}`,
                name: '',
                component: VueComponent,
            })
        }
    })

export default routes;
