import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, resetError } from "../redux/slice";
import {
  getCountries,
  getIsLoadingCountries,
  getErrorCountries,
} from "../redux/selectors";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Pastikan untuk mengimpor Bootstrap CSS

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector memoized
  const selectCountries = (state) => state.globalData.countries;
  const selectSortedCountries = createSelector([selectCountries], (countries) =>
    [...countries].sort((a, b) => b.population - a.population)
  );

  const countries = useSelector((state) => selectSortedCountries(state));
  const isLoading = useSelector(getIsLoadingCountries);
  const error = useSelector(getErrorCountries);

  useEffect(() => {
    dispatch(fetchCountries());
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const formatPopulation = (population) => {
    if (population >= 1_000_000_000) {
      return `${(population / 1_000_000_000).toFixed(1)}B`;
    }
    if (population >= 1_000_000) {
      return `${(population / 1_000_000).toFixed(1)}M`;
    }
    return population.toLocaleString();
  };

  return (
    <div
      className="container py-4"
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        maxWidth: "1200px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-center fw-bold mb-3" style={{ color: "#3c5c2c" }}>
        🌍 Country Rank Population
      </h1>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="text-danger text-center">
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(fetchCountries())}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <table className="table table-hover text-center mb-0">
            <thead
              style={{
                backgroundColor: "#2c5c3c",
                color: "white",
                position: "sticky",
                top: "0",
                zIndex: "10",
                borderBottom: "2px solid #ddd",
              }}
            >
              <tr>
                <th style={{ width: "5%" }}>No</th>
                <th style={{ width: "10%" }}>Flag</th>
                <th style={{ width: "40%" }}>Country</th>
                <th style={{ width: "15%" }}>Code</th>
                <th style={{ width: "30%" }}>Population</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#161e2e", color: "#ffffff" }}>
              {countries.map((country, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/news/${country.name}`)}
                >
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      style={{
                        height: "30px",
                        width: "45px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        borderRadius: "3px",
                      }}
                    />
                  </td>
                  <td>{country.name}</td>
                  <td>{country.cca2 || "N/A"}</td>
                  <td>{formatPopulation(country.population)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
