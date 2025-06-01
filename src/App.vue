<template>
  <ContributionChart
    :show-total-contribute="true"
    :user-name="GITHUBUSER"
    :token="GITHUBTOKEN"
  />
</template>
<script lang="ts" setup>
import { GITHUBUSER, GITHUBTOKEN } from "./env";
import ContributionChart from "@/lib/components/ContributionChart.vue";
</script>
