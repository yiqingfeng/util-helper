<template>
    <div class="p-content">
        <h1>z-Index 悬停过渡</h1>

        <div class="m-intron">
            <div class="item" v-for="(icon, index) in icons" :key="index">
                <div class="item-logo">
                    <img :src="icon.icon" />
                </div>
                <div class="item-desc">
                    <div class="item-desc_img">
                        <img :src="icon.icon" />
                    </div>
                    <div class="item-desc_content">
                        <div class="name">{{ icon.name }}</div>
                        <div class="tool">{{ icon.tool }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import img1 from '../assets/images/潘凤.png';
import img2 from '../assets/images/神甘宁.jpeg';
import img3 from '../assets/images/夏侯惇.png';
import img4 from '../assets/images/钟繇.png';

interface Item {
    icon: string;
    name: string;
    tool: string;
}

@Options({

})
export default class Navs extends Vue {
    icons: Item[] = [
        {
            icon: img1,
            name: '潘凤',
            tool: '我们来拼点吧',
        },
        {
            icon: img2,
            name: '神甘宁',
            tool: '神甘宁',
        },
        {
            icon: img3,
            name: '夏侯惇',
            tool: '夏侯惇',
        },
        {
            icon: img4,
            name: '钟繇',
            tool: '钟繇',
        }
    ]
}
</script>

<style lang="less" scoped>
@logo-width: 70px;
@content-padding: 8px;

.arrow-down(@width, @color) {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0 - @width;
    left: 50%;
    border-top: @width solid @color;
    border-left: @width solid transparent;
    border-right: @width solid transparent;
    transform: translateX(0 - @width);
    z-index: -1;
}

.p-content {
    background-color: #0396ff;
    color: #fff;
}


.m-intron {
    display: flex;
    align-items: flex-end;
    height: 400px;
    margin: 0 200px;

    .item {
        position: relative;
        margin: 0 5px;

        &:hover {
            .item-desc_content {
                opacity: 1;
                transform: translateY(-4px);
            }

            .item-desc {
                left: -200px;
                transform: translateX(80px);
                z-index: 12;
                transition: left 0.5s, z-index 0s, transform 0.5s;
                transition-delay: 0s, 0.5s, 0.5s;
            }
        }

        &-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            width: @logo-width;
            height: @logo-width;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 5px 10px rgba(0, 0, 0, .25);
            cursor: pointer;

            img {
                box-sizing: border-box;
                width: 95%;
                height: 95%;
                border: 3px solid #0396ff;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        &-desc {
            position: absolute;
            left: 50%;
            bottom: 1.3 * @logo-width;
            z-index: 0;

            width: 3.6 * @logo-width;
            height: 4.8 * @logo-width;
            transform: translateX(-50%);
            // background-color: #fff;

            // &:hover {
            //     left: -200px;
            //     transform: translateX(80px);
            //     z-index: 12;
            //     transition: left 0.5s, z-index 0s, transform 0.5s;
            //     transition-delay: 0s, 0.5s, 0.5s;
            // }

            &_img {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border: 3px solid #fff;
                border-radius: 25px;

                &::before {
                    .arrow-down(10px, #fff);
                }
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 25px;
                object-fit: cover;
            }

            &_content {
                // display: none;
                position: absolute;
                left: @content-padding;
                right: @content-padding;
                bottom: 0 - @content-padding;

                box-sizing: border-box;
                padding: @content-padding;
                border-radius: 12px;
                // width: 100%;
                background-color: #fff;
                text-align: center;
                color: #000;

                opacity: 0;
                transition: all 0.4s ease-in;

                &::before {
                    .arrow-down(10px, #fff);
                }
            }

            .name {
                font-size: 20px;
                font-weight: 500;
            }

            .tool {
                margin: -3px 0 5px 0;
                font-size: 17px;
                color: #0396ff;
            }
        }
    }
}
</style>
