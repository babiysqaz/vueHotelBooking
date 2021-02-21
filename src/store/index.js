import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rooms: [],
        loading: true,
        lightbox: false,
        order: {
            name: '',
            tel: '',
            date: '',
            roomName: ''
        }
    },
    actions: {
        // 取得所有房型並將所有資料存入 state
        getRoomsAllData(context, item) {
            context.commit('PUSHROOMSITEM', item);
        },
    },
    mutations: {
        PUSHROOMSITEM(state, item) {
            item.forEach(element => {
                state.rooms.push(element);
            });
        },
    },
})