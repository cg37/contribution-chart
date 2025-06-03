// types/index.d.ts
declare module "contribution-chart" {
  import { DefineComponent } from "vue";

  export const ContributionChart: DefineComponent<{
    /** GitHub 用户名 */
    userName: string;
    /** GitHub 访问令牌 */
    token: string;
    /** 是否显示总贡献数 */
    showTotalContribute?: boolean;
    /** 是否启用日期选择 */
    selectData?: boolean;
  }>;

  export default ContributionChart;
}
