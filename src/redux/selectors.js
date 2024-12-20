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

// Selector untuk memuat status
const selectIsLoading = (state) => state.globalData.isLoading;

export const getIsLoadingCountries = createSelector(
  [selectIsLoading],
  (isLoading) => isLoading.countries
);

export const getIsLoadingNews = createSelector(
  [selectIsLoading],
  (isLoading) => isLoading.news
);

// Selector untuk kesalahan
const selectError = (state) => state.globalData.error;

export const getErrorCountries = createSelector(
  [selectError],
  (error) => error.countries
);

export const getErrorNews = createSelector(
  [selectError],
  (error) => error.news
);
