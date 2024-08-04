<template>
    <div class="flex flex-col min-h-screen">
        <Nav />
        <div class="pt-[72px] flex-grow">
            <div class="relative w-full h-[286px] bg-[#008dda] shadow-lg flex items-center">
                <div class="absolute left-20 text-white font-bold font-montserrat">
                    <div class="text-4xl mb-2">NeaRuS Finance</div>
                    <div class="text-lg font-medium w-[563px]">
                        Atur management pembayaran serta mengatur kos yang telah di sewa dengan mudah hanya dengan
                        NeaRuS Finance.
                    </div>
                </div>
                <div class="absolute flex space-x-4 bottom-10 right-[90px]">
                    <img class="w-[150px] h-[150px]" :src="finance1" alt="Finance 1" />
                    <img class="w-[150px] h-[150px]" :src="finance2" alt="Finance 2" />
                    <img class="w-[150px] h-[150px]" :src="finance3" alt="Finance 3" />
                </div>
            </div>
            <div class="mt-12 px-4 flex items-center justify-between">
                <div class="text-black text-[32px] font-bold font-montserrat mb-0">
                    Kos yang disewa
                </div>
                <div class="flex items-center space-x-2 ml-5">
                    <i class="fas fa-filter text-black text-xl"></i>
                    <span class="text-lg font-medium text-black">Filter</span>
                </div>
            </div>
            <hr class="border-t-2 border-gray-300 max-w-[1900px] mx-auto mt-1" />

            <div class="mt-6 px-4 flex justify-center">
                <div class="relative w-[1255px] h-[270px] bg-white rounded-[15px] border border-[#8692a6]/60">
                    <!-- Checkmark and PAID Label -->
                    <div class="absolute top-7 right-7 flex items-center space-x-2">
                        <img class="w-6 h-6" :src="checkmark" alt="Checkmark" />
                        <div class="text-black text-[15px] font-bold font-['Montserrat'] leading-7">PAID</div>
                    </div>
                    <!-- Title -->
                    <div
                        class="absolute left-[537px] top-[22px] text-black text-xl font-bold font-['Montserrat'] w-[238px] h-[23px]">
                        Berong-Kost 2 Kudus
                    </div>
                    <!-- Features -->
                    <div class="absolute left-[540px] top-[87px] flex items-center space-x-2">
                        <img class="w-7 h-7" :src="bathroomImage" alt="Kamar Mandi Dalam" />
                        <div class="text-black text-sm font-normal font-['Montserrat'] leading-7">
                            Kamar Mandi Dalam
                        </div>
                    </div>
                    <div class="absolute left-[745px] top-[95px] flex items-center space-x-2">
                        <img class="w-7 h-7" :src="acImage" alt="AC" />
                        <div class="text-black text-sm font-normal font-['Montserrat'] leading-7">
                            AC
                        </div>
                    </div>
                    <div class="absolute left-[540px] top-[141px] flex items-center space-x-2">
                        <img class="w-7 h-7" :src="deskImage" alt="Meja" />
                        <div class="text-black text-sm font-normal font-['Montserrat'] leading-7">
                            Meja
                        </div>
                    </div>
                    <div class="absolute left-[742px] top-[140px] flex items-center space-x-2">
                        <img class="w-7 h-7" :src="toiletImage" alt="Kloset Duduk" />
                        <div class="text-black text-sm font-normal font-['Montserrat'] leading-7">
                            Kloset Duduk
                        </div>
                    </div>
                    <!-- Border Lines -->
                    <div class="absolute left-[537px] top-[63px] border border-[#8692a6]/60 w-[699px] h-0"></div>
                    <div
                        class="absolute left-[932px] top-[61px] border border-[#8692a6]/60 w-[129px] h-0 rotate-90 origin-top-left">
                    </div>
                    <!-- Manage Button -->
                    <div
                        class="absolute left-[537px] top-[203px] bg-[#008dda] rounded-[10px] shadow w-[678px] pt-[15px] pb-4 flex justify-center items-center">
                        <div class="text-center text-white text-base font-semibold font-['Montserrat']">Manage</div>
                    </div>
                    <!-- Image and Price -->
                    <img class="absolute left-0  w-[510px] h-[270px] rounded-lg"
                        :src="image3" />
                    <div
                        class="absolute left-[931px] top-[109px] text-center text-[#2171e3] text-2xl font-semibold font-['Poppins'] w-[305px] h-[41px]">
                        Rp 7.200.000/6bln
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import checkmark from '@/assets/images2/lets-icons_check-fill.png';
import acImage from '@/assets/images2/streamline_hotel-air-conditioner.png';
import deskImage from '@/assets/images2/material-symbols-light_table-restaurant-outline.png';
import bathroomImage from '@/assets/images2/ph_shower-thin.png';
import toiletImage from '@/assets/images2/ph_toilet-thin.png';
import finance1 from '@/assets/images/finance1.png';
import finance2 from '@/assets/images/finance2.png';
import finance3 from '@/assets/images/finance3.png';
import image3 from '@/assets/images/image 3.png';
</script>

<style>
/* No additional styling needed */
</style>
