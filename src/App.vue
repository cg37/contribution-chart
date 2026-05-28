<template>
  <ContributionChart
    :show-total-contribute="false"
    :user-name="config.username"
    :token="config.token"
  />
</template>
<script lang="ts" setup>
import config from "./env";
import ContributionChart from "@/lib/components/index";
</script>
