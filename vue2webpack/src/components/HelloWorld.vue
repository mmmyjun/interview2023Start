<template>
  <div class="hello">
    <childComp />
  </div>
</template>

<script>
import childComp from "./childComp";
export default {
  name: "HelloWorld",
  components: {
    childComp,
  },
  provide() {
    return {
      getData: this.getData,
    };
  },
  data() {
    return {
    };
  },
  created() {},
  beforeup() {

  },
  mounted() {},
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        fetch("https://unidemo.dcloud.net.cn/api/news")
          .then((e) => e.text())
          .then((f) => {
            if (f) {
              return resolve(JSON.parse(f)[0]);
            }
          });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
