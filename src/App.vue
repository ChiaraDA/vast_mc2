<template>
  <div id="app">
    <div>
        <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand>Visual Analytics Project</b-navbar-brand>
            <b-nav-text>VAST 2021 Mini-Challenge 2</b-nav-text>
        </b-navbar>
    </div>
    <MiniChallenge2/>
    <div>
      <footer class="bg-light text-center text-lg-start">
        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          Visual Analytics Project - VAST 2021 Mini-Challenge 2
        </div>
        <!-- Copyright -->
      </footer>
    </div>
  </div>
</template>

<script>
import MiniChallenge2 from './components/MiniChallenge2.vue'

export default {
  name: 'App',
  components: {
    MiniChallenge2
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

#app {
  font-family: Quicksand, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #262626;
}

@media (min-width: 992px){
    .navbar-expand-lg {
        justify-content: center;
    }
}

footer{
  margin-top:100px;
}
</style>
