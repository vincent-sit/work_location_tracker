const url = "https://localhost:7227/api";

const Endpoints = {
  GETUserById : `${url}/users`,
  GETLocationById : `${url}/locations/id`,
  GETLocationByNameAndUser: `${url}/locations/nameAndUser`,
  GETLocationsByUser : `${url}/locations/userId`,
  GETUser: "",
  GETTransactionByDateAndUser: `${url}/userlocation/dateanduser`,
  GETTransactionsBetweenDates: `${url}/userlocation/entriesbetweendates`,
  POSTNewLocation: `${url}/locations`,
  POSTNewTransaction: `${url}/userlocation`,
  PUTTransaction: `${url}/userlocation`,
  DELETELocation: `${url}/locations`
}

export default Endpoints;