import ContributionChart from "./lib/components/ContributionChart.vue";

ContributionChart.install = (app) => {
  app.component("ContributionChart", ContributionChart);
};

export default ContributionChart;
