<script setup lang="ts">
import { watch, ref } from 'vue'
import TeBar from './components/TeBar.vue'
import { useSongStore } from './stores/SongStore.js'
import { Howl } from 'howler';

const sound = new Howl({
  src: ['https://localhost:7111/api/SongFile/2B7753B672264B68A909FF432642D6A2.opus'], // 音频文件的URL或路径
  autoplay: true, // 自动播放
  loop: true, // 循环播放
  volume: 0.5, // 音量（0.0到1.0之间）
  onend: function () {
    console.log('音频播放完毕');
  }
});

// 当前播放进度
const ioCurrPlayTime = ref(0)

// 监听进度改变事件
sound.on('play', function () {
  console.log(sound);
  setInterval(function() {
    const seek = sound.seek(); // 获取当前播放进度（以秒为单位）
    ioCurrPlayTime.value = seek * 1000
    console.log("当前播放进度：" + seek.toFixed(3) + "秒");
  }, 100); // 每秒更新一次播放进度
});

const songStore = useSongStore()
// 当前是否处于播放状态
const ioCurrPlay = ref(false)
watch(() => songStore.playing, (newValue) => {
  ioCurrPlay.value = newValue
  console.log(sound);
  if (newValue === true) {
    sound.seek(ioCurrPlayTime.value / 1000)
    sound.play()
  }
  else {
    sound.pause()
  }
});

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
  </div>
  <TeBar />
</template>

<style scoped>
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
