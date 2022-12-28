<script>
    import {LeafletMap, Marker, Polyline, TileLayer} from 'svelte-leafletjs';
    import locations from './locations';
    import twentycolors from './twentycolors';
  
    const mapOptions = {
        center: [38, -82],
        zoom: 5,
    };
    // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
  
    const lines = [];
  
    for (let i = 0, l = locations.length - 1; i < l; i++) {
      const loc = locations[i];
      const dest = locations[i + 1];
      const day = (new Date(dest.date) - new Date(locations[0].date)) / (24 * 60 * 60 * 1000);
      lines.push({
        latLngs: [loc.latLng, dest.latLng],
        color: twentycolors[day],
      });
    }
  

    let leafletMap;
</script>

<div class="example">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        {#each locations as loc}
          <Marker latLng={loc.latLng} />
        {/each}
        {#each lines as line}
          <Polyline {...line} />
        {/each}
    </LeafletMap>
</div>

<style>
  .example {
    width: 100%;
    height: 100vh;
  }
</style>
