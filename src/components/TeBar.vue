<template>
  <div ref="html">
    <div ref="ioCerHtml" class="io-box" :class="{ 'io-show': ioShow, 'io-hide': !ioShow }" @mouseleave="IoCurrMouseleavetEvent"
      @mouseenter="IoCurrMouseenterEvent">
      <div class="oter-bar-box oter-bar-box-default" @mouseleave="IoCurrBarMouseenterEvent"
        @mouseenter="IoCurrbarMouseenterEvent">
        <div @click="oterBarDragEvent" class="oter-bar"
          :class="{ 'oter-bar-show': oterBarShow, 'oter-bar-default': !oterBarShow }">
          <div class="bar-item" :style="barItemStyle">
            <div class="bar-item-pus bar-item-pus-animate"
              :class="{ 'bar-item-pus-show': oterBarShow, 'bar-item-pus-default': !oterBarShow, 'bar-item-pus-none': !ioCurrPlay }">
            </div>
          </div>
        </div>
      </div>
      <div class="io">
        <div class="io-play-img-box">
          <img class="io-play-img" :src="base + '/SongFile/' + ParseJsonArray(songStore.currentSong?.Backgroundimgjson)?.[0]" alt="">
        </div>
        <div class="io-play-info-box">
          <!-- 歌曲 -->
          <span class="io-play-info-lyric">{{songStore.currentSong?.Title ?? 'Music'}}</span>
          <!-- 歌手 -->
          <span class="io-play-info-title">{{songStore.currentSong?.ArtistName ?? '-'}}</span>
        </div>
        <div class="io-play-box">
          <span>
            <img title="上一首" @click="songStore.prev" src="@/assets/icon/back.svg" alt="">
          </span>
          <span id="io-play">
            <img v-show="ioCurrPlay" src="@/assets/icon/play.svg" alt="" @click="togglePlay(false)">
            <img v-show="!ioCurrPlay" src="@/assets/icon/pause.svg" alt="" @click="togglePlay(true)">
          </span>
          <span>
            <img title="下一首" @click="songStore.next" src="@/assets/icon/next.svg" alt="">
          </span>
        </div>
        <div class="io-play-right-oper">
          <span title="播放列表" @click="showPlayingList">
            <img src="@/assets/icon/playList.svg" alt="">
          </span>
          <span>
            <img v-show="ioCurrPlayMode === PlayModeEnum.loop" title="列表循环" @click="togglePlayMode()"
              src="@/assets/icon/playMode-List.svg" alt="">
            <img v-show="ioCurrPlayMode === PlayModeEnum.shuffle" title="随机播放" @click="togglePlayMode()"
              src="@/assets/icon/playMode-Random.svg" alt="">
            <img v-show="ioCurrPlayMode === PlayModeEnum.singleLoop" title="单曲循环" @click="togglePlayMode()"
              src="@/assets/icon/playMode-Single.svg" alt="">
          </span>
          <span ref="volumeSelectHtml" title="调整音量" @click="isShowVolumePoptip = !isShowVolumePoptip">
            <img src="@/assets/icon/volume.svg" alt="">
          </span>
          <span id="io-play-time">
            <span>{{ currentFormtTime }}</span>
            <span>/</span>
            <span>{{ durationFormtTime }}</span>
          </span>
        </div>
      </div>
    </div>
    <!-- io 的鼠标移动区域，现在用于实现当鼠标移动到此区域时，控制台显示出来，否则就隐藏 -->
    <div ref="currIoHtml" class="io-curr" @mouseenter="IoCurrMouseenterEvent">
      <!-- 音量调节器 -->
      <div ref="volumeSelectView" 
      class="ypipx" 
      :class="{ 'hidden-visibility': isShowVolumePoptip === false}" 
      :style="volumeSelectStyle"
      @mouseleave="IoVolumeMouseleavetEvent">
       <el-slider v-model="songStore.volume" :show-tooltip="false" vertical height="100px"  :min="0.1" :max="1" :step="0.025"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/FormStore.js'
import { useSongStore } from '@/stores/SongStore.js'
import { useTeBarStore } from '@/stores/TeBarStore.js'
import { PlayModeEnum } from '@/models/PlayModeEnum.ts'
import { base } from '@/httpUnit/APIBase.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'

const html = ref<HTMLElement>(null!)
const ioCerHtml = ref<HTMLElement>(null!)
const volumeSelectHtml = ref<HTMLElement>(null!)
const volumeSelectView = ref<HTMLElement>(null!)
const currIoHtml = ref<HTMLElement>(null!)
const songStore = useSongStore()
const formStore = useFormStore()
const teBarStore = useTeBarStore()

watch(() => teBarStore.isShow, (newValue) => {
  ioShowForce.value = newValue
})

// 是否显示音量调整气泡
const isShowVolumePoptip = ref(false)
// 音量调节器的 style 对象
const volumeSelectStyle = ref({
  left: '600px',
  top: '0px'
})

watch(() => isShowVolumePoptip.value, (newValue) => {
  if (newValue === true) {
    const ioCerHtmlRect = ioCerHtml.value.getBoundingClientRect()
    const htmlRect = volumeSelectHtml.value.getBoundingClientRect()
    const viewRect = volumeSelectView.value.getBoundingClientRect()
    const htmlRectX = ioCerHtmlRect.width - (ioCerHtmlRect.width - (htmlRect.x - ioCerHtmlRect.x)) - viewRect.width/4
    const htmlRectY = - (viewRect.height + 10)
    volumeSelectStyle.value.left = htmlRectX + 'px'
    volumeSelectStyle.value.top = htmlRectY + 'px'
  }
})
// 音量控制器自动隐藏
const ioVolumeMouseoutTimer = ref<number|null>(null)
const IoVolumeMouseleavetEvent = () => {
  if (ioVolumeMouseoutTimer.value !== null) {
    clearTimeout(ioVolumeMouseoutTimer.value)
  }
  // 3秒后隐藏
  ioCurrMouseoutTimer = setTimeout(() => {
    isShowVolumePoptip.value = false
  }, 3000)
}

// 弹出播放列表
const showPlayingList = () => {
  const form = formStore.FindFormByType(AppFormEnum.PlayingListForm)
  if (form === null)
    return
  formStore.Toggle(form.id)
}

// 当前播放百分比
const percent = ref(0)
// 播放进度条中样式 
const barItemStyle = ref({
  width: '0%' // 已经播放的进度条宽度
})
// 是否显示状态栏
let ioShow = ref(true)
// 是否强显示 (外部条件需要状态栏一直保持显示状态，此时暂停常规的隐藏定时器)
let ioShowForce = ref(false)
// 是否展开进度条
let oterBarShow = ref(false)
// 鼠标离开 io-curr 区域时。用于隐藏 io 控制台的定时器
let ioCurrMouseoutTimer: any | null = null
// 当前是否处于播放状态
let ioCurrPlay = ref(false)
// 当前的播放模式
let ioCurrPlayMode = ref<PlayModeEnum>(PlayModeEnum.loop)

/// 监听器
/// songStore 相关
// 监听播放状态
watch(() => songStore.playing, (newValue) => {
  ioCurrPlay.value = newValue
});
// 监听当前播放进度
watch(() => songStore.percent, (newValue) => {
  percent.value = newValue
});
watch(() => percent.value, () => {
  barItemStyle.value.width = percent.value * 100 + '%'
});
watch(() => songStore.playMode, (newValue) => {
  ioCurrPlayMode.value = newValue
});

/// 页面动作处理
// 切换播放状态
const togglePlay = (value: boolean) => {
  songStore.ChangePlaying(value)
}
// 切换播放模式
const togglePlayMode = (): void => {
  const nowvalue = ioCurrPlayMode.value
  const enumValues = Object.values(PlayModeEnum) as PlayModeEnum[];
  const currentIndex = enumValues.indexOf(nowvalue);
  const nextIndex = (currentIndex + 1) % enumValues.length;
  songStore.ChangePlayMode(enumValues[nextIndex])
}

// 进度条拖动事件
const oterBarDragEvent = (e: MouseEvent) => {
  // 当前点击的元素
  const target = e.currentTarget as HTMLElement;
  // 计算当前鼠标在元素中点击的位置
  const offsetLeft = target.getBoundingClientRect().left;
  const offsetWidth = target.offsetWidth;
  const offsetClickX = e.clientX - offsetLeft;
  // 点击百分比
  const offsetPercent = offsetClickX / offsetWidth;
  // 修改当前播放进度
  songStore.ChangeCurrentTime(offsetPercent)
}

/// UI 显示相关
const IoCurrMouseenterEvent = () => {
  ioShow.value = true
  if (ioCurrMouseoutTimer !== null) {
    clearTimeout(ioCurrMouseoutTimer)
  }
}
const IoCurrMouseleavetEvent = () => {
  if (ioCurrMouseoutTimer !== null) {
    clearTimeout(ioCurrMouseoutTimer)
  }
  const showFun = () => {
    if (ioShowForce.value !== true) {
      ioShow.value = false
      clearTimeout(ioCurrMouseoutTimer)
    }
    else
      ioCurrMouseoutTimer = setTimeout(() => {
        showFun()
      }, 5000)
  }
  ioCurrMouseoutTimer = setTimeout(showFun, 5000)
}
const IoCurrBarMouseenterEvent = () => {
  oterBarShow.value = false
}
const IoCurrbarMouseenterEvent = () => {
  oterBarShow.value = true
}

/// 计算属性
// 当前已播放时长 (mm:ss)
const currentFormtTime = computed(() => {
  const time = isNaN(songStore.currentTime) ? 0 : songStore.currentTime
  const minute = Math.floor(time / 1000 / 60)
  const second = Math.floor(time / 1000 % 60)
  return `${(minute).toString().padStart(2, '0')}:${(second).toString().padStart(2, '0')}`
})
// 歌曲总时长 (mm:ss)
const durationFormtTime = computed(() => {
  const time = isNaN(songStore.duration) ? 0 : songStore.duration
  const minute = Math.floor(time / 1000 / 60)
  const second = Math.floor(time / 1000 % 60)
  return `${(minute).toString().padStart(2, '0')}:${(second).toString().padStart(2, '0')}`
})

onMounted(() => {
  // 获取 html 的坐标和宽高信息
  const htmlRect = currIoHtml.value.getBoundingClientRect()
  teBarStore.position = {
    x: htmlRect.x,
    y: htmlRect.y,
    width: htmlRect.width,
    height: htmlRect.height
  }  
})

const ParseJsonArray = (json: string | null | undefined) : any[] | null => {
  if (!json || json === '')
    return null
  return JSON.parse(json)
}
</script>

<style scoped>

.ypipx{
  width: 50px;
  height: 120px;
  background-color: #4b494b;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  top: -200px;
  box-shadow: 3px 3px 20px 3px #22222230;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}

.io-play-right-oper {
  flex: 1;
  margin-right: 10px;
  width: 180px;
  display: flex;
  /* 水平布局 */
  flex-direction: row-reverse;
  /* 显示一行 */
  flex-wrap: nowrap;
  /* 贴边平分边距 */
  /* justify-content: space-around; */
}

.io-play-right-oper>span {
  width: 30px;
  margin-right: 8px;
  overflow: hidden;
  cursor: pointer;
}

.io-play-right-oper>span>img {
  width: 100%;
  height: 100%;
  filter: brightness(0.80);
  transition: 0.378s;
}

.io-play-right-oper>span>img:hover {
  filter: brightness(1.02) drop-shadow(0 0 1px rgba(200, 200, 200, 0.8));
}

.io-play-info-lyric {
  color: #ddd;
}

.io-play-info-title {
  margin-top: 5px;
  color: #aaa;
}

.io-play-info-box {
  width: 180px;
  height: 98%;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  color: #aaa;
  font-size: 14px;
}

.io-play-img-box {
  width: 60px;
  height: 60px;
  margin-left: 10px;
  overflow: hidden;
  border-radius: 10px;
}

.io-play-img-box>img {
  width: 100%;
  height: 100%;
}

#io-play {
  width: 50px;
}

.io-play-box>span {
  width: 40px;
  overflow: hidden;
  cursor: pointer;
}

.io-play-box>span>img {
  width: 100%;
  height: 100%;
  filter: brightness(0.80);
  transition: 0.378s;
}

.io-play-box>span>img:hover {
  filter: brightness(1.10) drop-shadow(0 0 2px rgba(255, 255, 255, 1));
  /* box-shadow: 0 0 10px rgba(255, 255, 255, 1); */
}

.io-play-box {
  width: 180px;
  display: flex;
  /* 水平布局 */
  flex-direction: row;
  /* 显示一行 */
  flex-wrap: nowrap;
  /* 贴边平分边距 */
  justify-content: space-around;
}

.io-curr {
  min-width: 700px;
  height: 74px;
  position: absolute;
  z-index: 998;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.io-show {
  bottom: 20px;
}


@keyframes myfr {
  0% {
    filter: brightness(1.00);
  }

  100% {
    filter: brightness(1.22) drop-shadow(0 0 2.1px rgba(255, 255, 255, 0.85));
  }
}

.io-play-img:hover {
  filter: contrast(1.18);
}

.io-play-img {
  width: 100%;
  height: 100%;
  transition: 0.378s;
  cursor: pointer;
}

.bar-item-pus-default {
  right: -1px;
  width: 3px;
  top: -1.2px;
  height: 3px;
  border-radius: 0%;
}

.bar-item-pus-none {
  /* display: none; */
  /* 改为透明 */
  opacity: 0;
}

.bar-item-pus-show {
  right: -5px;
  width: 10px;
  top: -3px;
  height: 11px;
  border-radius: 53%;
}

.bar-item-pus-animate {
  animation: myfr 1s linear 0s infinite alternate;
}

.bar-item-pus {
  position: absolute;
  background-color: #ababab;
  transition: .3s;
}

.bar-item {
  position: relative;
  width: 23%;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: .3s;
}

.oter-bar {
  width: 80%;
  background-color: rgba(255, 255, 255, 0.33);
  cursor: pointer;
  margin-inline: auto;
  display: flex;
  flex-direction: row;
  border-radius: 1px;
  justify-content: space-between;
  transition: .3s;
}

.io-hide {
  bottom: -70px;
}

.oter-bar-show {
  height: 6px;
}

.oter-bar-default {
  height: 1.52px;
}

.oter-bar-box-default {
  height: 8px;
}

.io {
  min-width: 700px;
  height: 74px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background-color: #4b494b;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 14px;
  transition: 0.5s;
}



.oter-bar-box {
  width: 100%;
  display: flex;
  /* 从下往上布局 */
  flex-direction: column-reverse;
}

#io-play-time {
  width: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: #ccc;
  font-size: 14px;
  filter: brightness(0.86);
  transition: 0.378s;
}

#io-play-time:hover {
  filter: brightness(1.02) drop-shadow(0 0 0.1px rgba(255, 255, 255, 1));
}


.io-box {
  min-width: 700px;
  height: 80px;
  /* 绝对定位 */
  position: absolute;
  z-index: 999;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
  /* 与父元素底部相距 20px */
  /* bottom: -74px; */
  /* overflow: hidden; */
  /* display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center; */
  transition: 0.5s;
}
</style>