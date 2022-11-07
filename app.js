const express = require("express");
const app = express();
const port = 3005;
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));

const findReps = (responseData) => {
  const returnObj = {
    senators: [],
    representatives: [],
  };
  for (office in responseData.offices) {
    const officeData = responseData.offices[office];
    if (officeData.name == "U.S. Senator") {
      officeData.officialIndices.forEach((senatorInd) => {
        returnObj.senators.push(responseData.officials[senatorInd]);
      });
    }
    if (officeData.name == "U.S. Representative") {
      officeData.officialIndices.forEach((repInd) => {
        returnObj.representatives.push(responseData.officials[repInd]);
      });
    }
  }
  return returnObj;
};

const findDistrict = (responseData) => {
  for (division in responseData.divisions) {
    if (division.includes("/cd:")) {
      return responseData.divisions[division].name;
    }
  }
  return "";
};

app.post("/zip", (req, res) => {
  if (!req.body.zipcode) {
    res.status(400).send("Error: No zipcode received.");
    return;
  }
  axios
    .get(
      `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${req.body.zipcode}&key=AIzaSyC_2DWglQ07_Bbnc_p4GeWClyID9ZgDDIQ`
    )
    .then((response) => {
      const officials = findReps(response.data);
      const district = findDistrict(response.data);
      res.status(200).json({ officials, district });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Local Politician app listening on port ${port}`);
});
