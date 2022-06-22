<template>
    <b-container id="board" class="board">

        <b-row id="map_row" align-v="stretch" class="b-row">
            <b-col class="b-col map" md="12" ><mc2_map/></b-col>
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
    }
  }

</script>

<style>
#board{
    margin-top:10px;
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


</style>