<template>
  <div 
    id="Home" 
  >
    <div class="row banner">
      <div class="col-11">
        <img 
          src="../../public/img/holly-stratton-PhwbTwdZ3f4-unsplash@2x.png"
          alt=""
        >
      </div>
      <div class="col-1">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
      </div>
    </div>

    <div class="row locationInfo">
      <div class="col-6">
        <i class="bi bi-geo-alt-fill" />
        <div>UPCOMING NEIGHBORHOODS</div>
        <p>
          Tourist Attractions, Industrial Park, College, Hospital, Airport,
          Major Cross Road For Through Traffic, etc
        </p>
      </div>
      <div class="col-6">
        <i class="bi bi-truck" />
        <div>TRANSPORTATION CONNECTIVITY</div>
        <p>
          Roads, Taxi, Metro, Subway, Buses, Trains, Walking, Bicycle Paths, etc
        </p>
      </div>
    </div>

    <div class="row" id="title">
      <div class="col">
        <div>ENJOY YOUR STAY</div>
        <p>PERFECT PLACE FOR HOLIDAY</p>
      </div>
    </div>

    <div class="roomInfo">
      <div class="row">
        <div class="col-4">
          <img 
            src="" 
            alt="" 
          >
          <span>
            SINGLE ROOM
            <a href="#" @click.prevent="goToRoomPage($store.state.rooms[0].id)">MORE ></a>
          </span>
        </div>
        <div class="col-4">
          <img 
            src="" 
            alt="" 
          >
          <span>
            DELUXE DOUBLE ROOM
            <a href="#" @click.prevent="goToRoomPage($store.state.rooms[1].id)">MORE ></a>
          </span>
        </div>
        <div class="col-4">
          <img 
            src="" 
            alt="" 
          >
          <span>
            DELUXE SINGLE ROOM
            <a href="#" @click.prevent="goToRoomPage($store.state.rooms[2].id)">MORE ></a>
          </span>
        </div>
        <div class="col-4">
          <img 
            src="" 
            alt="" 
          >
          <span>
            TWIN ROOM
            <a href="#" @click.prevent="goToRoomPage($store.state.rooms[3].id)">MORE ></a>
          </span>
        </div>
        <div class="col-4">
          <img 
            src="" 
            alt="" 
          >
          <span>
            DOUBLE ROOM
            <a href="#" @click.prevent="goToRoomPage($store.state.rooms[4].id)">MORE ></a>
          </span>
        </div>
        <div class="col-4">
          <img 
            src="" 
            alt="" 
          >
          <span>
            DELUXE TWIN ROOM
            <a href="#" @click.prevent="goToRoomPage($store.state.rooms[5].id)">MORE ></a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {
  },
  methods: {
    goToRoomPage(id) {
        this.$router.push({
            path: 'room',
            query: {
                id: id
            }
        });
    }
},
created() {
  axios
  .get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
    headers: {
      accept: 'application/json',
      Authorization:
        "Bearer kFSBYFh36KnrYKWIJ7wfU8KPLff8g9Qj1ytRy7dIcogo0uGrYJN4mys81L19",
    },
  })
  .then(function (response) {
    let list = document.querySelectorAll(".roomInfo > div > div> img");
    for (let i = 0; i < list.length; i++) {
      list[i].setAttribute("src", response.data.items[i].imageUrl);
      list[i].setAttribute("height",list[i].width*0.86);
    }
  });
  window.onresize = function(){
    let list = document.querySelectorAll(".roomInfo > div > div> img");
    for (let i = 0; i < list.length; i++) {
      list[i].setAttribute("height",list[i].width*0.86);
    }
  }
}
};


</script>

<style lang="sass" scoped>
#Home         
  .banner
    img
      width: 100%
    >div
      padding-left: 0px
      padding-right: 0px
      &:nth-child(2)
        display: flex
        writing-mode: vertical-rl
        flex-direction: row
        justify-content: center
        align-items: center
        a
          margin-bottom: 1.5rem
          font-size: 1.2rem
          &:first-child
            margin-top: 3rem
  .locationInfo
    margin-top: 3rem
    margin-bottom: 5rem
    
    >div
      div
        font-weight: bold
        font-size: 1.5rem
        margin-bottom: 1rem
    i
      font-size: 1.8rem
  #title
    margin-bottom: 4rem
    >div
      div
        font-size: 1.8rem
        font-weight: bold
  .roomInfo
    img
      width: 100%
    div
      div
        margin-bottom:2rem
        span
          margin-top:1rem
          display: flex
          justify-content: space-between
          a
            color: gray
</style>