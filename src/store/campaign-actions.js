import { campaignActions } from "./campaign-slice";

export const fetchCampaigns = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(campaignActions.setLoading(true));
      const response = await fetch(
        "https://react-udemy-http-6231d-default-rtdb.firebaseio.com/data.json"
      );

      if (!response.ok) {
        throw new Error("Campaign cannot be fetched.");
      }
      const data = await response.json();
      dispatch(campaignActions.setLoading(false));

      return data;
    };

    try {
      const campaignData = await fetchData();
      dispatch(
        campaignActions.getAllCampaigns({ campaigns: campaignData.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
