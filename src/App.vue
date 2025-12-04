<script setup>
import { ref, computed } from 'vue'
import Counter from './Counter.vue'
import About from './About.vue'

const routes = {
  '/': Counter,
  '/about': About,
}

/**
 * SPAをGithub Pagesでホスティングする場合、トップページ以外でリロードすると404エラーになる
 * (SPAでは実際にそのパスを持ったページは存在しないので)
 *
 * そのため、URLのハッシュを使ってルーティングを行う
 * ハッシュ(#)より後ろの部分はサーバー（GitHub Pages）に無視されるため
 * 常にトップページ（index.html）が読み込まれ
 * その後Vueが # の中身を見て正しい画面を表示することができる
 */
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
  <div class="container">
    <div class="header"><a href="#/">Home</a> | <a href="#/about">About</a></div>
    <div class="main">
      <component :is="currentView" />
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

a {
  color: #8c8cd9;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #adadeb;
  text-decoration: underline;
}

.header {
  display: flex;
  justify-content: center;
}

.header a {
  margin-left: 4px;
  margin-right: 4px;
}

.main {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}
</style>
