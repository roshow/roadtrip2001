const fs = require('fs');
const path = require('path');
const locations = require('../src/locations');

const startDate = new Date(locations[0].date);

const updated = [];

for (let i = 0, l = locations.length; i < l; i++) {
  const loc = locations[i];
  const prev = updated[i - 1];
  const day = (new Date(loc.date) - startDate) / 86400000 + 1;
  let stop = !prev ? 0 : 1;
  if (prev?.date === loc.date) {
    stop = prev.stop + 1;
  }
  updated[i] = {
    ...loc,
    day,
    stop,
  };
  if (locations[0].polyline) {
    delete updated[i].polyline;
    if (i > 0) {
      updated[i].polyline = locations[i - 1].polyline;
    }
  }
}

fs.writeFileSync(
  path.join(__dirname, '../src/locations.json'),
  JSON.stringify(updated, null, 2)
);
