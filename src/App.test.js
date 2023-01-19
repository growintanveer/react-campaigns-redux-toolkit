import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import CampaignFilter from "./components/Campaign/CampaignFilter";

import { Provider } from "react-redux";

import store from "./store/campaign-slice";

describe("Test cases on Campaign Filter", () => {
  it("Should be able to edit start date", () => {
    const { container } = render(
      <Provider store={store}>
        <CampaignFilter />
      </Provider>
    );

    const testValue = "2023-01-01";
    const startDateInput = getByTestId(container, "start-date");
    fireEvent.change(startDateInput, { target: { value: testValue } });

    expect(startDateInput.value).toEqual(testValue);
  });

  it("Should have minimum value as per start date", () => {
    const { container } = render(
      <Provider store={store}>
        <CampaignFilter />
      </Provider>
    );

    const testValue = "2023-01-01";
    const startDateInput = getByTestId(container, "start-date");
    fireEvent.change(startDateInput, { target: { value: testValue } });

    const endDateInput = getByTestId(container, "end-date");

    expect(endDateInput.getAttribute("min")).toEqual(testValue);
  });

  it("Should be able to edit 'search by name' text input", () => {
    const { container } = render(
      <Provider store={store}>
        <CampaignFilter />
      </Provider>
    );

    const testValue = "Ervin";
    const inputText = getByTestId(container, "keyword");
    fireEvent.change(inputText, { target: { value: testValue } });

    expect(inputText.value).toEqual(testValue);
  });

  it("Should render loading message", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});

describe("Test cases on Campaign List", () => {
  it("Should display loading message and disappear when campaigns arrive", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    // screen.debug();
  });

  it("Should be able to load all the campaigns", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Campaign 1")).toBeInTheDocument()
    );

    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();

    const tbody = table.querySelector("tbody");
    expect(tbody).toBeInTheDocument();

    const tr = tbody.querySelectorAll("tr")[0];
    expect(tr).toBeInTheDocument();

    const td = tr.querySelectorAll("td")[0];
    expect(td).toBeInTheDocument();

    expect(td.textContent).toEqual("Campaign 1");

    // screen.debug();
  });
});

describe("Test cases on filter campaigns", () => {
  it("Should be able to search by start date and end date", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const startDateInput = getByTestId(container, "start-date");
    fireEvent.change(startDateInput, { target: { value: "2022-12-01" } });

    const endDateInput = getByTestId(container, "end-date");
    fireEvent.change(endDateInput, { target: { value: "2022-12-31" } });

    // screen.debug();

    await waitFor(() =>
      expect(screen.getByText("Campaign 2")).toBeInTheDocument()
    );

    // screen.debug();
  });
});
