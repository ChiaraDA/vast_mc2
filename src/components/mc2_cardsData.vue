<template>
    <div>
    <h5>Details on Payment Methods</h5> 
        <b-card no-body id="cards_details" >
            <b-tabs card>
            <b-tab title="CC" active>
                <p v-if="Object.keys(cc_details).length != 0" class="generic_details pl-3 pr-5 pt-3 pb-3">
                    <b>Date: </b>{{cc_details[0].Day}} <br>
                    <b>Week Day: </b>{{cc_details[0].Week_Day}} <br>
                    <b>Location: </b>{{cc_details[0].Location}} <br>
                    <b>Number of Items: </b>{{Object.keys(cc_details).length}}
                </p>
                <b-card-text v-for="(cc,i) in cc_details" :key="i">
                    <p>
                        {{i+1}}. 
                        <b>Time:</b> {{cc.DayTime.split(" ")[1]}} <br>
                        <b>Last4cc:</b> {{cc.Last4cc}} <br> 
                        <b>Price:</b> {{cc.Price}} 
                    </p>
                </b-card-text>
            </b-tab>
            <b-tab title="Cash">
                <p v-if="Object.keys(cash_details).length != 0" class="generic_details pl-3 pr-5 pt-3 pb-3">
                    <b>Date: </b>{{cash_details[0].Day}} <br>
                    <b>Week Day: </b>{{cash_details[0].Week_Day}} <br>
                    <b>Location: </b>{{cash_details[0].Location}} <br>
                    <b>Number of Items: </b>{{Object.keys(cash_details).length}}
                </p>
                <b-card-text v-for="(cash,i) in cash_details" :key="i">
                    <p>
                        {{i+1}}. 
                        <b>Last4cc:</b> {{cash.Card_number}} <br> 
                        <b>Price:</b> {{cash.Price}} 
                    </p>
                </b-card-text>
            </b-tab>
            <b-tab title="Both">
                <p v-if="Object.keys(both_details).length != 0" class="generic_details pl-3 pr-5 pt-3 pb-3">
                    <b>Date: </b>{{both_details[0].Day}} <br>
                    <b>Week Day: </b>{{both_details[0].Week_Day}} <br>
                    <b>Location: </b>{{both_details[0].Location}} <br>
                    <b>Number of Items: </b>{{Object.keys(both_details).length}}
                </p>
                <b-card-text v-for="(both,i) in both_details" :key="i">
                    <p>
                        {{i+1}}. 
                        <b>Time:</b> {{both.DayTime.split(" ")[1]}} <br>
                        <b>Last4cc:</b> {{both.Last4cc}} <b>LNumber:</b> {{both.lc_number}}  <br> 
                        <b>Price:</b> {{both.Price}} 
                    </p>
                </b-card-text>
            </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
export default {
  name: "mc2_cardsData",
  data() {
    return {
        cc_details: [],
        cash_details: [],
        both_details: [],
    };
  },
}
</script>