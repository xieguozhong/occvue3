<script setup>
import { useBaseStore } from '../stores/index'
import { useTipsStore } from '../stores/Tips_zh-CN'

const base = useBaseStore()
const title = useTipsStore()
</script>

<template>
    <div id="sidebar" class="sidebar responsive ace-save-state">
        <ul class="nav nav-list">
            <li class="open">
                <a><i class="menu-icon fa fa-list"></i><span class="menu-text">SECTIONS</span></a>
                <b class="arrow"></b>

                <ul class="submenu">
                    <template v-for="(item, index) in base.sections" :key="index">
                        <!-- <li v-bind:class="{ active: base.root === item }">
                            <router-link :to="item" @click="base.setRoot(item)" :title="title[item].title">
                                <i class="menu-icon fa fa-caret-right"></i>{{ item }}
                            </router-link>
                            <b class="arrow"></b>
                        </li> -->

                        <li v-bind:class="{ active: base.getRoot === item }">
                            <a href="#" v-on:click="base.setRoot(item)" :title="title[item].title">
                                <i class="menu-icon fa fa-caret-right"></i>
                                {{ item }}
                            </a>

                            <b class="arrow"></b>
                        </li>


                    </template>
                </ul>
            </li>
        </ul>
        <!-- /.nav-list -->

        <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
            <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state"
                data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
        </div>
    </div>
</template>
