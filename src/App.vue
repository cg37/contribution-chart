<template>
  <RouterLink to="/home">主页</RouterLink>
  <RouterLink to="/about">关于</RouterLink>
  <RouterView>
    <div class="data">
      {{ data }}
    </div>
  </RouterView>
</template>
<script lang="ts" setup>
import { getContributionData } from "@/api/getContributionData";
import { onMounted, ref } from "vue";
const data = ref();
onMounted(() => {
  getContributionData()
    .then((res) => (data.value = res))
    .catch((err) => console.log(err));
});
</script>
<style lang="scss" scoped>
.data {
  border: 1px solid red;
  width: 100%;
  height: 100px;
}
</style>
