<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { Howl } from 'howler'
import { emitter } from '@/mitt/mitt.ts';
import TeBar from '@/components/TeBar.vue'
import { base } from '@/httpUnit/APIBase.ts'
import Login from '@/components/Login.vue'
import { useFormStore } from '@/stores/FormStore.js'
import { useSongStore } from '@/stores/SongStore.js'
import SearchSongForm from '@/components/SearchSongForm.vue'
import { generateGuid } from '@/tools/tool.ts'
import PlayingListForm from '@/components/PlayingListForm.vue'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { ComponentClass } from '@/models/ComponentClass.ts'
import { SearchReqDto } from '@/httpUnit/Models/SearchReqDto.ts'
import { SearchSong, GetLyricFileRUrl } from '@/httpUnit/SongAPI.ts'
import { SearchSongListReqDto } from '@/httpUnit/Models/SearchSongListReqDto.ts'
import { SongReqDto } from '@/httpUnit/Models/SongReqDto.ts'
import { PlayModeEnum } from '@/models/PlayModeEnum.ts'
import { LyricModel } from '@/models/LyricModel.ts'

const formStore = useFormStore()
const songStore = useSongStore()

// 用户登录状态验证相关
const isLogin = ref(true)
emitter.on('login', (message) => {
    isLogin.value = message as boolean
})

// 播放器控制相关
let sound: Howl = null!
// 监听进度改变定时器 ts
let ioCurrPlayTimeTimer: number | null = null
// 播放状态改变
watch(() => songStore.playing, (newValue) => {
    if (newValue === true && !sound.playing()) {
        sound.play()
    }
    else {
        sound.pause()
    }
});
// 播放进度改变
watch(() => songStore.ChangeCurrentPercent, (newValue) => {
    if (newValue !== null) {
        sound.seek(songStore.duration / 1000 * newValue)
        songStore.ChangeCurrentTime(null)
    }
});
// 播放时间改变
watch(() => songStore.currentTime, (newValue) => {
    if (newValue !== null) {
        ShowLyric(newValue)
    }
});
// 播放的歌曲改变
watch(() => songStore.currentSong, (newValue) => {
    if (!newValue) return
    playMusic(base + '/SongFile/' + ParseJsonArray(newValue.Audiofilesjson)?.[0])
    InitLyric(ParseJsonArray(newValue.Lyricfilesjson)?.[0])
});
// 音量改变
watch(() => songStore.volume, (newValue) => {
    if (newValue !== null) {
        sound.volume(newValue)
    }
});

// 开始播放音乐
const playMusic = (url: string) => {
    // 是否已经播放过音乐
    let isPlayOve = false
    if (sound !== null) {
        sound.unload()
        isPlayOve = true
    }

    sound = new Howl({
        src: [url], // 音频文件的URL或路径
        autoplay: false, // 自动播放
        loop: songStore.playMode === PlayModeEnum.singleLoop,     // 循环播放
        volume: songStore.volume,     // 音量（0.0到1.0之间）
        html5: true,     // 是否使用HTML5播放器
    });

    // 监听进度改变事件
    sound.on('play', () => {
        songStore.playing = true
        if (ioCurrPlayTimeTimer === null) {
            setInterval(function () {
                const currentTime = sound.seek() * 1000;
                const duration = sound.duration() * 1000;
                const percent = currentTime / duration;

                songStore.duration = duration
                songStore.currentTime = currentTime
                songStore.percent = percent
            }, 100);
        }
    });

    // 监听播放结束事件
    sound.on('end', () => {
        if (songStore.playMode === PlayModeEnum.singleLoop) {
            if (!sound.playing())
                sound.play()
            return
        }
        songStore.next()
    });

    if (isPlayOve) {
        if (!sound.playing())
            sound.play()
    }
}

// 歌词列表
const lyricList = ref<LyricModel[]>([])
// 当前显示的歌词
const currentLyric = ref<LyricModel | null>(null)
// 当前显示歌词的元素
const currentLyricDom = ref<HTMLElement | null>(null)
// 加载歌词
const InitLyric = async (fileName: string) => {
    lyricList.value = await GetLyricFileRUrl(fileName) ?? [] as LyricModel[]
}
// 滚动歌词（time 毫秒）
const ShowLyric = (time: number) => {
    // 查找寻找最后一个小于或者等于当前时间的歌词
    const row = lyricList.value.slice().reverse().find((item) => item.time <= time) ?? null
    if(currentLyric.value === row) return
    // 在页面上寻找指定属性值的元素
    const dom = document.querySelector(`[data-time="${row?.time}"]`)
    currentLyricDom.value?.classList.remove('active')
    dom?.classList.add('active')
    dom?.scrollIntoView({ behavior: "smooth", block: 'center' });
    currentLyric.value = row
    currentLyricDom.value = dom as HTMLElement
}

onMounted(async () => {
    formStore.AddCom(new ComponentClass(generateGuid(), PlayingListForm))
    formStore.AddCom(new ComponentClass(generateGuid(), SearchSongForm))
    document.addEventListener('click', hideMenu);

    // 获取部分歌曲，并且加入播放列表
    const req = new SearchReqDto()
    req.Page = 1
    req.PageSize = 10
    const res = await SearchSong(req) ?? new SearchSongListReqDto<SongReqDto>()
    for (const item of res.Data) {
        songStore.AddSong(item)
    }

    songStore.next()

    // 缓存相关（暂时不启用缓存）
    // const db = new SongService()
    // const mod = new dbSongModel();
    // mod.id = "1"
    // mod.data = "听妈妈的话"
    // // await db.addSong(mod)
    // const song = await db.GetSongById("1")
    // console.log(song);
})
onUnmounted(() => {
    document.removeEventListener('click', hideMenu);
    emitter.off("login");
})

// 计算属性
// 背景图url
const backgroundUrl = computed(() => {
    if (!songStore.currentSong)
        return '@/assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg'
    return base + '/SongFile/' + ParseJsonArray(songStore.currentSong?.Backgroundimgjson)?.[0]
})

// 右键菜单相关
const menuTop = ref(0)
const menuLeft = ref(0)
const menuisShow = ref(false)
const showMenu = (e: any) => {
    menuTop.value = e.clientY;
    menuLeft.value = e.clientX;
    menuisShow.value = true;
}
const hideMenu = () => {
    menuisShow.value = false;
}
// 右键菜单功能相关
const showForm = (type: AppFormEnum) => {
    const form: FormDataModel | null = formStore.FindFormByType(type)
    if (form === null) {
        formStore.CreateCom(type)
        return
    }
    formStore.Show(form.id)
}

const ParseJsonArray = (json: string | null | undefined): any[] | null => {
    if (!json || json === '')
        return null
    return JSON.parse(json)
}

// // 动态组件的名称
// const dynamicComponentName = ref('PlayingListForm');
// // 通过异步加载组件
// const loadComponent = async () => {
//     try {
//      // @vite-ignore
//     const component = await import(`/src/components/${dynamicComponentName.value}.vue`);
//     return component.default;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
// // 根据外部传递的组件名称加载对应的组件
// const dynamicComponent = computed(() => {
//   return loadComponent();
// });

</script>

<template>
    <div v-if="isLogin" style="height: 100%;">
        <div class="main-background">
            <div class="main-background-style-box">
                <img class="main-background-img img-fill" :src="backgroundUrl">
            </div>
        </div>
        <div class="content" @contextmenu.prevent="showMenu($event)">
            <div v-show="menuisShow" :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }" class="menu">
                <div @click="showForm(AppFormEnum.PlayingListForm)">播放列表</div>
                <div @click="showForm(AppFormEnum.SearchSongForm)">歌曲列表</div>
                <div @click="showForm(AppFormEnum.AddSongForm)">上传歌曲</div>
            </div>
            <div class="head">
                <span class="head-title">{{ songStore.currentSong?.Title ?? '-' }}</span>
                <div class="head-base-info">
                    <!-- 歌手 -->
                    <span>{{ songStore.currentSong?.ArtistName ?? '-' }}</span>
                    <!-- 作词 -->
                    <span>{{ songStore.currentSong?.LyricistArtistName ?? '-' }}</span>
                    <!-- 专辑 -->
                    <span>{{ songStore.currentSong?.Album ?? '-' }}</span>
                    <!-- 发布日期 -->
                    <span>{{ songStore.currentSong?.Publicationdate ?? '-' }}</span>
                </div>
            </div>
            <div class="lyric-coontent">
                <!-- 封面旋转 -->
                <div class="cover con-left">
                    <div class="cover-box">
                        <div class="cover-left">
                            <img :src="backgroundUrl" alt="" draggable="false">
                        </div>
                        <div class="cover-right" :class="{ toRight: songStore.playing, toLeft: !songStore.playing }"
                            id="coverRight">
                            <div class="cover-right-base">
                                <div class="cover-right-back">
                                    <div class="cover-right-img">
                                        <img :src="backgroundUrl" alt="">
                                        <div class="cover-right-middle">
                                            <div class="cover-right-middle-item"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 歌词区域 -->
                <div class="lyric">
                    <ul class="lyric-item-box">
                        <li :data-time="item.time" v-for="item in lyricList" :key="item.time"
                        class="lyric-row"
                        >{{ item.words }}</li>
                    </ul>
                </div>
            </div>
            <template v-for="component in formStore.componentList" :key="component.id">
                <component :is="component.component" :id="component.id"></component>
            </template>
            <!-- <component :is="dynamicComponent"></component> -->
        </div>
        <TeBar />
    </div>
    <Login v-else />
</template>

<style scoped>

.lyric-row{
    color: aliceblue;
}

.active {
    color: #fff !important;
    transform: translateX(-12%) scale(1.3) !important;
    filter: brightness(1.02) drop-shadow(0 0 1px rgba(200, 200, 200, 0.8));
}

.cover>div {
    display: inline-block;
}

.cover-left {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.cover-box {
    width: 200px;
    height: 200px;
    position: relative;
}

.cover-left {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 12px;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
}

.cover-left img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(103%) contrast(105%);
}

.cover-right {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

.cover-right-base {
    width: 100%;
    height: 100%;
    background-color: #403e40;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rotate360 5.6s linear infinite forwards;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.cover-right-back {
    width: 98%;
    height: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cover-right-back::after {
    opacity: 0.7;
    background-image: url(./img/lp1.png);
    background-size: cover;
}

.cover-right-img {
    position: relative;
    width: 62%;
    height: 62%;
    opacity: 1;
    border: 2px rgb(224, 206, 182) solid;
    border-radius: 50%;
    overflow: hidden;
}

.cover-right-img>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover-right-middle {
    position: absolute;
    top: calc(50% - (18%)/2 - 18px);
    left: calc(50% - (18%)/2 - 18px);
    width: 18%;
    height: 18%;
    border-radius: 50%;
    border: 18px #00000044 solid;
    /* background-color: rgb(117, 116, 116); */
    display: flex;
    justify-content: center;
    align-items: center;
}

.cover-right-middle-item {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #000000;
}

.toRight {
    animation: toRight 1.4s ease-out 1 forwards;
}

.toLeft {
    animation: toLeft 1.4s ease-out 1 forwards;
}

/* o */

.img-fill {
    object-fit: fill;
    /* 缩放图片以填充容器 */
    object-position: center;
    /* 图片在容器中居中显示 */
}

.img-file {
    object-fit: cover;
    /* 缩放图片以填充容器 */
    object-position: center;
    /* 图片在容器中居中显示 */
}

.menu {
    position: absolute;
    background-color: #6f6b6f;
    z-index: 9999;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.menu>div {
    padding: 5px 10px;
    cursor: pointer;
    color: aliceblue;
}

.menu>div:hover {
    background-color: #4b494b;
}

.head-base-info>span {
    min-width: 50px;
    margin-inline: 16px;
    font-size: 14px;
}

.head-base-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 20px;
    min-width: 100px;
    width: auto;
}

.head-title {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    filter: brightness(1.02) drop-shadow(0 0 1px rgba(200, 200, 200, 0.8));
}

.head>* {
    margin-block-start: 3px;
    color: aliceblue;
}

.main-background-style-box {
    width: 100%;
    height: 100%;
    filter: blur(30px);
}

.main-background-img {
    width: 100%;
    height: 100%;
}

.head {
    min-width: 380px;
    min-height: 60px;
    max-height: 30%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 40px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
}

.main-background {
    width: 100%;
    height: 100%;
    background-color: black;
}

.lyric-item-box>* {
    user-select: text;
}

.lyric-item-box>*::selection {
    color: #FF7F50;
    background-color: #00000000;
}


.lyric li {
    text-align: center;
    transform: translateX(-12%);
    height: 30px;
    line-height: 30px;
    transition: 0.16s;
    font-size: 16px;
    color: #e1dddd;
}

.cover>img {
    width: 220px;
    height: 220px;
}

.cover {
    width: 38%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
}


.lyric {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    flex: 1;
    height: 100%;
}

.lyric-coontent {
    height: 55vh;
    width: 100%;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
}

.content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
}

@keyframes toRight {

    0% {
        transform: translate3d(1px, 0, 0);
    }

    100% {
        transform: translate3d(80px, 0, 0);
    }
}

/* 如果可以省略 0% 的状态，那么两个动画之间是不是就可以在动画中断的时候平滑接上，向右滑动一般直接切换向左滑动 */
@keyframes toLeft {

    0% {
        transform: translate3d(80px, 0, 0);
    }

    100% {
        transform: translate3d(1px, 0, 0);
    }
}

@keyframes rotate360 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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
</style>
