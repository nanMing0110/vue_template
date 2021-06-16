<template>
  <!--内容头开始-->
  <div class="tips_close">
    <div class="title" v-if="showTip">
      <slot></slot>
      <span class="close_span" @click="closeTip" v-if="close">知道了</span>
    </div>
  </div>
  <!--内容头结束-->
</template>

<script>
export default {
  name: "tips_close",
  props: {
    close: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      showTip: true,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    closeTip() {
      this.showTip = false;
    },
  },
};
</script>

<style>
.title {
  font-size: 18px;
  padding: 16px 24px;
  background-color: #ffe4e1;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
  position: relative;
}
.close_span {
  font-size: 16px;
  opacity: 1;
  position: absolute;
  top: 30%;
  right: 2%;
  cursor: pointer;
  color: #c0c4cc;
}
</style>