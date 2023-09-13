<script setup lang="ts">
import { ref } from 'vue'
let ioShow = ref(true)
const IoCurrMouseenterEvent = () => {
  ioShow.value = true
  if (ioCurrMouseoutTimer !== null) {
    clearTimeout(ioCurrMouseoutTimer)
  }
  console.log('鼠标进入了 io-curr 区域', ioShow.value)
}

// 鼠标离开 io-curr 区域时。用于隐藏 io 控制台的定时器
let ioCurrMouseoutTimer: any | null = null
const IoCurrMouseleavetEvent = () => {
  if (ioCurrMouseoutTimer !== null) {
    clearTimeout(ioCurrMouseoutTimer)
  }
  console.log('鼠标离开了 io-curr 区域', ioShow.value)
  ioCurrMouseoutTimer = setTimeout(() => {
    ioShow.value = false
  }, 5000)
}

// 是否展开进度条
let oterBarShow = ref(true)
const IoCurrBarMouseenterEvent = () => {
  console.log('鼠标离开了 io-curr-bar 区域')
  oterBarShow.value = false
}

const IoCurrbarMouseenterEvent = () => {
  console.log('鼠标进入了 io-curr-bar 区域')
  oterBarShow.value = true
}

</script>

<template>
  <div class="main-background">
    <div class="main-background-style-box">
      <img class="main-background-img" src="./assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg">
    </div>
  </div>
  <div class="content">
    <div class="head">
      <span class="head-title">听妈妈的话</span>
      <div class="head-base-info">
        <span>歌手</span>
        <span>作词</span>
        <span>专辑</span>
        <span>发布日期</span>
      </div>
    </div>
    <div class="lyric-coontent">
      <!-- 封面旋转 -->
      <div class="cover">
        <img src="./assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg" alt="" />
      </div>
      <!-- 歌词区域 -->
      <div class="lyric">
        <ul class="lyric-item-box">
          <li>周杰伦 - 听妈妈的话 </li>
          <li>作词：周杰伦 </li>
          <li>作曲：周杰伦 </li>
          <li>编曲：林迈可、洪敬尧 </li>
          <li>小朋友你是否有很多问号 </li>
          <li>为什么别人在那看漫画 </li>
          <li>我却在学画画 </li>
          <li>对着钢琴说话 </li>
          <li>别人在玩游戏 </li>
          <li>我却靠在墙壁背我的ABC </li>
          <li>我说我要一台大大的飞机 </li>

          <li>但却得到一台旧旧录音机 </li>

          <li>为什么要听妈妈的话 </li>

          <li>长大后 </li>

          <li>你就会开始懂了这段话 </li>

          <li>哼 </li>

          <li>长大后我开始明白 </li>

          <li>为什么我跑得比别人快 </li>

          <li>飞得比别人高 </li>

          <li>将来大家看的 </li>

          <li>都是我画的漫画 </li>

          <li>大家唱的都是我写的歌 </li>

          <li>妈妈的辛苦不让你看见 </li>

          <li>温暖的食谱在她心里面 </li>

          <li>有空就多多握握她的手 </li>

        </ul>
      </div>
    </div>
    <div class="io-box" :class="{ 'io-show': ioShow, 'io-hide': !ioShow }" @mouseleave="IoCurrMouseleavetEvent"
      @mouseenter="IoCurrMouseenterEvent">
      <div class="oter-bar-box oter-bar-box-default" @mouseleave="IoCurrBarMouseenterEvent"
        @mouseenter="IoCurrbarMouseenterEvent">
        <div class="oter-bar" :class="{ 'oter-bar-show': oterBarShow, 'oter-bar-default': !oterBarShow }">
          <div class="bar-item">
            <div class="bar-item-pus bar-item-pus-animate" :class="{ 'bar-item-pus-show': oterBarShow, 'bar-item-pus-default': !oterBarShow }"></div>
          </div>
        </div>
      </div>
      <div class="io">
        <div class="io-play-img-box">
          <img class="io-play-img" src="./assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg" alt="">
        </div>
        <div class="io-play-info-box">
          <span class="io-play-info-lyric">我却靠在墙壁背我的ABC</span>
          <span class="io-play-info-title">听妈妈的话 - 周杰伦</span>
        </div>
        <div class="io-play-box">
          <span>
            <img src="./assets/icon/back.svg" alt="">
          </span>
          <span id="io-play">
            <img src="./assets/icon/play.svg" alt="">
          </span>
          <span>
            <img src="./assets/icon/next.svg" alt="">
          </span>
        </div>
        <div class="io-play-right-oper">
          <span>
            <img src="./assets/icon/download.svg" alt="">
          </span>
          <span>
            <img src="./assets/icon/playMode-List.svg" alt="">
          </span>
          <span>
            <img src="./assets/icon/volume.svg" alt="">
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

<style scoped>
.lyric-item-box>*{
  user-select: text;
}
.lyric-item-box>*::selection {
    color: #FF7F50;
    background-color: #00000000;
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

@keyframes myfr 
{
     0% { filter: brightness(1.00); }
     100% { filter: brightness(1.22) drop-shadow(0 0 2.1px rgba(255, 255, 255, 0.85)); }
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

.main-background-style-box {
  width: 100%;
  height: 100%;
  filter: blur(30px);
}

.main-background-img {
  width: 100%;
  height: 100%;
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

.io-hide {
  bottom: -70px;
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


.lyric li {
  text-align: center;
  transform: translateX(-12%);
  height: 30px;
  line-height: 30px;
  transition: 0.16s;
  font-size: 16px;
  color: #eee;
}

.cover>* {
  /* 宽是父元素宽高中比较小的一半 */
  width: 220px;
  height: 220px;
}

.cover {
  width: 38%;
  height: 100%;
  /* background-color: rgba(255, 170, 110, 0.5); */
  display: flex;
  /* 显示一行 */
  flex-wrap: nowrap;
  /* 贴边平分边距 */
  justify-content: space-around;
  /* 水平从右向左 */
  flex-direction: row-reverse;
  /* 子元素水平居中 */
  align-items: center;
}


.lyric {
  overflow-y: hidden;
  position: relative;
  flex: 1;
  height: 100%;
  /* background-color: rgba(255, 230, 215, 0.5); */
}

.lyric-coontent {
  height: 55vh;
  width: 100%;
  border-radius: 20px;
  /* background-color: rgba(255, 255, 255, 0.5); */
  /* 绝对定位 */
  position: absolute;
  /* 垂直居中 */
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  /* 水平布局 */
  flex-direction: row;
  /* 显示一行 */
  flex-wrap: nowrap;
  /* 贴边平分边距 */
  justify-content: space-around;
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
}

.head>* {
  margin-block-start: 3px;
  color: aliceblue;
}

.head {
  min-width: 380px;
  min-height: 60px;
  max-height: 30%;
  /* 绝对定位 */
  position: absolute;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
  /* 与父元素底部相距 20px */
  top: 40px;
  /* 圆角 */
  border-radius: 20px;
  /* background-color: rgba(255, 255, 255, 0.5); */

  display: flex;
  /* 垂直布局 */
  flex-direction: column;
}

.main-background {
  width: 100%;
  height: 100%;
  background-color: black;
}

.content {
  /* 固定定位 */
  position: fixed;
  /* 使其覆盖整个屏幕 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 背景透明 */
  background-color: rgba(0, 0, 0, 0);
}
</style>
