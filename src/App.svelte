<script>
  import {
    LeafletMap,
    Marker,
    Polyline,
    Popup,
    TileLayer,
    CircleMarker,
  } from 'svelte-leafletjs';
  import twentycolors from './twentycolors';
  import polylineEncoded from 'polyline-encoded';
  import locations from './locations.json';
  import 'leaflet/dist/leaflet.css';

  const mapOptions = {
    center: [38, -82],
    zoom: 6,
  };
  // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileUrl =
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: '© OpenStreetMap contributors',
  };

  const lines = [];

  for (let i = 0, l = locations.length; i < l; i++) {
    const loc = locations[i];
    if (loc.polyline) {
      lines.push({
        latLngs: polylineEncoded.decode(loc.polyline),
        color: twentycolors[loc.day],
      });
    }
  }

  let leafletMap;
</script>

<div class="example">
  <LeafletMap bind:this={leafletMap} options={mapOptions}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    {#each lines as line}
      <Polyline {...line} />
    {/each}
    {#each locations as { latLng, date, address, city, state, notes, day, pic }}
      <CircleMarker
        {latLng}
        radius={10}
        color={twentycolors[day]}
        fillColor={twentycolors[day]}
      >
        <Popup>
          {#if pic}
            <img
              src={`https://cdn.glitch.global/a5de7491-652b-44bf-8f2f-149875203e18/thumbnails%2F${pic}`}
              alt={`${city}, ${state}`}
              class="popup-img"
            />
          {/if}
          <h3>{date}/2001</h3>
          <h3>{address}</h3>
          <p>{city}, {state}</p>
          {#if notes}<p>Notes: {notes}</p>{/if}
        </Popup>
      </CircleMarker>
    {/each}
  </LeafletMap>
</div>

<style>
  .example {
    width: 100%;
    height: 100vh;
  }
  .popup-img {
    max-width: 300px;
  }
</style>
