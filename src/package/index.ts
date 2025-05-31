import { App } from "vue";
import ContributionChart from "./components/ContributionChart.vue";
const components = [ContributionChart];
const install = (app: App) => {
  for (const item of components) {
    app.component(item.name || "ContributionChart", item);
  }
  return app;
};
export default install;
