const csv = require("csv-parser");
const fs = require("fs"); // require fs module of node js
const results = [];
fs.createReadStream("Tripura.csv")
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // TESTCASE 1
    let count1 = (count2 = count3 = count4 = count5 = 0);
    let dictAuthorized = {}; // AuthorizedCap stored in object
    for (let i = 0; i < results.length; i++) {
      let k = results[i].AUTHORIZED_CAP;
      if (k <= 100000) count1 += 1;
      else if (k <= 1000000) count2 += 1;
      else if (k <= 10000000) count3 += 1;
      else if (k <= 100000000) count4 += 1;
      else if (k <= 1000000000) count5 += 1;
    }
    dictAuthorized["<= 1L"] = count1;
    dictAuthorized["1L to 10L"] = count2;
    dictAuthorized["10L to 1Cr"] = count3;
    dictAuthorized["1Cr to 10Cr"] = count4;
    dictAuthorized[">10Cr "] = count5;
    const jsonData1 = JSON.stringify(dictAuthorized);
    console.log(jsonData1);
    fs.writeFile("authorized_cap.json", jsonData1, (err) => {
      if (err) throw err;
      console.log("Authorized cap json file generated");
    });

    // console.log(count1,count2,count3,count4,count5);

    // TESTCASE2
    let dateRes = {};
    for (let j = 2000; j <= 2019; j++) {
      dateRes[j] = 0; // dict initialized with 0
    }
    for (let i = 0; i < results.length; i++) {
      var k = results[i].DATE_OF_REGISTRATION;
      var m = k.toString();
      var str = m;
      var year = str.slice(6);
      let yfinal = parseInt(year);
      yfinal += 2000;
      for (let key in dateRes) {
        if (key == yfinal) {
          // checking key is which year
          dateRes[key] += 1;
        }
      }
    }
    const jsonData2 = JSON.stringify(dateRes);
    console.log(jsonData2);
    fs.writeFile("companyRegistration.json", jsonData2, (err) => {
      if (err) throw err;
      console.log(
        "Company Registration by Year (From 2000 to 2019) json file generated"
      );
    });
    // console.log(Object.keys(dateRes));
    // console.log(Object.values(dateRes));
    // TESCASE 3
    let dict = {};
    for (let i = 0; i < results.length; i++) {
      var k = results[i].DATE_OF_REGISTRATION;
      var m = k.toString();
      var str = m;
      var year = str.slice(6);
      let yfinal = parseInt(year);
      yfinal += 2000;
      if (yfinal == 2015) {
        let pba = results[i].PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;
        if (dict.hasOwnProperty(pba))
          // object1.hasOwnProperty('property1')
          dict[pba] += 1;
        // PRINCIPLE[key] = value. so, PRINCIPLE[pba]+=1 increments value2
        else dict[pba] = 1;
      }
    }
    const jsonData3 = JSON.stringify(dict);
    console.log(jsonData3);
    fs.writeFile("principalbussiness2015.json", jsonData3, (err) => {
      if (err) throw err;
      console.log(
        "Company Registration by principal business activity (for the year 2015) json file generated"
      );
    });
    // console.log(Object.keys(dict));
    // console.log(Object.values(dict));

    // TESTCASE 4
    let datepba = {};
    for (let j = 2000; j <= 2019; j++) {
      datepba[j] = {}; // dict initialized with 0
    }
    for (let i = 0; i < results.length; i++) {
      var k = results[i].DATE_OF_REGISTRATION;
      var m = k.toString();
      var str = m;
      var year = str.slice(6);
      let yfinal = parseInt(year);

      yfinal += 2000;
      for (let key in datepba) {
        if (key == yfinal) {
          // checking key is which year
          let pba = results[i].PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;
          if (datepba[key].hasOwnProperty(pba))
            // object1.hasOwnProperty('property1')
            datepba[key][pba] += 1;
          // PRINCIPLE[key] = value. so, PRINCIPLE[pba]+=1 increments value2
          else datepba[key][pba] = 1;
        }
      }
    }
    const jsonData4 = JSON.stringify(datepba);
    console.log(jsonData4);
    fs.writeFile("groupedaggr.json", jsonData4, (err) => {
      if (err) throw err;
      console.log("Grouped aggregation json file generated");
    });
    // console.log(Object.keys(datepba[2000]));
    // console.log(Object.values(datepba[2000]));
  });
