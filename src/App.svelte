<script>
    import {LeafletMap, TileLayer} from 'svelte-leafletjs';

    const mapOptions = {
        center: [38, -82],
        zoom: 5,
    };
    const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    let leafletMap;
</script>

<div class="example">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
    </LeafletMap>
</div>

<style>
  .example {
    width: 100%;
    height: 100vh;
  }
</style>
