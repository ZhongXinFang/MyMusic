<template>
    <div ref="form" class="from window open-closed" @mousedown="formStore.BringToTop(formData.id)">
        <div class="from-head">
            <div class="from-head-left">
                <span class="from-head-left-text">上传歌曲</span>
            </div>
            <div class="from-head-right">
                <button @click="formData.isShow = false" title="隐藏窗口" class="from-head-io-button"
                    v-show="formData.showMinimize">
                    <img src="@/assets/icon/最小化.svg" alt="">
                </button>
                <button title="放大窗口" class="from-head-io-button" v-show="formData.showMaximize">
                    <img src="@/assets/icon/最大化.svg" alt="">
                </button>
                <button @click="formStore.CloneForm(formData.id)" title="关闭窗口" class="from-head-io-button"
                    v-show="formData.showClose">
                    <img src="@/assets/icon/关闭.svg" alt="">
                </button>
            </div>
        </div>
        <div class="from-body" @mousedown.stop>
            <div class="search-box">
                <div class="song-up">
                    <el-upload :action="baseUrl + '/SongFile/AddMusicFile'" :headers="headers"
                        :on-success="(response: any) => UpFileSuccess(response, UpSuccessTypeEnum.SongFile)"
                        :before-upload="(rawFile: any) => UpFielBefore(rawFile, UpSuccessTypeEnum.SongFile)" :limit="1">
                        <el-button slot="trigger" size="small" type="primary">上传歌曲文件</el-button>
                    </el-upload>
                </div>
                <div class="song-up">
                    <el-upload :action="baseUrl + '/SongFile/AddMusicFile'" :headers="headers"
                        :on-success="(response: any) => UpFileSuccess(response, UpSuccessTypeEnum.LyricFile)"
                        :before-upload="(rawFile: any) => UpFielBefore(rawFile, UpSuccessTypeEnum.LyricFile)" :limit="1">
                        <el-button slot="trigger" size="small" type="primary">上传歌词文件(.lrc)</el-button>
                    </el-upload>
                </div>
                <div class="song-up">
                    <el-upload :action="baseUrl + '/SongFile/AddMusicFile'" :headers="headers"
                        :on-success="(response: any) => UpFileSuccess(response, UpSuccessTypeEnum.ImgFile)"
                        :before-upload="(rawFile: any) => UpFielBefore(rawFile, UpSuccessTypeEnum.ImgFile)" :limit="1">
                        <el-button slot="trigger" size="small" type="primary">上传封面文件</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="res-box">
                <el-form label-position="top" label-width="100px" :inline="true" :model="songInfo">
                    <el-form-item label="歌曲名称" class="a1">
                        <el-input v-model="songInfo.Title" />
                    </el-form-item>
                    <el-form-item label="专辑">
                        <el-input v-model="songInfo.Album" />
                    </el-form-item>
                    <el-form-item label="发行日期">
                        <el-date-picker v-model="songInfo.Publicationdate" type="date" placeholder="选择日期" size="default"
                            class="form-item-width" />
                        <!-- <el-input v-model="songInfo.Publicationdate" /> -->
                    </el-form-item>
                    <el-form-item label="歌手">
                        <el-select v-model="songInfo.ArtistId" placeholder="选择歌手" class="form-item-width">
                            <el-option v-for="item in Artists" :key="item.Id" :label="item.Firstname + item.Lastname"
                                :value="item.Id" />
                        </el-select>
                        <!-- <el-input v-model="songInfo.ArtistId" /> -->
                    </el-form-item>
                    <el-form-item label="作曲家">
                        <el-select v-model="songInfo.ComposerArtistId" placeholder="选择作曲家" class="form-item-width">
                            <el-option v-for="item in Artists" :key="item.Id" :label="item.Firstname + item.Lastname"
                                :value="item.Id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作词家">
                        <el-select v-model="songInfo.LyricistArtistId" placeholder="选择作词家" class="form-item-width">
                            <el-option v-for="item in Artists" :key="item.Id" :label="item.Firstname + item.Lastname"
                                :value="item.Id" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bom-box">
                <a class="addpr" title="此功能暂时没有启用">添加艺术家</a>
                <el-button type="primary" size="small" @click="formStore.CloneForm(formData.id)">取消</el-button>
                <el-button type="primary" size="small" @click="AddSongBtn">提交</el-button>
                <span title="因为还有其他功能没有开放，好吧确实就是..." class="addpr-info">为什么这么丑？</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import interact from 'interactjs'
import { ElMessage } from 'element-plus'
import { plainToClass } from "class-transformer";
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { useFormStore } from '@/stores/FormStore.js'
import { baseUrl } from '@/httpUnit/APIBase.ts'
import { useSongStore } from '@/stores/SongStore.js'
import { AllArtist, AddSong } from '@/httpUnit/SongAPI.ts'
import { ArtistReqDto } from '@/httpUnit/Models/ArtistReqDto.ts'
import { AddSongReqDto } from '@/httpUnit/Models/AddSongReqDto.ts'
import { SongReqDto } from '@/httpUnit/Models/SongReqDto.ts'
import { UploadFilesResDto } from '@/httpUnit/Models/UploadFilesResDto.ts'

const props = defineProps({
    id: {
        type: String,
        required: true
    },
})

const formStore = useFormStore()
const songStore = useSongStore()
const formData = ref<FormDataModel>(new FormDataModel(AppFormEnum.AddSongForm, false, props.id))

const headers = {
    Authorization: ""
}

const AddSongBtn = async () => {
    const res = await AddSong(songInfo.value);
    if (res != null) {
        songStore.AddSong(res as SongReqDto)
        ElMessage.success("添加成功")
        formStore.CloneForm(formData.value.id)
    }
    else
    {
        ElMessage.error("添加失败")
    }
}

const Artists = ref<ArtistReqDto[]>(null!)

const songInfo = ref<AddSongReqDto>(new AddSongReqDto())

enum UpSuccessTypeEnum {
    SongFile = 'SongFile',
    LyricFile = 'LyricFile',
    ImgFile = 'ImgFile',
}

const UpFileSuccess = (response: any, type: UpSuccessTypeEnum) => {
    const res: UploadFilesResDto = plainToClass(UploadFilesResDto, response)
    switch (type) {
        case UpSuccessTypeEnum.ImgFile:
            songInfo.value.Backgroundimgjson = JSON.stringify([res.FileName])
            songInfo.value.Coverimgjson = JSON.stringify([res.FileName])
            break;
        case UpSuccessTypeEnum.LyricFile:
            songInfo.value.Lyricfilesjson = JSON.stringify([res.FileName])
            break;
        case UpSuccessTypeEnum.SongFile:
            songInfo.value.Audiofilesjson = JSON.stringify([res.FileName])
            break;
    }
}

const UpFielBefore = (rawFile: any, type: UpSuccessTypeEnum) => {
    const fileType: string = rawFile.type
    const fileName: string = rawFile.name
    switch (type) {
        case UpSuccessTypeEnum.ImgFile:
            if (fileType.indexOf('image') < 0) {
                ElMessage.error("请选择图片文件，如 .jpg,.png 等")
                return false
            }
            break;
        case UpSuccessTypeEnum.LyricFile:
            if (fileName.indexOf('lrc') < 0) {
                ElMessage.error("请选择 lrc 歌词文件,暂时只支持 lrc 格式的歌词")
                return false
            }
            break;
        case UpSuccessTypeEnum.SongFile:
            if (fileType.indexOf('audio') < 0) {
                ElMessage.error("请选择音频文件，如 .mp3,.opus 等")
                return false
            }
            break;
    }
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

onMounted(async () => {
    formData.value.showMinimize = true
    formData.value.showMaximize = false
    formData.value.showClose = true

    formStore.AddForm(formData.value)
    formData.value.isShow = false
    interact(form.value!)
        .resizable({
            // 可以从所有边缘和角落进行调整大小
            edges: { left: true, right: true, bottom: true, top: false },
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
            ignoreFrom: '.from-body',
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ]
        });

    // 读取 token
    const token = localStorage.getItem('token');
    headers.Authorization = 'bearer ' + token;

    const ArtistsRes: ArtistReqDto[] = await AllArtist() ?? [] as ArtistReqDto[]
    if (ArtistsRes.length === 0)
        console.log("获取歌手失败");
    Artists.value = ArtistsRes
})

</script>

<style scoped>
.res-box>>>.form-item-width {
    width: 196px !important;
}

.form-item-width {
    width: 196px !important;
}

.addpr-info {
    color: rgb(168, 170, 172);
    cursor: pointer;
}

.addpr-info:hover {
    /* 添加下划线 */
    text-decoration: underline;
}

.addpr {
    position: absolute;
    bottom: 5px;
    left: 5px;
}

.bom-box>* {
    margin-inline: 5px;
}

.bom-box {
    position: relative;
    min-height: 80px;
    display: flex;
    /* 从右向左 */
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    /* 垂直向下 */
    align-items: flex-end;
    padding: 10px;
}

.res-box>>>.el-form-item__label {
    color: #fff !important;
}

.res-box>>>input,
.res-box>>>.el-form-item__content,
.res-box>>>.el-input__wrapper {
    background-color: #353539;
    color: #eee;
}

.res-box {
    margin-inline: 10px;
}

.song-up {
    background-color: #d9d4cf;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    width: 300px;
    min-height: 90px;
    margin-left: 10px;
}

/* .song-up:nth-child(1)
{
    background-color: #d4dfe6;
}
.song-up:nth-child(2)
{
    background-color: #d4dfe6;
} */

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
    display: flex;
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
    border-radius: 8px;
    padding: 5px;
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
    background: #4b494b no-repeat fixed center;
    border-radius: 12px;
    overflow: hidden;

    width: 760px;
    height: 560px;

    display: flex;
    /* 垂直布局 */
    flex-direction: column;
    /* 显示一行 */
    flex-wrap: nowrap;
}
</style>