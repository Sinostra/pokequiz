<template>
    <div class="score">

    </div>
</template>

<script>
export default {
  name: 'Score',

  methods: {

    getScore(params) {
        fetch('http://localhost:8081/')
        .then(response => response.json())
        .then(data => console.log(data));
    }
  }
}
</script>