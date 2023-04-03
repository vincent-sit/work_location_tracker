const url = "https://localhost:7227/api";

const Endpoints = {
  GETLocationById : `${url}/locations/id`,
  GETLocationByNameAndUser: `${url}/locations/nameAndUser`,
  GETUser: "",
  GETTransactionByDateAndUser: `${url}/userlocation/dateanduser`,
  POSTNewLocation: `${url}/locations`,
  POSTNewTransaction: `${url}/userlocation`,
  DELETELocation: `${url}/locations`
}

export default Endpoints;