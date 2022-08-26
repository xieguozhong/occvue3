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

const { NVRAM } = storeToRefs(baseStore)



onMounted(() => {
  initGridTableNVRAM()
})

function initGridTableNVRAM() {
  let colNames = ['Devices', 'id'],
    tableWidth = table.tableHalfWidth - 7
    ;
  const tableHeight = table.tableHeight * 0.54

  //AddLeft
  let colModel = [
    { name: 'Devices', index: 'Devices', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'id', index: 'id', editable: false, key: true, hidden: true }
  ];

  let objGT_NVRAM_AddLeft = jQuery('#gridtable_NVRAM_AddLeft');
  table.addTable('NVRAM_AddLeft', objGT_NVRAM_AddLeft);
  helper.initGridTable(objGT_NVRAM_AddLeft, NVRAM.value.AddLeft, colNames, colModel, tableWidth, tableHeight);


  //AddRight
  colNames = ['Key', 'Value', 'Type', 'pid', 'id'];
  colModel = [
    { name: 'Key', index: 'Key', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Value', index: 'Value', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Type', index: 'Type', width: 90, fixed: true, editable: true, sortable: false, align: 'center', edittype: 'select', editoptions: { value: table.dataTypeList } },
    { name: 'pid', index: 'pid', editable: false, hidden: true },
    { name: 'id', index: 'id', editable: false, key: true, hidden: true }
  ];
  let objGT_NVRAM_AddRight = jQuery('#gridtable_NVRAM_AddRight');
  table.addTable('NVRAM_AddRight', objGT_NVRAM_AddRight);
  helper.initGridTable(objGT_NVRAM_AddRight, NVRAM.value.AddRight, colNames, colModel, tableWidth, tableHeight, false);



  //增加行选中事件
  objGT_NVRAM_AddLeft.jqGrid('setGridParam', {
    onSelectRow: function (rowid) {
      helper.resetSubGridTable(rowid, "NVRAM_AddRight", NVRAM.value, 'Add');
    }
  }).trigger("reloadGrid");


  //DeleteLeft
  colNames = ['Devices', 'id'];
  colModel = [
    { name: 'Devices', index: 'Devices', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'id', index: 'id', editable: false, hidden: true, key: true }
  ];
  let objGT_NVRAM_DeleteLeft = jQuery('#gridtable_NVRAM_DeleteLeft');
  table.addTable('NVRAM_DeleteLeft', objGT_NVRAM_DeleteLeft);
  helper.initGridTable(objGT_NVRAM_DeleteLeft, NVRAM.value.DeleteLeft, colNames, colModel, tableWidth, tableHeight);


  //DeleteRight
  colNames = ['Volume', 'Type', 'pid', 'id'];
  colModel = [
    { name: 'Volume', index: 'Volume', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Type', index: 'Type', width: 90, fixed: true, editable: true, sortable: false, align: 'center', edittype: 'select', editoptions: { value: table.dataTypeList } },
    { name: 'pid', index: 'pid', hidden: true, editable: false },
    { name: 'id', index: 'id', hidden: true, editable: false, key: true }
  ];
  let objGT_NVRAM_DeleteRight = jQuery('#gridtable_NVRAM_DeleteRight');
  table.addTable('NVRAM_DeleteRight', objGT_NVRAM_DeleteRight);
  helper.initGridTable(objGT_NVRAM_DeleteRight, NVRAM.value.DeleteRight, colNames, colModel, tableWidth, tableHeight, false);

  //增加行选中事件
  objGT_NVRAM_DeleteLeft.jqGrid('setGridParam', {
    onSelectRow: function (rowid) {
      helper.resetSubGridTable(rowid, "NVRAM_DeleteRight", NVRAM.value, 'Delete');
    }
  }).trigger("reloadGrid"); //重新载入

  //LegacySchemaLeft
  colNames = ['Devices', 'id'];
  colModel = [
    { name: 'Devices', index: 'Devices', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'id', index: 'id', editable: false, hidden: true, key: true }
  ];
  let objGT_NVRAM_LegacySchemaLeft = jQuery('#gridtable_NVRAM_LegacySchemaLeft');
  table.addTable('NVRAM_LegacySchemaLeft', objGT_NVRAM_LegacySchemaLeft);
  helper.initGridTable(objGT_NVRAM_LegacySchemaLeft, NVRAM.value.LegacySchemaLeft, colNames, colModel, tableWidth, tableHeight);


  //LegacySchemaRight
  colNames = ['Volume', 'Type', 'pid', 'id'];
  colModel = [
    { name: 'Volume', index: 'Volume', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Type', index: 'Type', width: 90, fixed: true, editable: true, sortable: false, align: 'center', edittype: 'select', editoptions: { value: table.dataTypeList } },
    { name: 'pid', index: 'pid', hidden: true, editable: false },
    { name: 'id', index: 'id', hidden: true, editable: false, key: true }
  ];
  let objGT_NVRAM_LegacySchemaRight = jQuery('#gridtable_NVRAM_LegacySchemaRight');
  table.addTable('NVRAM_LegacySchemaRight', objGT_NVRAM_LegacySchemaRight);
  helper.initGridTable(objGT_NVRAM_LegacySchemaRight, NVRAM.value.LegacySchemaRight, colNames, colModel, tableWidth, tableHeight, false);

  //增加行选中事件
  objGT_NVRAM_LegacySchemaLeft.jqGrid('setGridParam', {
    onSelectRow: function (rowid) {
      helper.resetSubGridTable(rowid, "NVRAM_LegacySchemaRight", NVRAM.value, 'LegacySchema');
    }
  }).trigger("reloadGrid"); //重新载入

}


</script>

<template>
  <div class="row">

    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#tabbable_NVRAM_Add" class="tablelia">Add</a></li>
          <li><a data-toggle="tab" href="#tabbable_NVRAM_Delete" class="tablelia">Delete</a></li>
          <li><a data-toggle="tab" href="#tabbable_NVRAM_LegacySchema" class="tablelia">LegacySchema</a></li>
        </ul>

        <div class="tab-content" style="padding-right:18px;padding-left:2px;">

          <div id="tabbable_NVRAM_Add" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <div class="row">
              <div class="col-xs-6">
                <table id="gridtable_NVRAM_AddLeft"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_NVRAM_AddLeft'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
                  </template>
                </span>
              </div>
              <div class="col-xs-6">
                <table id="gridtable_NVRAM_AddRight"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_NVRAM_AddRight'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
                  </template>
                </span>
              </div>
            </div>
          </div>

          <div id="tabbable_NVRAM_Delete" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="row">
              <div class="col-xs-6">
                <table id="gridtable_NVRAM_DeleteLeft"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_NVRAM_DeleteLeft'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
                  </template>
                </span>
              </div>
              <div class="col-xs-6">
                <table id="gridtable_NVRAM_DeleteRight"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_NVRAM_DeleteRight'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
                  </template>
                </span>
              </div>
            </div>
          </div>

          <div id="tabbable_NVRAM_LegacySchema" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="row">
              <div class="col-xs-6">
                <table id="gridtable_NVRAM_LegacySchemaLeft"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_NVRAM_LegacySchemaLeft'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
                  </template>
                </span>
              </div>
              <div class="col-xs-6">
                <table id="gridtable_NVRAM_LegacySchemaRight"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_NVRAM_LegacySchemaRight'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
                  </template>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <h3 class="header smaller lighter blue"></h3>
      <div class="well">

        <div class="checkbox">
          <template v-for="(item, index) in NVRAM.root" :key="index">
            <label v-if="typeof (item) === 'boolean'" class="mintip" :title="title.NVRAM[index]">
              <input type="checkbox" class="ace" v-model="NVRAM.root[index]" />
              <span class="lbl"> {{ index }}</span>
            </label>
          </template>
        </div>

      </div>


    </div>

  </div>
</template>

