<template>
  <div class="childc">子</div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  inject: ["getData"],
  async mounted() {
    const result = await this.getData();
    this.getChild(result.id);
  },
  methods: {
    getChild(id) {
      fetch("https://unidemo.dcloud.net.cn/api/news/36kr/" + id)
        .then((e) => e.text())
        .then((f) => {
          console.log(f, "子");
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
