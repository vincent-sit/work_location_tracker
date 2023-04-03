const baseUrl = "https://localhost:7227/api";

const Endpoints = {
  GETLocationById : `${url}/locations/id`,
  GETLocationByNameAndUser: `${url}/locations/nameAndUser`,
  GETUser: "",
  GETTransactionByDateAndUser: `${url}/userlocation/dateanduser`
}

export default Endpoints;