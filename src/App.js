import "./App.css";
import Layout from "./components/Layout/Layout";

import CampaignFilter from "./components/Campaign/CampaignFilter";
import CampaignList from "./components/Campaign/CampaignList";

function App() {
  return (
    <Layout>
      <CampaignFilter />
      <CampaignList />
    </Layout>
  );
}

export default App;
