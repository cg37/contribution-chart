// types/index.d.ts
declare module "contribution-chart" {
  import { DefineComponent } from "vue";

  export const ContributionChart: DefineComponent<{
    /** GitHub username */
    userName: string;
    /** GitHub personal access token */
    token: string;
    /** Whether to show total contribution count */
    showTotalContribute?: boolean;
    /** Custom 5-color gradient from zero to high contributions */
    colors?: string[];
  }>;

  export default ContributionChart;
}
