import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function CountryComparison() {
  const { state } = useLocation();
  const { country1, country2 } = state || {};
  const {
    country1: data1,
    country2: data2,
    isLoading,
    error,
  } = useSelector((state) => state.globalData);

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Country Comparison</h1>
      {error.countryComparison ? (
        <p className="text-danger">{error.countryComparison}</p>
      ) : isLoading.countryComparison ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="row align-items-center mb-4">
            <div className="col-md-5 text-center">
              {data1 && (
                <>
                  <img
                    src={data1?.flags?.png}
                    alt={data1?.name?.common}
                    style={{ height: "120px" }}
                  />
                  <h3 className="mt-2">{data1?.name?.common}</h3>
                </>
              )}
            </div>
            <div className="col-md-2 text-center">
              <h4>VS</h4>
            </div>
            <div className="col-md-5 text-center">
              {data2 && (
                <>
                  <img
                    src={data2?.flags?.png}
                    alt={data2?.name?.common}
                    style={{ height: "120px" }}
                  />
                  <h3 className="mt-2">{data2?.name?.common}</h3>
                </>
              )}
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>General Information</th>
                <th>{data1?.name?.common}</th>
                <th>{data2?.name?.common}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Population</td>
                <td>{data1?.population?.toLocaleString()}</td>
                <td>{data2?.population?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{data1?.area?.toLocaleString()} km²</td>
                <td>{data2?.area?.toLocaleString()} km²</td>
              </tr>
              <tr>
                <td>Region</td>
                <td>{data1?.region}</td>
                <td>{data2?.region}</td>
              </tr>
              <tr>
                <td>Capital</td>
                <td>{data1?.capital?.[0]}</td>
                <td>{data2?.capital?.[0]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CountryComparison;
