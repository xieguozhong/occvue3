<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Tools from './components/Tools.vue'
import Footer from './components/Footer.vue'
import { useBaseStore } from './stores/index'
import ACPIView from './views/ACPIView.vue'
import BooterView from './views/BooterView.vue'
import DevicePropertiesView from './views/DevicePropertiesView.vue'
import KernelView from './views/KernelView.vue'
import MiscView from './views/MiscView.vue'
import NVRAMView from './views/NVRAMView.vue'
import PlatformInfoView from './views/PlatformInfoView.vue'
import UEFIView from './views/UEFIView.vue'

import PopWindowView from './views/PopWindowView.vue'
const base = useBaseStore()

</script>

<template>
    <Header />
    <div class="main-container ace-save-state" id="main-container">
        <Sidebar />

        <div class="main-content" >
            <div class="main-content-inner">
                <Tools />
                <div class="page-content" style="padding-right:0px;padding-left:0px;">
                    <div class="container-fluid" >
                        <ACPIView v-show="base.getRoot === 'ACPI'"></ACPIView>
                        <BooterView v-show="base.getRoot === 'Booter'"></BooterView>
                        <DevicePropertiesView v-show="base.getRoot === 'DeviceProperties'"></DevicePropertiesView>
                        <KernelView v-show="base.getRoot === 'Kernel'"></KernelView>
                        <MiscView v-show="base.getRoot === 'Misc'"></MiscView>
                        <NVRAMView v-show="base.getRoot === 'NVRAM'"></NVRAMView>
                        <PlatformInfoView v-show="base.getRoot === 'PlatformInfo'"></PlatformInfoView>
                        <UEFIView v-show="base.getRoot === 'UEFI'"></UEFIView>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
        <PopWindowView></PopWindowView>
    </div>
</template>
