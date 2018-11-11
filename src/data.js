import loki from 'lokijs'

var database = new loki();
var holidays = database.addCollection("holidays");
holidays.insert({ name: "Tom Elliott", startdate: "8Nov18", enddate: "22Nov18", lat: -21.9549806, lon: -49.0232348 });
holidays.insert({ name: "Nikki Christofi", startdate: "8Nov18", enddate: "22Nov18", lat: 38.7077507, lon: -9.1365919 });
holidays.insert({ name: "Amy Smith", startdate: "8Nov18", enddate: "22Nov18", lat: 55.9496416, lon: -3.1902352 });
module.exports = database
