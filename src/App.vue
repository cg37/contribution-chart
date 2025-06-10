<template>
  <ContributionChart
    :show-total-contribute="false"
    :user-name="config.token"
    :token="config.username"
  />
</template>
<script lang="ts" setup>
import config from "./env";
import ContributionChart from "@/lib/components/index";
</script>
