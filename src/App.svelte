<script>
    import {LeafletMap, Marker, Polyline, TileLayer} from 'svelte-leafletjs';
    import locations from './locations';
    import twentycolors from './twentycolors';
  
    const mapOptions = {
        center: [38, -82],
        zoom: 5,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
  
    const lines = [];
  
    for (let i = 0, l = locations.length - 1; i < l; i++) {
      const loc = locations[i];
      const
      const day = (new Date())
    }
  

    let leafletMap;
</script>

<div class="example">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        {#each locations as loc}
          <Marker latLng={loc.latLng} />
        {/each}
    </LeafletMap>
</div>

<style>
  .example {
    width: 100%;
    height: 100vh;
  }
</style>
