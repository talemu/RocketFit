import axios from "axios";

//.NET endpoint
// export default axios.create({
//   baseURL: "http://localhost:7045/api",
//   params: {},
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// //java api endpoint
// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   params: {},
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

//python prod endpoint
// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   params: {},
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

//python dev endpoint
export default axios.create({
  baseURL: "http://localhost:8000/api",
  params: {},
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
