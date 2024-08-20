<template>

    <button @click="test">submit</button>

</template>


<script setup>

import { ref } from 'vue';

import axios from 'axios'

const data = ref(null)


const test = async () => {


    try {

        const result = await axios.get("https://api.github.com/users")


        if (result.status == 200) {
            console.log(result.data)
        }


    } catch (error) {
        console.log(error);
    }

}

</script>