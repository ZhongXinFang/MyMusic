<template>
    <div ref="draggableRef" class="from window closed open-closed" @mousedown="formStore.BringToTop(formData.id)">
        <div class="from-head">
            <div class="from-head-left">
                <span class="from-head-left-text">播放列表</span>
            </div>
            <div class="from-head-right">
                <button @click="formData.isShow = false" title="隐藏窗口" class="from-head-io-button"
                    v-show="formData.showMinimize">
                    <img src="@/assets/icon/最小化.svg" alt="">
                </button>
                <button title="放大窗口" class="from-head-io-button" v-show="formData.showMaximize">
                    <img src="@/assets/icon/最大化.svg" alt="">
                </button>
                <button title="关闭窗口" class="from-head-io-button" v-show="formData.showClose">
                    <img src="@/assets/icon/关闭.svg" alt="">
                </button>
            </div>
        </div>
        <div class="from-body">
            <div class="info">
                <span class="info-i">共{{songStore.userPlayList.length}}首歌曲，缓存功能未启用</span>
                <span v-show="false" class="info-o" title="清空播放列表"><img src="@/assets/icon/删除.svg" alt=""></span>
            </div>
            <ul>
                <li v-for="(item,index) in songStore.userPlayList" title="点击播放" 
                :class="{ 'now-playing': songStore.currentUserSongIndex === index }"
                @click="songStore.play(item.Id)">
                    <span class="li-img">
                        <img :src="base + '/SongFile/' + ParseJsonArray(item.Backgroundimgjson)?.[0]" alt="">
                        <div v-show="songStore.currentUserSongIndex === index " class="li-img-playing">
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
                    <span class="li-title">{{ item.Title ?? '-' }}</span>
                    <span class="li-po">{{ item.ArtistName ?? '-' }}</span>
                    <span class="li-time"> {{ item.Album ?? '-' }} </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {  ref, onMounted, watch, onUnmounted } from 'vue'
import interact from 'interactjs'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { useTeBarStore } from '@/stores/TeBarStore.js'
import { useFormStore } from '@/stores/FormStore.js'
import { useSongStore } from '@/stores/SongStore.js'
import { base } from '@/httpUnit/APIBase.ts'

const songStore = useSongStore()
const teBarStore = useTeBarStore()
const formStore = useFormStore()
let formData = ref(new FormDataModel(AppFormEnum.PlayingListForm, false, 'id?temp=1'))
// 窗口显示相关
watch(() => formData.value.isShow, (newvalue) => {
    const html = draggableRef.value
    if (!html)
        return
    if (newvalue === true)
    {
        teBarStore.isShow = true
        html.classList.remove('closed')
        html.classList.remove('open-closed')
        html.classList.add('show')
    }
    else
    {
        teBarStore.isShow = false
        html.classList.remove('show')
        html.classList.add('closed')
    }
})

watch(() => formData.value.zIndex, (newValue) =>
{
    const html = draggableRef.value
    if (!html)
        return
    html.style.zIndex = newValue.toString()
})

// 窗口拖动相关
const draggableRef = ref<HTMLElement>(null!)
const dragMoveListener = (event: any) => {
    const target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.transform = `translate(${x}px, ${y}px)`
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

onMounted(() => {
    formStore.AddForm(formData.value)
    formData.value.showMinimize = true
    formData.value.showMaximize = false
    formData.value.showClose = false

    teBarStore.isShow = true

    // 计算窗口显示位置
    // 获取当前窗口的宽高
    const width = draggableRef.value.offsetWidth
    const height = draggableRef.value.offsetHeight
    const x = (teBarStore.position.x + teBarStore.position.width) - width
    const y = teBarStore.position.y - height - 18
    // 设置位置
    draggableRef.value.style.left = x + 'px'
    draggableRef.value.style.top = y + 'px'

    interact(draggableRef.value!)
        .resizable({
            // 可以从所有边缘和角落进行调整大小
            edges: { left: false, right: false, bottom: false, top: true },
            listeners: {
                move(event) {
                    const target = { value: event.target }
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

onUnmounted(() => {
    teBarStore.isShow = false
})

const ParseJsonArray = (json: string | null | undefined) : any[] | null => {
  if (!json || json === '')
    return null
  return JSON.parse(json)
}
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
    padding-inline: 10px;
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
    position: absolute;
    min-width: 300px;
    min-height: 200px;
    width: 320px;
    height: 480px;
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