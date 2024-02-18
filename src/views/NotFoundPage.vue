<template>
    <div>
    <div>
        <h1>Please try again <br>Please check the URL.</h1>
    </div>
        <div>
            <ul>
                <li><button @click="$router.go(-1)">Previous Page</button></li>
                <li><button @click="$router.push('/')">Home</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>

