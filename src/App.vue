<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Howl } from 'howler'
import { emitter } from '@/mitt/mitt.ts';
import TeBar from '@/components/TeBar.vue'
import Login from '@/components/Login.vue'
import { SongService } from '@/db/SongService.ts'
import { useFormStore } from '@/stores/FormStore.js'
import { useSongStore } from '@/stores/SongStore.js'
import AddSongForm from '@/components/AddSongForm.vue'
import { dbSongModel } from '@/db/dbModels/dbSongModel.ts'
import SearchSongForm from '@/components/SearchSongForm.vue'
import { generateGuid } from '@/tools/tool.ts'
import PlayingListForm from '@/components/PlayingListForm.vue'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { ComponentClass } from '@/models/ComponentClass.ts'

const formStore = useFormStore()
const songStore = useSongStore()

// 用户登录相关
const isLogin = ref(true)
emitter.on('login', (message) => {
  isLogin.value = message as boolean
})

// 播放器控制相关
let sound: Howl = null!
// 监听进度改变定时器 ts
let ioCurrPlayTimeTimer: number | null = null

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

// 生命周期钩子
onMounted(async () => {
  formStore.AddCom(new ComponentClass(generateGuid(), PlayingListForm))
  formStore.AddCom(new ComponentClass(generateGuid(), SearchSongForm))
  formStore.AddCom(new ComponentClass(generateGuid(), AddSongForm))
  document.addEventListener('click', hideMenu);
  sound = new Howl({
    src: [' Bouncy Castle '], // 音频文件的URL或路径
    autoplay: false, // 自动播放
    loop: false,     // 循环播放
    volume: 0.3,     // 音量（0.0到1.0之间）
    html5: true,     // 是否使用HTML5播放器
    onend: function () {
      console.log('音频播放完毕');
    }
  });

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

  const db = new SongService()
  const mod = new dbSongModel();
  mod.id = "1"
  mod.data = "听妈妈的话"
  // await db.addSong(mod)
  const song = await db.GetSongById("1")
  console.log(song);
})
onUnmounted(() => {
  document.removeEventListener('click', hideMenu);
  emitter.off("login");
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

</script>

<template>
  <div v-if="isLogin">
    <div class="main-background">
      <div class="main-background-style-box">
        <img class="main-background-img" src="@/assets/images/2FAB5B7739724830B45C4D192D59D0FF.jpg">
      </div>
    </div>
    <div class="content" @contextmenu.prevent="showMenu($event)">
      <div v-show="menuisShow" :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }" class="menu">
        <div @click="showForm(AppFormEnum.PlayingListForm)">播放列表</div>
        <div @click="showForm(AppFormEnum.SearchSongForm)">歌曲列表</div>
        <div @click="showForm(AppFormEnum.AddSongForm)">上传歌曲</div>
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
      <template v-for="component in formStore.componentList" :key="component.id">
        <component :is="component.component" :id="component.id"></component>
      </template>
    </div>
    <TeBar />
  </div>
  <Login v-else />
</template>

<style scoped>
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
  color: #eee;
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
  justify-content: space-around;
  flex-direction: row-reverse;
  align-items: center;
}


.lyric {
  overflow-y: hidden;
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
</style>
