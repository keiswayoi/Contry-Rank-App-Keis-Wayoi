import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CountryComparison() {
  const { state } = useLocation();
  const { country1, country2 } = state || {};
  const {
    country1: data1,
    country2: data2,
    isLoading,
    error,
  } = useSelector((state) => state.globalData);

  const getGoogleMapsLink = (latlng) => {
    if (!latlng || latlng.length !== 2) return "#";
    const [lat, lng] = latlng;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4">Country Comparison</h1>
      {error.countryComparison ? (
        <p className="text-danger text-center">{error.countryComparison}</p>
      ) : isLoading.countryComparison ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="row align-items-center mb-4">
            <div className="col-md-5 text-center">
              {data1 && (
                <div className="p-3 bg-dark text-white rounded shadow-sm">
                  <img
                    src={data1?.flags?.png}
                    alt={data1?.name?.common}
                    className="img-fluid rounded mb-2"
                    style={{ height: "120px" }}
                  />
                  <h3 className="mt-2">{data1?.name?.common}</h3>
                </div>
              )}
            </div>
            <div className="col-md-2 text-center">
              <h4>VS</h4>
            </div>
            <div className="col-md-5 text-center">
              {data2 && (
                <div className="p-3 bg-dark text-white rounded shadow-sm">
                  <img
                    src={data2?.flags?.png}
                    alt={data2?.name?.common}
                    className="img-fluid rounded mb-2"
                    style={{ height: "120px" }}
                  />
                  <h3 className="mt-2">{data2?.name?.common}</h3>
                </div>
              )}
            </div>
          </div>
          <table className="table table-bordered table-striped bg-white rounded shadow-sm">
            <thead className="table-dark">
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
              <tr>
                <td>View on Map</td>
                <td>
                  <a
                    href={getGoogleMapsLink(data1?.latlng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View {data1?.name?.common} on Map
                  </a>
                </td>
                <td>
                  <a
                    href={getGoogleMapsLink(data2?.latlng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View {data2?.name?.common} on Map
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CountryComparison;
