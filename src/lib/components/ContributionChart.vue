<template>
  <div class="contribution-chart-contaier">
    <template v-if="weeksData?.length">
      <div class="calender-table">
        <template v-for="(item, index) of weeksData" :key="index">
          <WeekColumn :data="item" />
        </template>
      </div>
      <div class="total" v-show="props.showTotalContribute">
        {{ totalContributions }}
      </div>
    </template>
    <template v-if="!props.userName || !props.token">
      need userName and token
    </template>
  </div>
</template>
<script lang="ts" setup name="ContributionChart">
import { getContributionData } from "../api/getContributionData";
import { computed, onMounted, ref } from "vue";
import WeekColumn from "./WeekColumn.vue";
import { AnyType } from "@/model/common";

const props = withDefaults(
  defineProps<{
    showTotalContribute?: boolean;
    selectData?: boolean;
    token: string;
    userName: string;
  }>(),
  {
    showTotalContribute: false,
    selectData: false
  }
);

const contributionCalender = ref();
const totalContributions = computed(() => {
  return contributionCalender.value?.totalContributions;
});
const weeksData = computed(() => {
  return contributionCalender.value?.weeks.map(
    (it: AnyType) => it.contributionDays
  );
});
onMounted(() => {
  getContributionData(props.userName, props.token)
    .then(
      (res) =>
        (contributionCalender.value =
          res?.user?.contributionsCollection?.contributionCalendar)
    )
    .catch((err) => console.log(err));
});
</script>
<style scoped>
.contribution-chart-contaier {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
}
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
  transition: background-color 0.3s ease;
}
.total:honver {
  background-color: #333;
  transition: background-color 0.3s ease;
}
.calender-table {
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  overflow: visible;
}
</style>
