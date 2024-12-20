import { createSelector } from "reselect";

// Selector untuk negara
const selectCountries = (state) => state.globalData.countries;

export const getCountries = createSelector(
  [selectCountries],
  (countries) => countries
);

// Selector untuk berita
const selectNews = (state) => state.globalData.news;

export const getNews = createSelector([selectNews], (news) => news);
