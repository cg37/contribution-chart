<template>
  <div class="day-block-container">
    <Transition name="tooltip">
      <div v-show="showTip" class="detail-info">
        {{ tipContent }}
      </div>
    </Transition>
    <div
      class="day-block"
      :style="{ background: backgroundColor }"
      @mouseenter="showTip = true"
      @mouseleave="showTip = false"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { IDayContribute } from "@/model/Interface";
const props = defineProps<IDayContribute>();
const showTip = ref(false);
const tipContent = computed(() => {
  return `${props.contributionCount} contributions in ${props.date}`;
});
const backgroundColor = computed(() => {
  switch (true) {
    case props.contributionCount > 9:
      return "#00c9a7";
    case props.contributionCount > 7:
      return "#00c9a7";
    case props.contributionCount > 5:
      return "#00949c";
    case props.contributionCount > 3:
      return "#017a8b";
    case props.contributionCount >= 1:
      return "#266074";
    default:
      return "#2f4858";
  }
});
</script>
<style lang="scss" scoped>
.day-block-container {
  position: relative;
}

/* Tooltip 基础样式 */
.detail-info {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  word-break: keep-all;
  z-index: 999;
  white-space: nowrap;
  background: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none; /* 防止 tooltip 干扰鼠标事件 */
}

/* 方块样式 */
.day-block {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  border: 1px solid rgb(45, 45, 52);
  background-color: rgb(9, 97, 173);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

/* 动画效果 - 进入和离开 */
.tooltip-enter-active {
  animation: tooltip-in 0.2s ease-out;
}

.tooltip-leave-active {
  animation: tooltip-out 0.1s ease-in;
}

@keyframes tooltip-in {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes tooltip-out {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
}
</style>
