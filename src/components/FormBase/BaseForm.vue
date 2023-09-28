<template>
    <div ref="form">

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import interact from 'interactjs'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { useFormStore } from '@/stores/FormStore.js'

const formStore = useFormStore()
const formData = ref<FormDataModel>(new FormDataModel(AppFormEnum.None, true, 'id?'))

// 窗口显示相关
watch(() => formData.value.isShow, (newvalue) => {
    const html = draggableRef.value
    if (!html)
        return
    if (newvalue === true)
    {
        html.classList.remove('closed')
        html.classList.add('show')
    }
    else
    {
        html.classList.remove('show')
        html.classList.add('closed')
    }
})

// 窗口拖动相关
const draggableRef = ref<HTMLElement | null>(null)
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


</script>

<style scoped>

</style>