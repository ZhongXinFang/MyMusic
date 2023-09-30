<script setup lang="ts">
import { ref, shallowReactive , watch, onMounted, onUnmounted } from 'vue'
import TeBar from '@/components/TeBar.vue'
import PlayingListForm from '@/components/PlayingListForm.vue'
import SearchSongForm from '@/components/SearchSongForm.vue'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { useSongStore } from '@/stores/SongStore.js'
import { useFormStore } from '@/stores/FormStore.js'
import api from '@/httpUnit/SongAPI.ts'
// import { useUnitStore } from '@/stores/UnitStore.js'
import { Howl } from 'howler'

const formStore = useFormStore()
const songStore = useSongStore()
// const unitStore = useUnitStore()

const sound = new Howl({
  src: ['https://localhost:7111/api/SongFile/2B7753B672264B68A909FF432642D6A2.opus'], // 音频文件的URL或路径
  autoplay: false, // 自动播放
  loop: false,     // 循环播放
  volume: 0.3,     // 音量（0.0到1.0之间）
  html5: true,     // 是否使用HTML5播放器
  onend: function () {
    console.log('音频播放完毕');
  }
});

// 监听进度改变定时器 ts
let ioCurrPlayTimeTimer: number | null = null

// 监听进度改变事件
sound.on('play', function () {
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

watch(() => songStore.playing, (newValue) => {
  if (newValue === true) {
    sound.play()
  }
  else {
    sound.pause()
  }
});

watch(() => songStore.ChangeCurrentPercent, (newValue) => {
  if (newValue !== null) {
    sound.seek(songStore.duration / 1000 * newValue)
    songStore.ChangeCurrentTime(null)
  }
});

// 组件处理相关
// ['PlayingListForm', 'SearchSongForm']
const componentList = shallowReactive<any[]>([])

onMounted(async () => {
  componentList.push(PlayingListForm)
  componentList.push(SearchSongForm)
  document.addEventListener('click', hideMenu);
  // unitStore.componentList.push(unitStore.allUnits.PlayingListForm)
  // unitStore.componentList.push(unitStore.allUnits.SearchSongForm)

  await api.songAPI('123')
})

onUnmounted(() => {
  document.removeEventListener('click', hideMenu);
})

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

const showPlaying = () => {
  const form: FormDataModel | null = formStore.FindFormByType(AppFormEnum.PlayingListForm)
  if (form === null) 
    return
  formStore.Show(form.id)
}

</script>
<template>
  <div class="main-background">
    <div class="main-background-style-box">
      <img class="main-background-img" src="@/assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg">
    </div>
  </div>
  <div class="content" @contextmenu.prevent="showMenu($event)">
    <div v-show="menuisShow" :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }" class="menu">
      <div @click="showPlaying">播放列表</div>
      <div>歌曲列表</div>
      <div>上传歌曲</div>
    </div>
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
        <img src="@/assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg" alt="" />
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
    <template v-for="(component, i) in componentList" :key="i">
      <component :is="component"></component>
    </template>
    <!-- <component :is="PlayingListForm"></component> -->
    <component :is="SearchSongForm"></component>
  </div>
  <TeBar />
</template>

<style scoped>
.menu {
  position: absolute;
  background-color: #6f6b6f;
  /* border: 1px solid black; */
  z-index: 9999; /* make sure it's on top */
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

.from {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 320px;
  height: 480px;
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

.cover>img {
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
