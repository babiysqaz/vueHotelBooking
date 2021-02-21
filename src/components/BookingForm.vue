<template>
  <div id="BookingForm">
    <form>
      <div class="row name">
        <h1>BOOK NOW</h1>
      </div>
      <div class="row form-group">
        <label for="exampleInputEmail1">NAME</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          v-model.trim="order.name"
        />
        <label for="exampleInputPassword1">TEL</label>
        <input type="text" class="form-control" v-model.trim="order.tel" />
        <label for="exampleInputPassword1">ROOMS</label>
        <input
          disabled
          type="text"
          class="form-control"
          :value="this.roomName"
        />
      </div>
      <div class="row check">
        <DatePicker  v-model="order.date" range value-type="format" :disabled-date="disabledDates"></DatePicker>
        <div class="col-5">
          <label for="dd">CHECK IN</label><br>
          <p>{{order.date[0]}}</p>
        </div>
        <div class="offset-2 col-5">
          <label for="dd">CHECK OUT</label><br>
          <p>{{order.date[order.date.length-1]}}</p>
        </div>
      </div>
    </form> 
    <div class="datePicker_button">
      <button
        type="submit"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        @click="sendBooksOrder(order)"
      >
        立即預訂
      </button>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">訂單完成</h5>         
            </div>
            <p>您已預定完成，詳細內容將傳送簡訊至您的手機。</p> 
            <div class="modal-body">
              NAME {{order.name}}<br />
              TEL {{order.tel}}<br />
              ROOMS {{roomName}}<br />
              DATE {{order.date}}<br />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  data() {
    return {
      cusCheckin: String,
      cusCheckOut: String,
      order: {
        date: "",
        name: "",
        tel: "",
      },
    };
  },
  props: {
    roomName: String,
  },
  components: {
    DatePicker,
  },
  methods: {
    sendBooksOrder(obj) {
      //將__ob__處理掉
      let toDate = JSON.parse(JSON.stringify(obj.date));

      let obj2 = {
        name: obj.name,
        tel: obj.tel,
        date: toDate,
      };
      console.log(obj2);

      // 送出訂單
      axios({
        method: "POST",
        url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.$route.query.id}`,

        headers: {
          accept: "application/json",
          Authorization:
            "Bearer kFSBYFh36KnrYKWIJ7wfU8KPLff8g9Qj1ytRy7dIcogo0uGrYJN4mys81L19",
        },
        data: obj2,
      })
        .then((response) => {
          console.log(response);
          // this.$store.dispatch("getBooksOrder", response.data);
          // this.$store.state.lightbox = true;
          // this.$store.state.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    disabledDates(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date <= today ;
        },
  },
};
</script>

<style lang="sass" scoped>
#BookingForm
  font-weight: bold
  .check
    .col-5
      padding-left: 0px
      padding-right: 0px
      border-bottom: 2px solid black
  h1
    font-size: 1.5rem
  input
    border: 0px
    border-radius: 0px
    border-bottom: 2px solid black
    margin-bottom: 0.5rem
  label
    margin: 0px
  .form-control
    background: white
  .name
    text-align: center
  .mx-datepicker
    display: inline
    z-index: 1
    opacity: 0  
    position: absolute 
  button
    background-color: black
  .datePicker_button
    text-align: right
    margin-top: 1rem
  .modal-content
    p
      text-align: center
      margin-bottom: 0px
    button
      justify-content: right
    .modal-header
      border-bottom:0px
      justify-content: center
    .modal-body
      text-align: center
    .modal-footer
      border-top:0px
      justify-content: center    
</style>