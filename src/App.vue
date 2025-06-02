<template>
  <ContributionChart
    :show-total-contribute="true"
    :user-name="GITHUBUSER"
    :token="GITHUBTOKEN"
  />
</template>
<script lang="ts" setup>
import { GITHUBUSER, GITHUBTOKEN } from "./env";
import "contribution-chart/dist/assets/index.css";
import ContributionChart from "contribution-chart";
</script>
