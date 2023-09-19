<template>
    <div>
        <div class="io-box" :class="{ 'io-show': ioShow, 'io-hide': !ioShow }" @mouseleave="IoCurrMouseleavetEvent"
            @mouseenter="IoCurrMouseenterEvent">
            <div class="oter-bar-box oter-bar-box-default" @mouseleave="IoCurrBarMouseenterEvent"
                @mouseenter="IoCurrbarMouseenterEvent">
                <div class="oter-bar" :class="{ 'oter-bar-show': oterBarShow, 'oter-bar-default': !oterBarShow }">
                    <div class="bar-item">
                        <div class="bar-item-pus bar-item-pus-animate"
                            :class="{ 'bar-item-pus-show': oterBarShow, 'bar-item-pus-default': !oterBarShow }"></div>
                    </div>
                </div>
            </div>
            <div class="io">
                <div class="io-play-img-box">
                    <img class="io-play-img" src="../assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg" alt="">
                </div>
                <div class="io-play-info-box">
                    <span class="io-play-info-lyric">我却靠在墙壁背我的ABC</span>
                    <span class="io-play-info-title">听妈妈的话 - 周杰伦</span>
                </div>
                <div class="io-play-box">
                    <span>
                        <img src="../assets/icon/back.svg" alt="">
                    </span>
                    <span id="io-play">
                        <img v-show="ioCurrPlay" src="../assets/icon/play.svg" alt="" @click="togglePlay(false)">
                        <img v-show="!ioCurrPlay" src="../assets/icon/pause.svg" alt="" @click="togglePlay(true)">
                    </span>
                    <span>
                        <img src="../assets/icon/next.svg" alt="">
                    </span>
                </div>
                <div class="io-play-right-oper">
                    <span>
                        <img src="../assets/icon/download.svg" alt="">
                    </span>
                    <span>
                        <img src="../assets/icon/playMode-List.svg" alt="">
                    </span>
                    <span>
                        <img src="../assets/icon/volume.svg" alt="">
                    </span>
                    <span id="io-play-time">
                        <span>03:23</span>
                        <span>/</span>
                        <span>05:11</span>
                    </span>
                </div>
            </div>
        </div>
        <!-- io 的鼠标移动区域，现在用于实现当鼠标移动到此区域时，控制台显示出来，否则就隐藏 -->
        <div class="io-curr" @mouseenter="IoCurrMouseenterEvent"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'
import { useSongStore } from '../stores/SongStore.js'

const songStore = useSongStore()

watch(() => songStore.playing, (newValue) => {
  ioCurrPlay.value = newValue
});

// 切换播放状态
const togglePlay = (value:boolean) => {
  songStore.ChangePlaying(value)
}

// 是否显示状态栏
let ioShow = ref(true)
// 是否展开进度条
let oterBarShow = ref(true)
// 鼠标离开 io-curr 区域时。用于隐藏 io 控制台的定时器
let ioCurrMouseoutTimer: any | null = null
// 当前是否处于播放状态
let ioCurrPlay = ref(false)

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
  ioCurrMouseoutTimer = setTimeout(() => {
    ioShow.value = false
  }, 5000)
}
const IoCurrBarMouseenterEvent = () => {
  oterBarShow.value = false
}
const IoCurrbarMouseenterEvent = () => {
  oterBarShow.value = true
}
</script>

<style scoped>

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


@keyframes myfr 
{
     0% { filter: brightness(1.00); }
     100% { filter: brightness(1.22) drop-shadow(0 0 2.1px rgba(255, 255, 255, 0.85)); }
}

.io-play-img:hover{
  filter: contrast(1.18);
}
.io-play-img{
  width: 100%;
  height: 100%;
  transition: 0.378s;
  cursor: pointer;
}

.bar-item-pus-default{
  right: -1px;
  width: 4px;
  top: -1.2px;
  height: 3px;
}

.bar-item-pus-show{
  right: -5px;
  width: 10px;
  top: -3px;
  height: 11px;
}

.bar-item-pus-animate{
  animation: myfr 1s linear 0s infinite alternate;
}

.bar-item-pus{
  position: absolute;
  background-color: #ababab;
  border-radius: 53%;
  transition: .3s;
}

.bar-item{
  position: relative;
  width: 23%;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.5);
}

.oter-bar {
  width: 80%;
  background-color: rgba(255, 255, 255, 0.33);
  cursor: pointer;
  margin-inline: auto;
  display: flex;
  flex-direction: row;
  border-radius:1px;
  justify-content:space-between;
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
  background-color: rgba(188, 185, 189, 0.39);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
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