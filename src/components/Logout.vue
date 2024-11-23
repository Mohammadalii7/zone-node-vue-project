<template>
    <div class="container">
        <a href="/"><button class="tab" @click="logout()"><i class="fa fa-sign-out"></i> logout</button>

        </a>
    </div>
</template>

<script>
export default{
    methods: {
        async logout(){
      localStorage.removeItem('account-info')
      this.$router.push({
        name: 'Login'
        })
    },
}
}
</script>