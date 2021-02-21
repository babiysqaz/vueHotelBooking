<template>
  <div id="Room" class="container">
    <div class="row banner">
      <img src="" />
    </div>
    <div class="row roomInfo">
      <div class="col-8 left">
        <div class="roomIntroduction">
          <h1>{{ this.room.name }}</h1>
          <p>{{ this.room.description }}</p>
          <div>
            平日每晚 ${{ this.room.normalDayPrice }}
            <!-- 為了增加空格而用span，以此來套用margin -->
            <span> 假日每晚 ${{ this.room.holidayPrice }} </span>
          </div>
        </div>

        <div class="row rooomSpecification">
          <div class="col-6">
            <ul>
              <li>客房人數限制：{{ getGuestLimit() }}人</li>
              <li>床型：{{ getBedType() }}</li>
              <li>
                衛浴數量：{{ this.room.descriptionShort["Private-Bath"] }}間
              </li>
            </ul>
          </div>
          <div class="col-6">
            <ul>
              <li>
                房間大小：{{ this.room.descriptionShort.Footage }} 平方公尺
              </li>
              <li>
                Check In 時間：{{ this.room.checkInAndOut.checkInEarly }} -
                {{ this.room.checkInAndOut.checkInLate }}
              </li>
              <li>Check Out 時間：{{ this.room.checkInAndOut.checkOut }}</li>
            </ul>
          </div>
        </div>

        <div class="row roomService">
          <div class="col-3">
            <ul>
              <li>Wifi</li>
              <li>早餐</li>
              <li>Mini Bar</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <li>客房服務</li>
              <li>電話</li>
              <li>空調</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <li>冰箱</li>
              <li>沙發</li>
              <li>景觀</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <li>可吸菸</li>
              <li>適合兒童</li>
              <li>寵物攜帶</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-4 right">
        <div class="BookingForm">
          <BookingForm :roomName="this.room.name" /> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookingForm from '@/components/BookingForm.vue'
import axios from "axios";
export default {
  components: {
    BookingForm,
  },
  name: "Room",
  data() {
    return {     
      room: {
        checkInAndOut: {
          checkInEarly: "00:00",
          checkInLate: "00:00",
          checkOut: "00:00",
        },
        descriptionShort: {
          GuestMax: "-",
          Footage: "-",
          "Private-Bath": "-",
          Bed: [],
        },
        amenitiesList: [],
      },
    };
  },
  created() {
    //取得房型詳細資料
    axios
      .get(
        `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.$route.query.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer kFSBYFh36KnrYKWIJ7wfU8KPLff8g9Qj1ytRy7dIcogo0uGrYJN4mys81L19",
          },
        }
      )
      .then((response) => {
        console.log(response.data.booking.date);
        this.room = response.data.room[0];
        document
          .querySelector(".banner > img")
          .setAttribute("src", this.room.imageUrl[0]);
        this.setAmenitiesTypes();
      });
  },
  methods: {
    getGuestLimit() {
      if (
        this.room.descriptionShort.GuestMin ==
        this.room.descriptionShort.GuestMin
      )
        return this.room.descriptionShort.GuestMin;
      else {
        return (
          this.room.descriptionShort.GuestMin +
          "-" +
          this.room.descriptionShort.GuestMax
        );
      }
    },
    getBedType() {
      let bedType = "";
      for (let i = 0; i < this.room.descriptionShort.Bed.length; i++) {
        switch (this.room.descriptionShort.Bed[i]) {
          case "Single":
            bedType += "單人床";
            break;
          case "Small Double":
            bedType += "小型雙人床";
            break;
          case "Double":
            bedType += "雙人床";
            break;
          case "Queen":
            bedType += "豪華雙人床";
            break;
          case "Deluxe Single Room":
            bedType += "豪華單人床";
            break;
          default:
            return "未取得房型";
        }
        return bedType;
      }
    },
    setAmenitiesTypes() {
      let list = document.querySelectorAll(".roomService ul > li");
      let listValue = Object.values(this.room.amenities);
      for (let i = 0; i < list.length; i++) {
        switch (listValue[i]) {
          case true:
            list[i].classList.add("amenities-true");
            break;
          case false:
            list[i].classList.add("amenities-false");
            break;
          default:
            console.log("setAmenitiesTypes()有誤");
            break;
        }
      }
    },
  },
};
</script>

<style lang="sass">
#Room
  h1
    font-size: 2rem
  p
    font-size: 1.2rem
  .banner
    margin-bottom: 2rem
    img
      width: 100%
      height: 70vh
  .roomIntroduction
    margin-bottom: 1rem
    div
      font-weight: bold
      font-size: 1.5rem
      text-align: right
      span
        margin-left: 1rem
  .rooomSpecification
    font-size: 1.2rem
    padding-top: 1rem
    padding-bottom: 1rem
    border-top: 2px gray solid
    border-bottom: 2px gray solid
    ul
      list-style-type: none
      margin: 0px
      padding: 0px
      li
        opacity: 0.8
        padding-bottom: 0.5rem
  .BookingForm
    box-shadow: 2px 2px 4px 4px #eaeaea
    padding: 2rem
  .roomService
    font-size: 1.2rem
    padding-top: 1rem
    padding-bottom: 5rem
    ul
      list-style-type: none
      padding: 0px
      li
        padding-bottom: 0.5rem
        letter-spacing: 1px
    .amenities-true
      &::before
        content: ''
        width: 1rem
        height: 1rem
        margin-right: 0.5rem
        display: inline-block
        vertical-align: middle
        box-sizing: border-box
        background-color: gray
        border: 1px
          width: 1px
          color: gray
          style: solid
    .amenities-false
      &::before
        content: ' '
        width: 1rem
        height: 1rem
        margin-right: 0.5rem
        display: inline-block
        vertical-align: middle
        box-sizing: border-box
        border: 1px
          width: 1px
          color: gray
          style: solid
</style>