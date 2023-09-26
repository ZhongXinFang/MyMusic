<template>
    <div class="from" ref="draggableRef">
        <div class="from-head">
            <div class="from-head-left">
                <span class="from-head-left-text">播放列表</span>
            </div>
            <div class="from-head-right">
                <button @click="isShow=false" title="隐藏窗口" class="from-head-io-button" v-show="showMinimize">
                    <img src="../assets/icon/最小化.svg" alt="">
                </button>
                <button title="放大窗口" class="from-head-io-button" v-show="showMaximize">
                    <img src="../assets/icon/最大化.svg" alt="">
                </button>
                <button title="关闭窗口" class="from-head-io-button" v-show="showClose">
                    <img src="../assets/icon/关闭.svg" alt="">
                </button>
            </div>
        </div>
        <div class="from-body">
            <div class="info">
                <span class="info-i">共200首歌曲，已缓存120首</span>
                <span class="info-o" title="清空播放列表"><img src="../assets/icon/删除.svg" alt=""></span>
            </div>
            <ul>
                <li v-for="index in 20" title="🎶" :class="{ 'now-playing': playingIndex === index - 1 }">
                    <span class="li-img">
                        <img src="../assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg" alt="">
                        <div v-if="playingIndex === index - 1" class="li-img-playing">
                            <svg width="30" height="10" viewBox="0 0 50 10" style="margin-left: 8px;">
                                <g transform="translate(50%, 50%)">
                                    <rect class="svg-item" id="r1" x="5" y="0" width="4" height="10" />
                                    <rect class="svg-item" id="r2" x="10" y="0" width="4" height="10" />
                                    <rect class="svg-item" id="r3" x="15" y="0" width="4" height="10" />
                                    <rect class="svg-item" id="r4" x="20" y="0" width="4" height="10" />
                                </g>
                            </svg>
                        </div>
                    </span>
                    <span>
                    </span>
                    <span class="li-title">听妈妈的话</span>
                    <span class="li-po">周杰伦</span>
                    <span class="li-time">04:05</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import interact from 'interactjs'
import { useForm } from '@/components/FormBase/useForm.ts'

const { showMaximize, showMinimize, showClose, isShow } = useForm()

// 播放列表相关
// 正在播放的行索引(从 0 开始)
const playingIndex = ref(2)


// 窗口拖动相关
const draggableRef = ref(null)
const dragMoveListener = (event: any) => {
    const target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.transform = `translate(${x}px, ${y}px)`
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

onMounted(() => {
    showMinimize.value = true
    showMaximize.value = false
    showClose.value = false

    interact(draggableRef.value!)
        .resizable({
            // 可以从所有边缘和角落进行调整大小
            edges: { left: false, right: false, bottom: false, top: true },
            listeners: {
                move(event) {
                    const target = { value: event.target}
                    if (target.value === null)
                        return
                    let x = (parseFloat(target.value.getAttribute('data-x')) || 0);
                    let y = (parseFloat(target.value.getAttribute('data-y')) || 0);

                    // 更新元素的样式
                    target.value.style.width = event.rect.width + 'px';
                    target.value.style.height = event.rect.height + 'px';

                    // 当从顶部或左侧边缘调整大小时进行平移
                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.value.style.transform = `translate(${x}px, ${y}px)`;

                    target.value.setAttribute('data-x', x);
                    target.value.setAttribute('data-y', y);
                }
            },
            modifiers: [
                // 限制边缘在父元素内
                interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),
                // 最小尺寸
                interact.modifiers.restrictSize({
                    min: { width: 100, height: 50 }
                })
            ],
            inertia: true
        })
        .draggable({
            listeners: { move: dragMoveListener },
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ]
        });
})
</script>

<style scoped>
.info-o>img {
    position: relative;
    top: -80px;
    filter: drop-shadow(0 80px 0 #adaaaa);
}

.info-o {
    width: 28px;
    height: 36px;
    cursor: pointer;
    margin-right: 5px;
}

span>img {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.info-i {
    color: #aaaaaa;
    font-size: 14px;
    display: flex;
    /* 垂直布局 */
    flex-direction: column-reverse;
    flex-wrap: nowrap;
    margin-bottom: 5px;
    margin-left: 5px;
}

.li-img-playing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #22222266;
    display: flex;
    justify-content: center;
    align-items: center;
}


.now-playing {
    background-color: #5c5c63;
}

@keyframes audio-wave {

    0%,
    100% {
        height: 10px;
        y: 0;
    }

    25% {
        height: 2px;
        y: 8px;
    }

    50% {
        height: 8px;
        y: 2px;
    }

    75% {
        height: 6px;
        y: 4px;
    }
}

.svg-item {
    fill: #dddddd;
    animation: audio-wave 1s infinite;
}

#r1 {
    animation-delay: 0.2s;
}

#r2 {
    animation-delay: 0.4s;
}

#r3 {
    animation-delay: 0.6s;
}

#r4 {
    animation-delay: 0.8s;
}

#r5 {
    animation-delay: 1s;
}

.info {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #353539;
    display: flex;
    /* 水平布局 */
    flex-direction: row;
    /* 显示一行 */
    flex-wrap: nowrap;
    /* 贴边平分边距 */
    justify-content: space-between;
}

.li-title {
    color: rgb(208, 218, 228);
    flex: 1;
    margin-inline-start: 8px;
}

.li-po,
.li-time {
    color: rgb(168, 173, 177);
    margin-inline-start: 8px;
    font-size: 80%;
}

.li-img>img {
    width: 100%;
    height: 100%;
}

.li-img {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 10px;
    overflow: hidden;
}

.from-body li>span {
    display: flex;
    align-items: center;
}

.from-body li {
    padding-inline: 8px;
    color: aliceblue;
    font-size: 16px;
    padding-block: 5px;
    display: flex;
    /* 水平布局 */
    flex-direction: row;
    /* 显示一行 */
    flex-wrap: nowrap;
    /* 贴边平分边距 */
    justify-content: space-between;
    /* 垂直居中 */
    align-items: center;
    cursor: pointer;
}

.from-body li:hover {
    background-color: #353539;
}

.from-body>ul {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: 8px;
    flex: 1;
    overflow: auto;
}

::-webkit-scrollbar-corner {
    display: none;
}

::-webkit-scrollbar {
    border-radius: 7px;
    height: 14px;
    width: 14px;
}

::-webkit-scrollbar-thumb {
    background: #7f7f7f70;
    background-clip: padding-box;
    border: 6px solid transparent;
    border-radius: 10px;
}

.from-body {
    background-color: #00000000;
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.from-head-left-text {
    color: #dddddd;
}

.from-head-right {
    display: flex;
}

.from-head-io-button>img {
    height: 100%;
    width: 20px;
    position: relative;
    top: -80px;
    filter: drop-shadow(0 80px 0 #fff);
}

.from-head-left {
    padding-inline-start: 11px;
    line-height: 30px;
}

.from-head-io-button:hover {
    background-color: #353539;
}

.from-head-io-button {
    background-color: #00000000;
    border-radius: 0;
}

.from-head {
    height: 30px;
    display: flex;
    /* 水平布局 */
    flex-direction: row;
    /* 显示一行 */
    flex-wrap: nowrap;
    /* 贴边平分边距 */
    justify-content: space-between;
}

.from {
    min-width: 300px;
    min-height: 200px;
    background: #4b494b no-repeat fixed center;
    border-radius: 12px;
    overflow: hidden;

    display: flex;
    /* 垂直布局 */
    flex-direction: column;
    /* 显示一行 */
    flex-wrap: nowrap;
}
</style>