# contribution-chart
## installation
```
pnpm i contribution-chart
```
## Import
```
import ContributionChart from "contribution-chart";
```

## Use
``` vue
<template>
  <ContributionChart
    :show-total-contribute="true"
    :user-name="GITHUBUSER"
    :token="GITHUBTOKEN"
  />
</template>
<script lang="ts" setup>
import { GITHUBUSER, GITHUBTOKEN } from "./env";
import ContributionChart from "contribution-chart";
</script>

```
|props|usage|default value|type|
|---|---|---|---|
|showTotalContribute|show your total contribution|false|boolean
###  `token`
Get your github token from this [GitHub Doc](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### `user-name`
your GitHub user name

## Warning
DO NOT put your GitHub Token into your repository, for me, write it an independent file and add it into `.gitignore`

# Any suggestion contact <CG37@outlook.com>
