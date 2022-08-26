<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'
import { useTipsStore } from '../stores/Tips_zh-CN'
import { useLangStore } from '../stores/lang'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import { plistEncode, enabledFormat, formatInteger } from '../assets/comm'

const lang = useLangStore().lang
const title = useTipsStore()
const baseStore = useBaseStore()
const table = userTableStore()

const helper = new Helper(table, lang, baseStore)

const { ACPI } = storeToRefs(baseStore)

onMounted(() => {
    initGridTableACPI()
})

function initGridTableACPI() {
    let objGT_ACPI_Add = jQuery('#gridtable_ACPI_Add')
    table.addTable('ACPI_Add', objGT_ACPI_Add)
    table.setTableWidthAndHeight(objGT_ACPI_Add)

    let colNames = ['Path', 'Comment', 'Enabled']
    let colModel = [
        { name: 'Path', index: 'Path', width: 150, editable: true, sortable: false, formatter: plistEncode },
        { name: 'Comment', index: 'Comment', width: 90, editable: true, sortable: false, formatter: plistEncode },
        {
            name: 'Enabled',
            index: 'Enabled',
            width: 70,
            editable: true,
            edittype: 'checkbox',
            editoptions: { value: 'YES:NO' },
            sortable: false,
            fixed: true,
            align: 'center',
            formatter: enabledFormat,
        },
    ]

    const tableHeight = parseInt(table.tableHeight * 0.56)
    helper.initGridTable(objGT_ACPI_Add, ACPI.value.Add, colNames, colModel, table.tableWidth, tableHeight)

    //gridtable-ACPI-Delete
    colNames = ['Comment', 'OemTableId', 'TableLength', 'TableSignature', 'All', 'Enabled']
    colModel = [
        { name: 'Comment', index: 'Comment', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'OemTableId', index: 'OemTableId', width: 150, editable: true, sortable: false, formatter: plistEncode },
        { name: 'TableLength', index: 'TableLength', width: 90, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
        { name: 'TableSignature', index: 'TableSignature', width: 150, editable: true, sortable: false, formatter: plistEncode },
        {
            name: 'All',
            index: 'All',
            width: 70,
            editable: true,
            edittype: 'checkbox',
            editoptions: { value: 'YES:NO' },
            sortable: false,
            formatter: enabledFormat,
            fixed: true,
            align: 'center',
        },
        {
            name: 'Enabled',
            index: 'Enabled',
            width: 70,
            editable: true,
            edittype: 'checkbox',
            editoptions: { value: 'YES:NO' },
            sortable: false,
            fixed: true,
            align: 'center',
            formatter: enabledFormat,
        },
    ]
    let objGT_ACPI_Delete = jQuery('#gridtable_ACPI_Delete')
    table.addTable('ACPI_Delete', objGT_ACPI_Delete)
    helper.initGridTable(objGT_ACPI_Delete, ACPI.value.Delete, colNames, colModel, table.tableWidth, tableHeight)

    //gridtable-ACPI-Patch
    colNames = [
        'Base',
        'BaseSkip',
        'Comment',
        'Count',
        'Find',
        'Limit',
        'Mask',
        'OemTableId',
        'Replace',
        'ReplaceMask',
        'Skip',
        'TableLength',
        'TableSignature',
        'Enabled',
    ]
    colModel = [
        { name: 'Base', index: 'Base', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'BaseSkip', index: 'BaseSkip', width: 90, editable: true, sortable: false, align: 'center', formatter: formatInteger },
        { name: 'Comment', index: 'Comment', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'Count', index: 'Count', width: 60, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
        { name: 'Find', index: 'Find', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'Limit', index: 'Limit', width: 60, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
        { name: 'Mask', index: 'Mask', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'OemTableId', index: 'OemTableId', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'Replace', index: 'Replace', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'ReplaceMask', index: 'ReplaceMask', width: 90, editable: true, sortable: false, formatter: plistEncode },
        { name: 'Skip', index: 'Skip', width: 60, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
        { name: 'TableLength', index: 'TableLength', width: 90, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
        { name: 'TableSignature', index: 'TableSignature', width: 90, editable: true, sortable: false, formatter: plistEncode },
        {
            name: 'Enabled',
            index: 'Enabled',
            width: 70,
            editable: true,
            edittype: 'checkbox',
            editoptions: { value: 'YES:NO' },
            sortable: false,
            fixed: true,
            align: 'center',
            formatter: enabledFormat,
        },
    ]

    let objGT_ACPI_Patch = jQuery('#gridtable_ACPI_Patch')
    table.addTable('ACPI_Patch', objGT_ACPI_Patch)
    helper.initGridTable(objGT_ACPI_Patch, ACPI.value.Patch, colNames, colModel, table.tableWidth, tableHeight)
}

function testclick() {
    console.log(table.getTable('ACPI_Add').jqGrid('getRowData'))
    console.log(baseStore.ACPI.Add)
}
</script>

<template>
    <div class="row">
        
        <div class="col-xs-12" >
            <div class="tabbable">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a data-toggle="tab" href="#tabbable_ACPI_Add" class="tablelia">Add</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#tabbable_ACPI_Delete" class="tablelia">Delete</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#tabbable_ACPI_Patch" class="tablelia">Patch</a>
                    </li>
                </ul>

                <div class="tab-content" style="padding-right: 3px; padding-left: 2px;">
                    <div id="tabbable_ACPI_Add" class="tab-pane fade in active" style="padding-bottom: 5px">
                        <table id="gridtable_ACPI_Add"></table>
                        <span class="grey pull-left">
                            <label for="File_ACPI_Add"
                                ><img :src="helper.getImgURL('fileadd')" style="padding: 0px; height: 16px; cursor: pointer" />
                                <input
                                    type="file"
                                    id="File_ACPI_Add"
                                    style="position: absolute; clip: rect(0 0 0 0)"
                                    accept=".aml"
                                    @change="helper.addFile('File_ACPI_Add')"
                                    multiple
                                />
                            </label>
                        </span>
                        <span class="grey pull-right">
                            <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_ACPI_Add'">
                                    <img :src="helper.getImgURL(item)" class="ctrlicon" :title="lang[item]" /></a
                                >&nbsp;
                            </template>
                        </span>
                    </div>

                    <div id="tabbable_ACPI_Delete" class="tab-pane fade" style="padding-bottom: 5px">
                        <table id="gridtable_ACPI_Delete"></table>
                        <span class="grey pull-right">
                            <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_ACPI_Delete'">
                                    <img :src="helper.getImgURL(item)" class="ctrlicon" :title="lang[item]" /></a
                                >&nbsp;
                            </template>
                        </span>
                    </div>

                    <div id="tabbable_ACPI_Patch" class="tab-pane fade" style="padding-bottom: 5px">
                        <table id="gridtable_ACPI_Patch"></table>
                        <span class="grey pull-right">
                            <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_ACPI_Patch'">
                                    <img :src="helper.getImgURL(item)" class="ctrlicon" :title="lang[item]" /></a
                                >&nbsp;
                            </template>
                        </span>
                    </div>
                </div>
            </div>

            
                <h3 class="header smaller lighter blue">Quirks</h3>
                <div class="checkbox well">
                    <template v-for="(item, index) in ACPI.Quirks" :key="index">
                        <label v-if="typeof item === 'boolean' && index !== 'EnableForAll'" class="mintip" :title="title.ACPI.Quirks[index]">
                            <input type="checkbox" class="ace" v-model="ACPI.Quirks[index]" />
                            <span class="lbl"> {{ index }}</span>
                        </label>
                    </template>

                    <label v-show="baseStore.configisMOD === true" class="mintip" :title="title.ACPI.Quirks.EnableForAll">
                        <input type="checkbox" class="ace" v-model="ACPI.Quirks.EnableForAll" />
                        <span class="lbl"> EnableForAll</span>
                    </label>
                </div>
            
        </div>
    </div>
</template>