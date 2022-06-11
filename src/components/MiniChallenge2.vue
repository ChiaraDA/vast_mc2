<template>
    <b-container id="board" class="board">

        <b-row id="map_row" align-v="stretch" class="b-row">
            <b-col class="map shadow rounded p-3">Map</b-col>
            <b-col class="shadow p-3 rounded" cols="12" md="3">Data</b-col>
        </b-row>

        <b-row id="range_date_row" align-v="stretch" class="b-row">
            <b-button>Start</b-button>
            <b-col class="range">

                <div class="stretch">
                    <label>Time line</label>
                    <b-form-input id="range-1" v-model="value" type="range" min="1" max="14"><b-button>Button</b-button></b-form-input>
                </div>
                
                <div class="mt-2">Date and time: {{ value }}</div>
            </b-col>
            <b-col md="3"></b-col>
        </b-row>
        
        <b-row id="text_row" align-v="stretch" class="b-row">
            <b-col class="shadow p-3 rounded">Text</b-col>
        </b-row>

        <b-row id="graphic_row" align-v="stretch" class="b-row">
            <b-col class="shadow p-3 rounded">Graphic 1</b-col>
            <b-col class="shadow p-3 rounded">Graphic 2</b-col>
            <b-col class="shadow p-3 rounded">Graphic 3</b-col>
        </b-row>

    </b-container>
</template>

<script>
  export default {
    data() {
      return {
        value: '1'
      }
    }
  }
</script>

<style>
#board{
    margin-top:50px;
}

.b-row{
    margin-bottom:20px;
}

#text_row{
    margin-top:100px;
}

.map{
    height:500px;
}

</style>