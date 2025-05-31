<template>
  <div class="chart-container">
    <ContributionChart :show-total-contribute="true" />
  </div>
</template>
<script lang="ts" setup>
import ContributionChart from "./components/ContributionChart.vue";
</script>
<style lang="scss" scoped>
.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
}
</style>
