// types/index.d.ts
declare module "contribution-chart" {
  import type { DefineComponent } from "vue";

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

  export const ContributionChart: DefineComponent<{
    /** Whether to show total contribution count */
    showTotalContribute?: boolean;
    /** Custom 5-color gradient from zero to high contributions */
    colors?: string[];

    // Data sources — provide exactly one:
    /** Pre-fetched static data (most secure — fetch server-side) */
    data?: ContributionCalendar;
    /** Custom async fetcher (secure — token stays on your backend) */
    dataFetcher?: () => Promise<ContributionCalendar>;
    /** GitHub username (for direct API mode) */
    userName?: string;
    /** GitHub personal access token (for direct API mode — use fine-grained, read-only) */
    token?: string;
  }>;

  export default ContributionChart;
}
