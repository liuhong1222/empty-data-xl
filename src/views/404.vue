<template>
  <div class="page404">
    <p class="word404">页面没找到</p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    document.title = '页面没找到'
  }
}
</script>
<style>
  .page404 {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #0f3854;
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;
  }

  .word404 {
    position: absolute;
    left: 50%;
    top: 50%;
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }
</style>
