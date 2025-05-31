<template>
  <!-- <div class="data-picker">
    <el-date-picker
      v-model="dataRange"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      size="normal"
    />
  </div>
  {{ dataRange }} -->
  <div class="data">
    <template v-for="(item, index) of weeksData" :key="index">
      <WeekColumn :data="item" />
    </template>
  </div>
  <div class="total" v-show="props.showTotalContribute">
    {{ totalContributions }}
  </div>
</template>
<script lang="ts" setup>
import { getContributionData } from "@/api/getContributionData";
import { computed, onMounted, ref } from "vue";
import WeekColumn from "@/components/WeekColumn.vue";

const props = withDefaults(
  defineProps<{
    showTotalContribute?: boolean;
    selectData?: boolean;
  }>(),
  {
    showTotalContribute: false,
    selectData: false
  }
);

// const dataRange = ref();

const contributionCalender = ref();
const totalContributions = computed(() => {
  return contributionCalender.value?.totalContributions;
});
const weeksData = computed(() => {
  return contributionCalender.value?.weeks.map((it) => it.contributionDays);
});
onMounted(() => {
  getContributionData()
    .then(
      (res) =>
        (contributionCalender.value =
          res?.user?.contributionsCollection?.contributionCalendar)
    )
    .catch((err) => console.log(err));
});
</script>
<style lang="scss" scoped>
.data-picker {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  align-self: flex-start;
}
.total {
  border: 2px solid #444;
  border-radius: 4px;
  padding: 6px 24.2px;
  font-size: 18px;
  user-select: none;
  &:hover {
    background-color: #333;
  }
  transition: background-color 0.3s ease;
}
.data {
  width: 100%;
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  gap: 2px;
  overflow: visible;
}
</style>
