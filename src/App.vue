<template>
  <div class="">
    {{ totalContributions }}
  </div>
  <div class="data">
    <template v-for="(item, index) of weeksData" :key="index">
      <WeekColumn :data="item" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { getContributionData } from "@/api/getContributionData";
import { computed, onMounted, ref } from "vue";
import WeekColumn from "./components/WeekColumn.vue";
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
.data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
}
</style>
