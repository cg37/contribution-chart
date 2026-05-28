<template>
  <div class="day-block-container">
    <Transition name="tooltip">
      <div v-show="showTip" class="detail-info" role="tooltip">
        {{ tipContent }}
      </div>
    </Transition>
    <div
      class="day-block"
      :style="{ background: backgroundColor }"
      :aria-label="tipContent"
      role="img"
      @mouseenter="showTip = true"
      @mouseleave="showTip = false"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import { IDayContribute } from "@/model/Interface";

const props = defineProps<IDayContribute>();

const showTip = ref(false);

const tipContent = computed(() => {
  const count = props.contributionCount;
  const label = count === 1 ? "contribution" : "contributions";
  return `${count} ${label} on ${props.date}`;
});

const injectedColors = inject<string[]>("contributionColors", [
  "#2f4858",
  "#266074",
  "#017a8b",
  "#00949c",
  "#00c9a7"
]);

const backgroundColor = computed(() => {
  const colors = injectedColors;
  switch (true) {
    case props.contributionCount >= 10:
      return colors[4];
    case props.contributionCount >= 7:
      return colors[3];
    case props.contributionCount >= 4:
      return colors[2];
    case props.contributionCount >= 1:
      return colors[1];
    default:
      return colors[0];
  }
});
</script>
<style scoped>
.day-block-container {
  position: relative;
}

/* Tooltip styles */
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
  pointer-events: none;
}

/* Block styles */
.day-block {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  border: 1px solid rgb(45, 45, 52);
  background-color: rgb(9, 97, 173);
  transition: transform 0.2s;
}
.day-block:hover {
  transform: scale(1.1);
}

/* Tooltip animation */
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
