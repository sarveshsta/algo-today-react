// import React, { useEffect, useState } from "react";
// import "./indices.css";
// import { useDispatch } from "react-redux";
// import { getNseIndicesApi } from "../../user/features/customdata/custAuthentication";
// import { Circles } from "react-loader-spinner";
// const Indices = () => {
//   const dispatch = useDispatch();
//   const [indices, setIndices] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIndices = async () => {
//       try {
//         const resultAction = await dispatch(getNseIndicesApi()).unwrap();
//         if (resultAction.success) {
//           setIndices(resultAction.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch indices:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIndices();
//   }, [dispatch]);

//   // Utility function for conditional styling based on change
//   const getChangeClass = (change) => {
//     return change >= 0 ? "positive-change" : "negative-change";
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: "rgba(255,255,255,0.7)",
//           zIndex: 9999,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Circles color="#3399cc" height={80} width={80} />
//       </div>
//     );
//   }

//   return (
//     <div className="StockIndex">
//       <div className="Nifty50">
//         <h1 className="heading">NIFTY 50</h1>
//         <h3 className="subhead">{indices["NIFTY 50"]?.price ?? "-"}</h3>
//         <h4 className={`change ${getChangeClass(indices["NIFTY 50"]?.change)}`}>
//           {indices["NIFTY 50"]
//             ? `${indices["NIFTY 50"].change.toFixed(2)} (${indices[
//                 "NIFTY 50"
//               ].pChange.toFixed(2)}%)`
//             : "-"}
//         </h4>
//       </div>

//       <div className="Sensex">
//         <h1 className="heading">BANKNIFTY</h1>
//         <h3 className="subhead">{indices["NIFTY BANK"]?.price ?? "-"}</h3>
//         <h4
//           className={`change ${getChangeClass(indices["NIFTY BANK"]?.change)}`}
//         >
//           {indices["NIFTY BANK"]
//             ? `${indices["NIFTY BANK"].change.toFixed(2)} (${indices[
//                 "NIFTY BANK"
//               ].pChange.toFixed(2)}%)`
//             : "-"}
//         </h4>
//       </div>

//       <div className="Nifty50">
//         <h1 className="heading">FINNIFTY</h1>
//         <h3 className="subhead">
//           {indices["NIFTY FIN SERVICE"]?.price ?? "-"}
//         </h3>
//         <h4
//           className={`change ${getChangeClass(
//             indices["NIFTY FIN SERVICE"]?.change
//           )}`}
//         >
//           {indices["NIFTY FIN SERVICE"]
//             ? `${indices["NIFTY FIN SERVICE"].change.toFixed(2)} (${indices[
//                 "NIFTY FIN SERVICE"
//               ].pChange.toFixed(2)}%)`
//             : "-"}
//         </h4>
//       </div>

//       <div className="Sensex">
//         <h1 className="heading">MIDCPNIFTY</h1>
//         <h3 className="subhead">
//           {indices["NIFTY MIDCAP SELECT"]?.price ?? "-"}
//         </h3>
//         <h4
//           className={`change ${getChangeClass(
//             indices["NIFTY MIDCAP SELECT"]?.change
//           )}`}
//         >
//           {indices["NIFTY MIDCAP SELECT"]
//             ? `${indices["NIFTY MIDCAP SELECT"].change.toFixed(2)} (${indices[
//                 "NIFTY MIDCAP SELECT"
//               ].pChange.toFixed(2)}%)`
//             : "-"}
//         </h4>
//       </div>
//       <div className="Nifty50">
//         <h1 className="heading">FINNIFTY</h1>
//         <h3 className="subhead">
//           {indices["NIFTY FIN SERVICE"]?.price ?? "-"}
//         </h3>
//         <h4
//           className={`change ${getChangeClass(
//             indices["NIFTY FIN SERVICE"]?.change
//           )}`}
//         >
//           {indices["NIFTY FIN SERVICE"]
//             ? `${indices["NIFTY FIN SERVICE"].change.toFixed(2)} (${indices[
//                 "NIFTY FIN SERVICE"
//               ].pChange.toFixed(2)}%)`
//             : "-"}
//         </h4>
//       </div>
//       <div className="Sensex">
//         <h1 className="heading">MIDCPNIFTY</h1>
//         <h3 className="subhead">
//           {indices["NIFTY MIDCAP SELECT"]?.price ?? "-"}
//         </h3>
//         <h4
//           className={`change ${getChangeClass(
//             indices["NIFTY MIDCAP SELECT"]?.change
//           )}`}
//         >
//           {indices["NIFTY MIDCAP SELECT"]
//             ? `${indices["NIFTY MIDCAP SELECT"].change.toFixed(2)} (${indices[
//                 "NIFTY MIDCAP SELECT"
//               ].pChange.toFixed(2)}%)`
//             : "-"}
//         </h4>
//       </div>
//     </div>
//   );
// };

// export default React.memo(Indices);
import React, { useEffect, useState } from "react";
import "./indices.css";
import { useDispatch } from "react-redux";
import { getNseIndicesApi } from "../../user/features/customdata/custAuthentication";
import { Circles } from "react-loader-spinner";

const Indices = () => {
  const dispatch = useDispatch();
  const [indices, setIndices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastSuccessfulData, setLastSuccessfulData] = useState({});

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const resultAction = await dispatch(getNseIndicesApi()).unwrap();
        if (resultAction?.success && resultAction?.data) {
          // Only update state if we receive valid data
          setIndices(resultAction.data);
          setLastSuccessfulData(resultAction.data);
          setIsLoading(false);
        } else {
          // If API call succeeds but returns invalid data, keep previous data
          console.warn("API returned invalid data structure:", resultAction);
        }
      } catch (error) {
        console.error("Failed to fetch indices:", error);
        // On error, keep the last successful data to prevent UI breaks
        if (Object.keys(lastSuccessfulData).length > 0) {
          setIndices(lastSuccessfulData);
        }
        setIsLoading(false);
      }
    };

    fetchIndices(); // initial fetch

    const interval = setInterval(fetchIndices, 2000);
    return () => clearInterval(interval);
  }, [dispatch, lastSuccessfulData]);

  const getChangeClass = (change) => {
    if (typeof change !== 'number' || isNaN(change)) return "";
    return change >= 0 ? "positive-change" : "negative-change";
  };

  const formatValue = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return Number(value).toFixed(decimals);
  };

  const renderIndexCard = (title, dataKey, className = "Nifty50") => {
    const indexData = indices[dataKey];
    const price = indexData?.price;
    const change = indexData?.change;
    const pChange = indexData?.pChange;

    return (
      <div className={className}>
        <h1 className="heading">{title}</h1>
        <h3 className="subhead">
          {price ? formatValue(price, 2) : "-"}
        </h3>
        <h4 className={`change ${getChangeClass(change)}`}>
          {change !== null && change !== undefined && pChange !== null && pChange !== undefined
            ? `${formatValue(change)} (${formatValue(pChange)}%)`
            : "-"
          }
        </h4>
      </div>
    );
  };

if (isLoading && Object.keys(indices).length === 0) {
  return (
    <div className="StockIndexLoader">
      <div style={{ marginLeft: "650px" }}>
      <Circles
        height={60}
        width={60}
         color="#3399cc"
        ariaLabel="loading-indices"
        visible={true}
      />
    </div>
    </div>
  );
}


  return (
    <div className="StockIndex">
      {renderIndexCard("NIFTY 50", "NIFTY 50", "Nifty50")}
      {renderIndexCard("BANKNIFTY", "NIFTY BANK", "Sensex")}
      {renderIndexCard("FINNIFTY", "NIFTY FIN SERVICE", "Nifty50")}
      {renderIndexCard("MIDCPNIFTY", "NIFTY MIDCAP SELECT", "Sensex")}
    </div>
  );
};

export default React.memo(Indices);