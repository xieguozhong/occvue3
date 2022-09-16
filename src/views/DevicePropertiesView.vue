<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import { plistEncode } from '../assets/comm'

const baseStore = useBaseStore()
const table = userTableStore()

const helper = new Helper(table, baseStore)

const { DeviceProperties } = storeToRefs(baseStore)

onMounted(() => {
  initGridTableDeviceProperties()
})

function initGridTableDeviceProperties() {
  //AddLeft
  let colNames = ['Devices', 'id'];
  let colModel = [
    { name: 'Devices', index: 'Devices', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'id', index: 'id', editable: false, hidden: true, key: true }
  ];
  let objGT_DeviceProperties_AddLeft = jQuery('#gridtable_DeviceProperties_AddLeft');
  table.setTableWidthAndHeight(objGT_DeviceProperties_AddLeft);
  table.addTable('DeviceProperties_AddLeft', objGT_DeviceProperties_AddLeft);
  const tableHeight = table.tableHeight * 0.65
  helper.initGridTable(objGT_DeviceProperties_AddLeft, DeviceProperties.value.AddLeft, colNames, colModel, table.tableHalfWidth, tableHeight);


  //AddRight
  colNames = ['Key', 'Value', 'Type', 'pid', 'id'];
  colModel = [
    { name: 'Key', index: 'Key', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Value', index: 'Value', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Type', index: 'Type', width: 90, fixed: true, editable: true, sortable: false, align: 'center', edittype: 'select', editoptions: { value: table.dataTypeList } },
    { name: 'pid', index: 'pid', editable: false, hidden: true },
    { name: 'id', index: 'id', editable: false, key: true, hidden: true }
  ];
  let objGT_DeviceProperties_AddRight = jQuery('#gridtable_DeviceProperties_AddRight');
  table.addTable('DeviceProperties_AddRight', objGT_DeviceProperties_AddRight);
  helper.initGridTable(objGT_DeviceProperties_AddRight, DeviceProperties.value.AddRight, colNames, colModel, table.tableHalfWidth, tableHeight, false);

  //增加行选中事件
  objGT_DeviceProperties_AddLeft.jqGrid('setGridParam', {
    onSelectRow: function (rowid) {

      helper.resetSubGridTable(rowid, "DeviceProperties_AddRight", DeviceProperties.value, 'Add');
    }
  }).trigger("reloadGrid");


  //DeleteLeft
  colNames = ['Devices', 'id'];
  colModel = [
    { name: 'Devices', index: 'Devices', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'id', index: 'id', editable: false, hidden: true, key: true }
  ];

  let objGT_DeviceProperties_DeleteLeft = jQuery('#gridtable_DeviceProperties_DeleteLeft');
  table.addTable('DeviceProperties_DeleteLeft', objGT_DeviceProperties_DeleteLeft);
  helper.initGridTable(objGT_DeviceProperties_DeleteLeft, DeviceProperties.value.DeleteLeft, colNames, colModel, table.tableHalfWidth, tableHeight);


  //DeleteRight
  colNames = ['Volume', 'Type', 'pid', 'id'];
  colModel = [
    { name: 'Volume', index: 'Volume', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Type', index: 'Type', width: 90, fixed: true, editable: true, sortable: false, align: 'center', edittype: 'select', editoptions: { value: table.dataTypeList } },
    { name: 'pid', index: 'pid', editable: false, hidden: true },
    { name: 'id', index: 'id', editable: false, key: true, hidden: true }
  ];
  let objGT_DeviceProperties_DeleteRight = jQuery('#gridtable_DeviceProperties_DeleteRight');
  table.addTable('DeviceProperties_DeleteRight', objGT_DeviceProperties_DeleteRight);
  helper.initGridTable(objGT_DeviceProperties_DeleteRight, DeviceProperties.value.DeleteRight, colNames, colModel, table.tableHalfWidth, tableHeight, false);

  //增加行选中事件
  objGT_DeviceProperties_DeleteLeft.jqGrid('setGridParam', {
    onSelectRow: function (rowid) {
      helper.resetSubGridTable(rowid, "DeviceProperties_DeleteRight", DeviceProperties.value, 'Delete');
    }
  }).trigger("reloadGrid"); //重新载入



}

</script>

<template>

  <div class="row">
    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#tabbable_DeviceProperties_Add" class="tablelia">Add</a></li>
          <li><a data-toggle="tab" href="#tabbable_DeviceProperties_Delete" class="tablelia">Delete</a></li>

        </ul>

        <div class="tab-content" style="padding-right:11px;padding-left:2px;">

          <div id="tabbable_DeviceProperties_Add" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <div class="row">
              <div class="col-xs-6">
                <table id="gridtable_DeviceProperties_AddLeft"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_DeviceProperties_AddLeft'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
                  </template>
                </span>
              </div>
              <div class="col-xs-6">
                <table id="gridtable_DeviceProperties_AddRight"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_DeviceProperties_AddRight'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
                  </template>
                </span>
              </div>
            </div>
          </div>

          <div id="tabbable_DeviceProperties_Delete" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="row">
              <div class="col-xs-6">
                <table id="gridtable_DeviceProperties_DeleteLeft"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_DeviceProperties_DeleteLeft'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
                  </template>
                </span>
              </div>
              <div class="col-xs-6">
                <table id="gridtable_DeviceProperties_DeleteRight"></table>
                <span class="grey pull-right">
                  <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                    <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_DeviceProperties_DeleteRight'"><img
                        :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
                  </template>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

