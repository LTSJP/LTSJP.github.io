<template lang="html">
  <a
    :href="href"
    :class="{active:isActive}"
    @click.prevent="goto"
  >
  <slot></slot>
  </a>
</template>

<script type="text/javascript">
  import routes from '../routes'
  export default({
    props: {
      href:{
        type: String,
        required: true
      }
    },
    computed: {
      isActive(){
        return this.href === this.$root.currenturl
      }
    },
    methods: {
      goto(){
        this.$root.currenturl = this.href
        window.history.pushState(null,routes[this.href],this.href)
      }
    }
  })
</script>
