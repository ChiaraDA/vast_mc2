<template>
    <b-container id="board" class="board">

        <b-row id="range_date_row" align-v="stretch" class="b-row">
            <b-col class="p-0 d-flex" cols="12" md="2"><b-button class="flex-fill">Start Timeline</b-button></b-col>
            <b-col class="range d-flex" md="7">

                <div id="range_date_time" class="flex-fill d-flex align-items-center">
                    <b-form-input id="range-1" v-model="value" type="range" min="1" max="14"></b-form-input>
                </div>
            
            </b-col>
            
            <b-col md="3"><div class="mt-2">Date and Time: {{ value }}</div></b-col>
        </b-row>

        <b-row id="map_row" align-v="stretch" class="b-row">
            <b-col class="map shadow rounded p-3">Map</b-col>
            <b-col class="shadow p-3 rounded" cols="12" md="4">Data</b-col>
        </b-row>

        <b-row id="comparison_row" align-v="stretch" class="b-row">
            <b-col class="comparison shadow rounded p-3">Timeline Comparison</b-col>
        </b-row>

        <b-row id="graphic_row1" align-v="stretch" class="b-row">
            <b-col class="shadow p-3 rounded">Graphic 1</b-col>
            <b-col class="shadow p-3 rounded">Graphic 2</b-col>
        </b-row>

        <b-row id="graphic_row2" align-v="stretch" class="b-row">
            <b-col class="shadow p-3 rounded">Graphic 3</b-col>
            <b-col class="shadow p-3 rounded">Graphic 4</b-col>
        </b-row>
        
        <b-row id="text_row" align-v="stretch" class="b-row">
            <b-col class="shadow p-3 rounded">Text</b-col>
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

#graphic_row1{
    height:400px;
}

#graphic_row2{
    height:400px;
    margin-top:100px;
}

.map{
    height:550px;
}

.node{
    height:400px;
}

.comparison{
    height:150px;
}

#range_date_time{
    vertical-align: bottom;
}

</style>