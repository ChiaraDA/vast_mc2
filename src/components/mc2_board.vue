<template>
    <b-container id="board" class="board">

        <b-row id="range_date_row" align-v="stretch" class="b-row">
            <b-col class="b-col p-0 d-flex border" sm="2"><b-button class="flex-fill">Start Timeline</b-button></b-col>
            <b-col class="b-col range d-flex border" sm="7">

                <div id="range_date_time" class="flex-fill d-flex align-items-center">
                    <b-form-input id="range-1" v-model="value" type="range" min="1" max="14"></b-form-input>
                </div>
            
            </b-col>
            
            <b-col sm="3" class="b-col border"><div class="mt-2">Date and Time: {{ value }}</div></b-col>
        </b-row>

        <b-row id="map_row" align-v="stretch" class="b-row">
            <b-col class="b-col map border" md="8" ><mc2_map/></b-col>
            <b-col class="b-col border" md="4" >Data</b-col>
        </b-row>

        <b-row id="comparison_row" align-v="stretch" class="b-row">
            <b-col class="b-col comparison border">Timeline Comparison</b-col>
        </b-row>

        <b-row id="graphic_row1" align-v="stretch" class="b-row">
            <b-col class="b-col border" md="6">Graphic 1</b-col>
            <b-col class="b-col border" md="6">Graphic 2</b-col>
        </b-row>

        <b-row id="graphic_row2" align-v="stretch" class="b-row">
            <b-col class="b-col border" md="6">Graphic 3</b-col>
            <b-col class="b-col border" md="6">Graphic 4</b-col>
        </b-row>
        
        <b-row id="text_row" align-v="stretch" class="b-row">
            <b-col class="b-col border">Text</b-col>
        </b-row>

    </b-container>
</template>

<script>
import mc2_map from './mc2_map.vue'

  export default {
    name: 'mc2_board',
    components: {
        mc2_map
    },
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
    margin-bottom:10px;
}

.b-col{
    padding:10px;
    border: solid black 1px;
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
    height:auto;
}

.comparison{
    height:150px;
}

#map_row{
    height:fit-content;
}

#range_date_time{
    vertical-align: bottom;
}
</style>