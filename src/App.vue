<template>
  <ContributionChart
    :show-total-contribute="false"
    :user-name="GITHUBUSER"
    :token="GITHUBTOKEN"
  />
</template>
<script lang="ts" setup>
import { GITHUBUSER, GITHUBTOKEN } from "./env";
import ContributionChart from "contribution-chart";
</script>
