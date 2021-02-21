<template>
  <div 
    id="app" 
    class="container"
  >
    <!-- bootstrap-icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    >
    <div class="header">
      <ul class="row nav">
        <li class="nav-item">
          <span class="nav-link active">:OR</span>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link to="/">
              Home
            </router-link>
          </a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#title"
          >ROOMS</a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#"
          >FACILITIES</a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#"
          >NEWS</a>
        </li>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="#"
          >ABOUT_US</a>
        </li>
      </ul>
    </div>
    <router-view />
    <div class="row footer">
      <div class="col-2">
        :OR
      </div>
      <div class="col-4">
        <div>
          <i class="bi bi-geo-alt-fill" />
          50 Nathan Road,Tsimshatsui, Kowloon Hong Kong
        </div>
        <div><i class="bi bi-telephone-fill" />  +886-900-000-000</div>
        <div><i class="bi bi-envelope-fill" />  or_hotel@gmail.com</div>
      </div>
      <div class="col-2">
        <div>
          <a>HOME</a>
        </div>
        <div>
          <a>ROOMS</a>
        </div>
      </div>
      <div class="col-4">
        <a><i class="bi bi-facebook" /></a>
        <a><i class="bi bi-twitter" /></a>
        <a><i class="bi bi-instagram" /></a>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
            }
        },
        components: {
        },
        created() {
            // 取得所有房型
            axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer kFSBYFh36KnrYKWIJ7wfU8KPLff8g9Qj1ytRy7dIcogo0uGrYJN4mys81L19'
                }
            }).then(response => {
                this.$store.dispatch('getRoomsAllData', response.data.items);
                //console.log(response.data.items);
            }).catch(error => {
                console.log(error);
            });
        },
    }
</script>

<style lang="sass">
//googlefonts
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap')

@media (min-width: 0px) 
  html
    font-size: 8px
@media (min-width: 575.98px) 
  html
    font-size: 10px
@media (min-width: 767.98px) 
  html
    font-size: 12px
@media (min-width: 991.98px) 
  html
    font-size: 14px
@media (min-width: 1199.98px) 
  html
    font-size: 16px
#app
  font-family:'Noto Sans TC', sans-serif
  p
    color: gray    
  a
    color: black 
  .header
    a,span
      font-weight: bold
    a
      text-align: center
    .nav
      flex-wrap: nowrap
      .nav-item
        font-size: 1.2rem
        a
          padding-left: 0px
        &:first-child
          font-size: 2rem
    li
      padding-left: 0px
      padding-right: 0px
      &:first-child
        flex:3 3 5rem
      &:nth-child(2)
        flex:1 0 5rem
      &:nth-child(3)
        flex:1 0 5rem
      &:nth-child(4)
        flex:1 0 5rem
      &:nth-child(5)
        flex:1 0 5rem
      &:nth-child(6)
        flex:1 0 5rem
  .footer
    background-color: #eaeaea
    padding-top: 4rem
    padding-bottom: 4rem
    a
      width: 2rem
      height: 2rem
    >div
      &:first-child
        display: flex
        align-items: center
        justify-content: center
        font-size: 2rem
        font-weight: bold
      &:nth-child(2)
        i
          font-size: 1.2rem
          letter-spacing: 1rem
      &:nth-child(3)
        font-size: 1.5rem
        font-weight: bold
      &:nth-child(4)
        font-size: 1.8rem
        letter-spacing: 1.5rem
</style>