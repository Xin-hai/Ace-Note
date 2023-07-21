<template>
  <span :title="username">{{slug}}</span>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
export default {

  data(){
    return {}
  },

  created(){
    this.setUser()
  },
  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  },
  methods: {
    ...mapActions(
      {
        setUser:  'checkLogin'
      }
    )
  }
}
</script>

<style scoped>
span{
  display:inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background-color: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
