<template>
    <div ref="form" class="from window open-closed" @mousedown="formStore.BringToTop(formData.id)">
        <div class="from-head">
            <div class="from-head-left">
                <span class="from-head-left-text">歌曲列表</span>
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
            <div class="search-box">
                <Input search enter-button placeholder="输入歌曲名称" @on-search="Search" />
            </div>
            <div class="res-box">
                <ul>
                    <li v-for="item in searchResult.Data" :title="item.Title">
                        <span class="li-img">
                            <img :src="base + '/SongFile/' +ParseJsonArray(item.Backgroundimgjson)[0]" alt="">
                        </span>
                        <span>
                        </span>
                        <span class="li-title">{{ item.Title }}<span class="li-po">{{ item.ArtistName}}</span></span>
                        <div class="io">
                            <span class="add-list">
                                <img title="添加到播放列表" 
                                @click="AddSongToList(item)"
                                class="io-play" src="@/assets/icon/增加添加加号.svg" alt="">
                            </span>
                            <span>
                                <img title="立即播放" 
                                @click="PlaySong(item)"
                                class="io-play" src="@/assets/icon/播放.svg" alt="">
                            </span>
                        </div>
                        <!-- <span class="li-time">04:05</span> -->
                    </li>
                </ul>
                <div class="page" v-show="searchResult.Count > 0">
                    <Page v-show="searchResult.TotalPage > 1" :model-value="currentPage" :total="searchResult.Count" :page-size="pageSize" simple size="small" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import interact from 'interactjs'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { useFormStore } from '@/stores/FormStore.js'
import { SearchSong } from '@/httpUnit/SongAPI.ts'
import { base } from '@/httpUnit/APIBase.ts'
import { SongReqDto } from '@/httpUnit/Models/SongReqDto.ts'
import { SearchReqDto } from '@/httpUnit/Models/SearchReqDto.ts'
import { useSongStore } from '@/stores/SongStore.js'
import { SearchSongListReqDto } from '@/httpUnit/Models/SearchSongListReqDto.ts'

const formStore = useFormStore()
const songStore = useSongStore()
const formData = ref<FormDataModel>(new FormDataModel(AppFormEnum.SearchSongForm, false, 'id?'))

// 搜索相关
// 搜索字符串
const searchString = ref('')
// 当前分页
const currentPage = ref(1)
const pageSize = ref(20)
// 搜索结果对象
const searchResult = ref<SearchSongListReqDto<SongReqDto>>(new SearchSongListReqDto<SongReqDto>())
    
const Search = async () => {
    const req = new SearchReqDto()
    if (!searchString.value || searchString.value === '')
        req.Q = ' '
    else
        req.Q = searchString.value
    req.Page = currentPage.value
    req.PageSize = pageSize.value

    const res = await SearchSong(req)
    searchResult.value = res ?? new SearchSongListReqDto<SongReqDto>()
}

// 添加歌曲到播放列表
const AddSongToList = (song: SongReqDto) => {
    songStore.AddSong(song)
}
// 播放歌曲
const PlaySong = (song: SongReqDto) => {
    if (songStore.hasSong(song.Id))
        songStore.play(song.Id)
    else
    {
        songStore.AddSong(song)
        songStore.play(song.Id)
    }
}

// 解析json数组
const ParseJsonArray = (json: string) => {
    if (!json || json === '')
        return []
    return JSON.parse(json)
}

// 窗口显示相关
watch(() => formData.value.isShow, (newvalue) => {
    const html = form.value
    if (!html)
        return
    if (newvalue === true) {
        html.classList.remove('closed')
        html.classList.remove('open-closed')
        html.classList.add('show')
    }
    else {
        html.classList.remove('show')
        html.classList.add('closed')
    }
})
watch(() => formData.value.zIndex, (newValue) => {
    const html = form.value
    if (!html)
        return
    html.style.zIndex = newValue.toString()
})

// 窗口拖动相关
const form = ref<HTMLElement>(null!)
const dragMoveListener = (event: any) => {
    const target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.transform = `translate(${x}px, ${y}px)`
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}
onMounted(() => {
    formData.value.showMinimize = true
    formData.value.showMaximize = false
    formData.value.showClose = false

    formStore.AddForm(formData.value)

    Search()

    interact(form.value!)
        .resizable({
            // 可以从所有边缘和角落进行调整大小
            edges: { left: true, right: true, bottom: true, top: true },
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

</script>

<style scoped>
.add-list {
    height: 25px;
    width: 25px;
}

.io>span {
    margin-inline-start: 5px;
}

.io {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    width: 60px;
    height: 100%;
    margin-inline-start: 5px;
}

.io-play {
    width: 20px;
}

span>img {
    width: 100%;
    height: 100%;
}

.page {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    margin-inline: auto;
    max-width: 90%;
    color: aliceblue;
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

.res-box {
    margin-top: 10px;
    height: 100%;
    overflow-y: auto;
}

.search-box {
    width: 90%;
    margin-inline: auto;
    margin-top: 10px;
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
    margin-top: 0;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
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