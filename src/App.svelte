<script>
  import {
    LeafletMap,
    Marker,
    Polyline,
    Popup,
    DivIcon,
    TileLayer,
  } from "svelte-leafletjs";
  import locations from "./locations";
  import twentycolors from "./twentycolors";
  import polylineEncoded from "polyline-encoded";
  import "leaflet/dist/leaflet.css";

  const mapOptions = {
    center: [38, -82],
    zoom: 6,
  };
  // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileUrl =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: "© OpenStreetMap contributors",
  };

  const startDate = new Date(`${locations[0].date}/01`);
  const lines = [];

  for (let i = 0, l = locations.length - 1; i < l; i++) {
    const loc = locations[i];
    const dest = locations[i + 1];
    const day = (new Date(`${dest.date}/01`) - startDate) / 86400000;
    lines.push({
      latLngs: polylineEncoded.decode(loc.polyline),
      color: twentycolors[day],
    });
  }

  let leafletMap;
</script>

<div class="example">
  <LeafletMap bind:this={leafletMap} options={mapOptions}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    {#each locations as { latLng, date, address, city, state, notes }, i}
      <Marker {latLng}>
        <DivIcon>
          <div class="marker">
            {i + 1}
          </div>
        </DivIcon>
        <Popup>
          <h3>{date}/2001</h3>
          <h3>{address}</h3>
          <p>{city}, {state}</p>
          {#if notes}<p>Notes: {notes}</p>{/if}
        </Popup>
      </Marker>
    {/each}
    {#each lines as line}
      <Polyline {...line} } />
    {/each}
  </LeafletMap>
</div>

<style>
  .example {
    width: 100%;
    height: 100vh;
  }
  .marker {
    background: white;
    box-sizing: border-box;
    width: 30px;
    top: -9px;
    left: -9px;
    position: relative;
    border: 1px solid black;
    text-align: center;
    font-weight: 800;
  }
</style>
