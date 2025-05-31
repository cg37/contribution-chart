<template>
  <div class="data-picker">
    <el-date-picker
      v-model="startDate"
      type="date"
      placeholder="start date"
      size="small"
    />
    <el-date-picker
      v-model="endDate"
      type="date"
      placeholder="end date"
      size="small"
    />
  </div>
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

const startDate = ref();
const endDate = ref();

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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  overflow: hidden;
}
</style>
