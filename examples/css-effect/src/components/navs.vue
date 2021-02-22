<template>
    <div class="g-navs">

    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

type menu = {
    url: string;
    name: string;
}

@Options({
    props: {
        menus: Array,
    },
})
export default class Navs extends Vue {
    menus!: menu[];
}
</script>

<style lang="less" scoped>
.g-navs {

}
</style>
