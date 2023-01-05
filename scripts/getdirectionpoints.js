const fs = require('fs');
const path = require('path');
const axios = require('axios');
const locations = require('../src/locations.json');

const getpoints = async (origin, destination) => {
  const res = await axios(
    'https://maps.googleapis.com/maps/api/directions/json',
    {
      params: {
        origin: origin.join(','),
        destination: destination.join(','),
        key: process.env.MAP_API_KEY,
      },
    }
  );
  return res.data.routes[0].overview_polyline.points;
};

(async () => {
  const updatedLocations = await Promise.all(
    locations.map(async (loc, i) => {
      if (i - 1 < 0) return loc;
      const polyline = await getpoints(locations[i - 1].latLng, loc.latLng);
      return {
        ...loc,
        polyline,
      };
    })
  );

  fs.writeFileSync(
    path.join(__dirname, '../src/updatedLocations.json'),
    JSON.stringify(updatedLocations, null, 2),
    () => {}
  );
})();
