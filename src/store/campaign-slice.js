import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  campaignList: [],
  filteredCampaignsList: [],
  error: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    getAllCampaigns(state, action) {
      state.campaignList = action.payload.campaigns;
      state.filteredCampaignsList = action.payload.campaigns;
    },
    filterCampaigns(state, action) {
      console.log(action);
      const filteredCampaigns = getFilteredCampaigns(
        state.campaignList,
        action.payload
      );
      state.filteredCampaignsList = filteredCampaigns;
    },
  },
});

const getFilteredCampaigns = (campaignList, filters) => {
  let filteredCampaigns = [];
  let hasFilter = false;

  if (!filters.keyword && filters.startDate && filters.endDate) {
    filteredCampaigns = campaignList.filter((campaign) => {
      return (
        Date.parse(campaign.startDate) >= Date.parse(filters.startDate) &&
        Date.parse(campaign.endDate) <= Date.parse(filters.endDate)
      );
    });
  }

  if (filters.keyword && filters.startDate && filters.endDate) {
    filteredCampaigns = campaignList.filter((campaign) => {
      return (
        Date.parse(campaign.startDate) >= Date.parse(filters.startDate) &&
        Date.parse(campaign.endDate) <= Date.parse(filters.endDate) &&
        campaign.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    });
  }

  if (filters.keyword && !(filters.startDate && filters.endDate)) {
    filteredCampaigns = campaignList.filter((campaign) => {
      return campaign.name
        .toLowerCase()
        .includes(filters.keyword.toLowerCase());
    });
  }

  if (
    filters.keyword !== "" ||
    (JSON.stringify(filters) !== "{}" &&
      filters &&
      filters.startDate !== null &&
      filters.startDate !== "" &&
      filters.endDate !== null &&
      filters.endDate !== "")
  ) {
    hasFilter = true;
  } else {
    hasFilter = false;
  }

  return filteredCampaigns && filteredCampaigns.length > 0
    ? filteredCampaigns
    : !hasFilter
    ? campaignList
    : [];
};

const store = configureStore({
  reducer: campaignSlice.reducer,
});

export const campaignActions = campaignSlice.actions;
export default store;
