<template>
  <div class="contribution-chart-container">
    <!-- Loading state -->
    <div v-if="loading" class="loading-skeleton">
      <div class="skeleton-grid">
        <div v-for="n of 53" :key="n" class="skeleton-column">
          <div v-for="m of 7" :key="m" class="skeleton-cell"></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button class="retry-btn" @click="fetchData">Retry</button>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="weeksData?.length && totalContributions === 0"
      class="empty-state"
    >
      <p>No contributions yet. Start committing!</p>
    </div>

    <!-- No data source configured -->
    <div v-else-if="!hasDataSource" class="missing-credentials">
      <p>
        Provide one of: <code>data</code>, <code>dataFetcher</code>, or
        <code>userName</code> + <code>token</code>.
      </p>
    </div>

    <!-- Data loaded -->
    <template v-else-if="weeksData?.length">
      <div class="calendar-table">
        <template v-for="(item, index) of weeksData" :key="index">
          <WeekColumn :data="item" />
        </template>
      </div>
      <div v-show="props.showTotalContribute" class="total">
        {{ totalContributions }} total contribution{{
          totalContributions !== 1 ? "s" : ""
        }}
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup name="ContributionChart">
import { getContributionData } from "../api/getContributionData";
import { computed, onMounted, provide, ref } from "vue";
import WeekColumn from "./WeekColumn.vue";

export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ContributionChartProps {
  showTotalContribute?: boolean;
  colors?: string[];

  // Data sources — pick ONE.
  // Mode 1: pre-fetched static data (most secure — fetch on your backend)
  data?: ContributionCalendar;

  // Mode 2: custom async fetcher (secure — token stays on your backend)
  dataFetcher?: () => Promise<ContributionCalendar>;

  // Mode 3: direct GitHub API (convenient — use a fine-grained, read-only token)
  userName?: string;
  token?: string;
}

const props = withDefaults(defineProps<ContributionChartProps>(), {
  showTotalContribute: false,
  colors: () => ["#2f4858", "#266074", "#017a8b", "#00949c", "#00c9a7"]
});

provide("contributionColors", props.colors);

const emit = defineEmits<{
  loaded: [calendar: ContributionCalendar];
  error: [message: string];
}>();

const contributionCalendar = ref<ContributionCalendar | null>(null);
const loading = ref(false);
const error = ref("");

const hasDataSource = computed(() => {
  return (
    props.data != null ||
    props.dataFetcher != null ||
    (props.userName && props.token)
  );
});

const totalContributions = computed(() => {
  return contributionCalendar.value?.totalContributions ?? 0;
});

const weeksData = computed(() => {
  return contributionCalendar.value?.weeks.map((it) => it.contributionDays);
});

async function fetchData() {
  loading.value = true;
  error.value = "";
  try {
    let calendar: ContributionCalendar | null = null;

    if (props.data) {
      // Mode 1: use pre-fetched static data
      calendar = props.data;
    } else if (props.dataFetcher) {
      // Mode 2: call user-provided fetcher
      calendar = await props.dataFetcher();
    } else if (props.userName && props.token) {
      // Mode 3: call GitHub API directly
      const res = await getContributionData(props.userName, props.token);
      calendar =
        res?.user?.contributionsCollection?.contributionCalendar ?? null;
    }

    contributionCalendar.value = calendar;
    if (calendar) {
      emit("loaded", calendar);
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch contribution data";
    error.value = message;
    emit("error", message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (hasDataSource.value) {
    fetchData();
  }
});
</script>
<style scoped>
.contribution-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
}

/* Loading skeleton */
.loading-skeleton {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
}
.skeleton-grid {
  display: flex;
  gap: 2px;
}
.skeleton-column {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.skeleton-cell {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: #3a3a3a;
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

/* Error state */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
}
.error-message {
  color: #e5534b;
  font-size: 14px;
  margin: 0;
}
.retry-btn {
  padding: 6px 16px;
  border: 1px solid #444;
  border-radius: 6px;
  background: #333;
  color: #ddd;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}
.retry-btn:hover {
  background: #444;
}

/* Empty state */
.empty-state {
  padding: 24px;
  color: #888;
  font-size: 14px;
}

/* Missing data source */
.missing-credentials {
  padding: 24px;
  color: #888;
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
}
.missing-credentials code {
  background: #333;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 13px;
}

.total {
  border: 2px solid #444;
  border-radius: 4px;
  padding: 6px 24.2px;
  font-size: 18px;
  user-select: none;
  transition: background-color 0.3s ease;
}
.total:hover {
  background-color: #333;
  transition: background-color 0.3s ease;
}
.calendar-table {
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  overflow: visible;
}
</style>
