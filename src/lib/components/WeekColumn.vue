<template>
  <div class="week-column">
    <template v-for="(item, index) of props.data" :key="index">
      <DayContribution
        :contribution-count="item.contributionCount"
        :date="item.date"
        :weekday="item.weekday"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { IDayContribute } from "@/model/Interface";
import DayContribution from "./DayContribution.vue";
const props = defineProps<{
  data: IDayContribute[];
}>();
</script>
<style scoped>
.week-column {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
</style>
