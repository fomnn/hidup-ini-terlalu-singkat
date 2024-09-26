<script setup lang="ts">
const { data: provinces } = useFetch('/api/provinces')
const { data: usedNumber, refresh } = useFetch('/get-used-number')
// const data = ref({
//   usia: 0,
//   provinsi: '',
//   gender: '',
// })
const curAge = ref(0)
const age = ref(0)
const province = ref('')
const gender = ref('')


async function handleSubmit() {
  const res = await $fetch(`/get-data?province=${province.value}&gender=${gender.value}`)
  age.value = res.age

  localStorage.setItem('curAge', curAge.value.toString())
  localStorage.setItem('province', province.value)
  localStorage.setItem('gender', gender.value)
  localStorage.setItem('age', age.value.toString())

  refresh()
}

function reset() {
  curAge.value = 0
  province.value = ''
  gender.value = ''
  age.value = 0

  localStorage.removeItem('curAge')
  localStorage.removeItem('province')
  localStorage.removeItem('gender')
  localStorage.removeItem('age')
}

onMounted(() => {
  if (import.meta.client) {
    curAge.value = Number.parseInt(localStorage.getItem('curAge') || "0")
    province.value = localStorage.getItem('province') || ""
    gender.value = localStorage.getItem('gender') || ""
    age.value = Number.parseInt(localStorage.getItem('age') || "0")
  }
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="absolute bottom-4 text-xs lg:text-sm font-light right-0 justify-between w-full px-4 lg:px-32 flex items-center gap-16">
      <p  v-if="age">* Data berdasarkan <a
           href="https://www.bps.go.id/id/statistics-table/2/NTAxIzI=/angka-harapan-hidup-laki-laki--2022.html"
           target="_blank" class="hover:underline">Angka Harapan Hidup (AHH) Menurut Provinsi dan Jenis Kelamin di
          Indonesia</a></p>
          <p v-else></p>
      <p>Telah digunakan sebanyak {{ usedNumber }} kali</p>
    </div>
    <form v-if="!age" @submit.prevent="handleSubmit" class="flex flex-col gap-4 px-6 items-center justify-center h-screen">
      <h1 class="text-4xl font-semibold mb-8 text-center">Hidup Ini Terlalu Singkat</h1>
      <div class="">
        <div class="">
          <p>Usia kamu saat ini</p>
          <input v-model="curAge" type="number" class="bg-transparent border border-zinc-800 w-60 px-2 py-1 focus:outline-none">
        </div>
        <div class="">
          <p>Jenis Kelamin</p>
          <select v-model="gender" class="bg-transparent border border-zinc-800 w-60 px-2 py-1">
            <option value="man">Laki-laki</option>
            <option value="woman">Perempuan</option>
          </select>
        </div>
        <div class="">
          <p>Provinsi</p>
          <select v-model="province" class="bg-transparent border border-zinc-800 w-60 px-2 py-1">
            <option v-for="province2 of provinces" :key="province2" :value="province2">{{ province2 }}</option>
          </select>
        </div>
      </div>
      <button class="bg-zinc-800 text-amber-400 w-60 px-2 py-1">Submit</button>
    </form>
    <div v-else class="h-screen px-6 lg:px-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div class="flex flex-col justify-center text-base lg:text-3xl">
          <p>Anda telah melewati {{ ((curAge / age) * 100).toPrecision(2) }}% hidup anda </p>
          <div class="flex items-center gap-2">
            <span class=" text-7xl lg:text-[11rem] lg:leading-[10rem] font-bold -ml-2">{{ Number.parseInt((age - curAge).toFixed()) - 1
              }}</span>
            <div class="">
              <p class="text-2xl lg:text-5xl font-semibold">Tahun lagi</p>
              <p class="text-lg lg:text-2xl ml-1 lg:ml-2 mt-0 lg:mt-2">untuk menamatkan hidup</p>
            </div>
          </div>
          <p class="text-sm lg:text-xl lg:mt-5">Rata-rata usia {{ gender === "man" ? "laki-laki" : "perempuan" }} di Provinsi {{
            toTitleCase(province) }} yaitu <strong>{{ age }}</strong> tahun*</p>
          <button class="text-start w-fit mt-10 text-sm hover:underline" @click="reset">Klik disini untuk mencoba lagi</button>
        </div>
        <div class="flex flex-col lg:justify-center items-center">
          <div class="grid grid-cols-12 gap-1 relative">
            <div v-for="i of (Number.parseInt((age).toFixed()))" :key="i"
                 :class="i + 1 < curAge ? 'bg-zinc-800/80' : 'border border-zinc-800'" class="size-5 lg:size-8"></div>
          </div>
        </div>
      </div>
      <!-- <img src="https://images.unsplash.com/photo-1632421588324-c7f30ebdc7fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGVuam95JTIwbGlmZXxlbnwwfHwwfHx8Mg%3D%3D" alt=""> -->
    </div>
  </div>
</template>

<style scoped>
input {
  @apply border
}
</style>