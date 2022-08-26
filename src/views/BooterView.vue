<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'
import { useTipsStore } from '../stores/Tips_zh-CN'
import { useLangStore } from '../stores/lang'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import { plistEncode, enabledFormat, formatInteger, getPlistEncodeFunction } from '../assets/comm'

const lang = useLangStore().lang
const title = useTipsStore()
const baseStore = useBaseStore()
const table = userTableStore()

const helper = new Helper(table, lang, baseStore)

const { Booter } = storeToRefs(baseStore)


onMounted(() => {
  initGridTableBooter()
})

function initGridTableBooter() {

  //MmioWhitelist
  let colNames = ['Address', 'Comment', 'Enabled'];
  let colModel = [
    { name: 'Address', index: 'Address', width: 100, editable: true, sortable: false, formatter: formatInteger },
    { name: 'Comment', index: 'Comment', width: 200, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];

  let objGT_Booter_MmioWhitelist = jQuery('#gridtable_Booter_MmioWhitelist');
  table.setTableWidthAndHeight(objGT_Booter_MmioWhitelist);

  table.addTable('Booter_MmioWhitelist', objGT_Booter_MmioWhitelist);
  const theTableHeight = parseInt(table.tableHeight * 0.46)

  helper.initGridTable(objGT_Booter_MmioWhitelist, Booter.value.MmioWhitelist, colNames, colModel, table.tableWidth, theTableHeight);


  colNames = ['Arch', 'Comment', 'Count', 'Find', 'Identifier', 'Limit', 'Mask', 'Replace', 'ReplaceMask', 'Skip', 'Enabled'];
  colModel = [
    { name: 'Arch', index: 'Arch', width: 52, editable: true, sortable: false, edittype: 'select', formatter: getPlistEncodeFunction('Any'), editoptions: { value: { Any: 'Any', i386: 'i386', x86_64: 'x86_64' } } },
    { name: 'Comment', index: 'Comment', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Count', index: 'Count', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
    { name: 'Find', index: 'Find', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Identifier', index: 'Identifier', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Limit', index: 'Limit', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
    { name: 'Mask', index: 'Mask', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Replace', index: 'Replace', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'ReplaceMask', index: 'ReplaceMask', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Skip', index: 'Skip', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Booter_Patch = jQuery('#gridtable_Booter_Patch');
  table.addTable('Booter_Patch', objGT_Booter_Patch);
  helper.initGridTable(objGT_Booter_Patch, Booter.value.Patch, colNames, colModel, table.tableWidth, theTableHeight);

}
</script>


<template>
  <div class="row">
    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#tabbable_Booter_Patch" class="tablelia">Patch</a></li>
          <li><a data-toggle="tab" href="#tabbable_Booter_MmioWhitelist" class="tablelia">MmioWhitelist</a></li>
        </ul>

        <div class="tab-content" style="padding-right:3px;padding-left:2px;">

          <div id="tabbable_Booter_Patch" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <table id="gridtable_Booter_Patch"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Booter_Patch'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
              </template>
            </span>
          </div>

          <div id="tabbable_Booter_MmioWhitelist" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_Booter_MmioWhitelist"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Booter_MmioWhitelist'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
              </template>
            </span>
          </div>

        </div>
      </div>


      <h3 class="header smaller lighter blue"> Quirks</h3>
      <div class="well">
        <div class="row">
          <template v-for="(item, index) in Booter.Quirks" :key="index">
            <div v-if="typeof (item) === 'number'" class="col-xs-3 mintip" :title="title.Booter.Quirks[index]">
              {{ index }}<input type="text" class="form-control" v-model="Booter.Quirks[index]">
            </div>
          </template>
        </div>


        <div class="checkbox">
          <template v-for="(item, index) in Booter.Quirks" :key="index">
            <label v-if="typeof (item) === 'boolean' && index !== 'EnableForAll'" class="mintip"
              :title="title.Booter.Quirks[index]">
              <input type="checkbox" class="ace" v-model="Booter.Quirks[index]" />
              <span class="lbl"> {{ index }}</span>
            </label>
          </template>
          <label v-show="baseStore.configisMOD === true" class="mintip" :title="title.Booter.Quirks.EnableForAll">
            <input type="checkbox" class="ace" v-model="Booter.Quirks.EnableForAll" />
            <span class="lbl"> EnableForAll</span>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

