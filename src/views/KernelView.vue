
<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import { plistEncode, enabledFormat, formatInteger, getPlistEncodeFunction } from '../assets/comm'

const baseStore = useBaseStore()
const table = userTableStore()

const helper = new Helper(table, baseStore)

const { Kernel } = storeToRefs(baseStore)

table.setTableHeight()

const divHeightStyle = { height: parseInt(table.tableHeight * 0.5) + 1 + 'px' }

onMounted(() => {
  initGridTableKernel()
})

function initGridTableKernel() {

  let tableHeight = parseInt(table.tableHeight * 0.44);
  let kernelTableWidth = table.tableWidth - 15;
  //Add
  let colNames = ['Arch', 'BundlePath', 'Comment', 'ExecutablePath', 'PlistPath', 'MaxKernel', 'MinKernel', 'Enabled'];
  let colModel = [
    { name: 'Arch', index: 'Arch', width: 52, editable: true, sortable: false, edittype: 'select', editoptions: { value: { Any: 'Any', i386: 'i386', x86_64: 'x86_64' } }, formatter: getPlistEncodeFunction('Any') },
    { name: 'BundlePath', index: 'BundlePath', width: 170, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Comment', index: 'Comment', width: 160, editable: true, sortable: false, formatter: plistEncode },
    { name: 'ExecutablePath', index: 'ExecutablePath', width: 180, editable: true, sortable: false, formatter: plistEncode },
    { name: 'PlistPath', index: 'PlistPath', width: 130, editable: true, sortable: false, formatter: plistEncode },
    { name: 'MaxKernel', index: 'MaxKernel', width: 80, editable: true, sortable: false, formatter: plistEncode },
    { name: 'MinKernel', index: 'MinKernel', width: 80, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Kernel_Add = jQuery('#gridtable_Kernel_Add');
  table.addTable('Kernel_Add', objGT_Kernel_Add);
  helper.initGridTable(objGT_Kernel_Add, Kernel.Add, colNames, colModel, kernelTableWidth, tableHeight);


  //Block
  colNames = ['Arch', 'Comment', 'Identifier', 'MaxKernel', 'MinKernel', 'Strategy', 'Enabled'];
  colModel = [
    { name: 'Arch', index: 'Arch', width: 70, editable: true, sortable: false, edittype: 'select', editoptions: { value: { Any: 'Any', i386: 'i386', x86_64: 'x86_64' } }, formatter: getPlistEncodeFunction('Any') },
    { name: 'Comment', index: 'Comment', width: 170, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Identifier', index: 'Identifier', width: 180, editable: true, sortable: false, formatter: plistEncode },
    { name: 'MaxKernel', index: 'MaxKernel', width: 80, editable: true, sortable: false, formatter: plistEncode },
    { name: 'MinKernel', index: 'MinKernel', width: 80, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Strategy', index: 'Strategy', width: 100, editable: true, sortable: false, edittype: 'select', align: 'center', editoptions: { value: { Disable: 'Disable', Exclude: 'Exclude' } }, formatter: getPlistEncodeFunction('Disable') },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Kernel_Block = jQuery('#gridtable_Kernel_Block');
  table.addTable('Kernel_Block', objGT_Kernel_Block);
  helper.initGridTable(objGT_Kernel_Block, Kernel.Block, colNames, colModel, kernelTableWidth, tableHeight);


  //Patch
  colNames = ['Arch', 'Base', 'Comment', 'Count', 'Find', 'Identifier', 'Limit', 'Mask', 'MaxKernel', 'MinKernel', 'Replace', 'ReplaceMask', 'Skip', 'Enabled'];
  colModel = [
    { name: 'Arch', index: 'Arch', width: 52, editable: true, sortable: false, edittype: 'select', editoptions: { value: { Any: 'Any', i386: 'i386', x86_64: 'x86_64' } }, formatter: getPlistEncodeFunction('Any') },
    { name: 'Base', index: 'Base', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Comment', index: 'Comment', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Count', index: 'Count', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
    { name: 'Find', index: 'Find', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Identifier', index: 'Identifier', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Limit', index: 'Limit', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
    { name: 'Mask', index: 'Mask', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'MaxKernel', index: 'MaxKernel', width: 75, editable: true, sortable: false, fixed: true, align: 'center', formatter: plistEncode },
    { name: 'MinKernel', index: 'MinKernel', width: 75, editable: true, sortable: false, fixed: true, align: 'center', formatter: plistEncode },
    { name: 'Replace', index: 'Replace', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'ReplaceMask', index: 'ReplaceMask', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Skip', index: 'Skip', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: formatInteger },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Kernel_Patch = jQuery('#gridtable_Kernel_Patch');
  table.addTable('Kernel_Patch', objGT_Kernel_Patch);
  helper.initGridTable(objGT_Kernel_Patch, Kernel.Patch, colNames, colModel, kernelTableWidth, tableHeight);


  //Force
  colNames = ['Arch', 'BundlePath', 'Comment', 'Identifier', 'ExecutablePath', 'MaxKernel', 'MinKernel', 'PlistPath', 'Enabled'];
  colModel = [
    { name: 'Arch', index: 'Arch', width: 52, editable: true, sortable: false, edittype: 'select', editoptions: { value: { Any: 'Any', i386: 'i386', x86_64: 'x86_64' } }, formatter: getPlistEncodeFunction('Any') },
    { name: 'BundlePath', index: 'BundlePath', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Comment', index: 'Comment', width: 100, editable: true, sortable: false, fixed: true, align: 'center', formatter: plistEncode },
    { name: 'Identifier', index: 'Identifier', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'ExecutablePath', index: 'ExecutablePath', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'MaxKernel', index: 'MaxKernel', width: 50, editable: true, sortable: false, fixed: true, align: 'center', formatter: plistEncode },
    { name: 'MinKernel', index: 'MinKernel', width: 50, editable: true, sortable: false, formatter: plistEncode },
    { name: 'PlistPath', index: 'PlistPath', width: 75, editable: true, sortable: false, fixed: true, align: 'center', formatter: plistEncode },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Kernel_Force = jQuery('#gridtable_Kernel_Force');
  table.addTable('Kernel_Force', objGT_Kernel_Force);
  helper.initGridTable(objGT_Kernel_Force, Kernel.Force, colNames, colModel, kernelTableWidth, tableHeight);




}

</script>

<template>
  <div class="row">
    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#tabbable_Kernel_Add" class="tablelia">Add</a></li>
          <li><a data-toggle="tab" href="#tabbable_Kernel_Block" class="tablelia">Block</a></li>
          <li><a data-toggle="tab" href="#tabbable_Kernel_Patch" class="tablelia">Patch</a></li>
          <li><a data-toggle="tab" href="#tabbable_Kernel_Force" class="tablelia">Force</a></li>
          <li><a data-toggle="tab" href="#tabbable_Kernel_Emulate" class="tablelia">Emulate</a></li>
          <li><a data-toggle="tab" href="#tabbable_Kernel_Scheme" class="tablelia">Scheme</a></li>
        </ul>

        <div class="tab-content" style="padding-right:3px;padding-left:2px;">

          <div id="tabbable_Kernel_Add" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <table id="gridtable_Kernel_Add"></table>
            <span class="grey pull-left">
              <label for="File_Kernel_Add"><img :src="helper.getImgURL('fileadd')"
                  style="padding: 0px; height: 16px; cursor:pointer;">
                <input type="file" id="File_Kernel_Add" style="position:absolute;clip:rect(0 0 0 0);" accept=".kext"
                  @change="helper.addFile('File_Kernel_Add')" multiple>
              </label>
            </span>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Kernel_Add'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>

          <div id="tabbable_Kernel_Block" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_Kernel_Block"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Kernel_Block'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>

          <div id="tabbable_Kernel_Patch" class="tab-pane fade in" style="padding-bottom: 5px;">

            <table id="gridtable_Kernel_Patch"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Kernel_Patch'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>

          <div id="tabbable_Kernel_Emulate" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="divHeightStyle">

            <div class="well">
              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.Kernel.Emulate.Cpuid1Data')">
                  Cpuid1Data<input type="text" class="form-control" v-model="Kernel.Emulate.Cpuid1Data" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Kernel.Emulate.Cpuid1Mask')">
                  Cpuid1Mask<input type="text" class="form-control" v-model="Kernel.Emulate.Cpuid1Mask" />
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.Kernel.Emulate.MaxKernel')">
                  MaxKernel<input type="text" class="form-control" v-model="Kernel.Emulate.MaxKernel" />
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.Kernel.Emulate.MinKernel')">
                  MinKernel<input type="text" class="form-control" v-model="Kernel.Emulate.MinKernel" />
                </div>
              </div>

              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.Kernel.Emulate.DummyPowerManagement')">
                  <input type="checkbox" class="ace" v-model="Kernel.Emulate.DummyPowerManagement" />
                  <span class="lbl"> DummyPowerManagement</span>
                </label>


              </div>


            </div>

          </div>

          <div id="tabbable_Kernel_Scheme" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="divHeightStyle">

            <div class="well">
              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.Kernel.Scheme.KernelArch')">
                  KernelArch<a id="btnradiobox_Kernel_Scheme_KernelArch" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Kernel.Scheme.KernelArch" />

                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Kernel.Scheme.KernelCache')">
                  KernelCache<a id="btnradiobox_Kernel_Scheme_KernelCache" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Kernel.Scheme.KernelCache" />

                </div>


              </div>

              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.Kernel.Scheme.CustomKernel')">
                  <input type="checkbox" class="ace" v-model="Kernel.Scheme.CustomKernel" />
                  <span class="lbl"> CustomKernel</span>
                </label>

                <label class="mintip" :title="$t('title.Kernel.Scheme.FuzzyMatch')">
                  <input type="checkbox" class="ace" v-model="Kernel.Scheme.FuzzyMatch" />
                  <span class="lbl"> FuzzyMatch</span>
                </label>


              </div>


            </div>

          </div>

          <div id="tabbable_Kernel_Force" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_Kernel_Force"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Kernel_Force'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>


        </div>
      </div>



      <h3 class="header smaller lighter blue"> Quirks</h3>
      <div class="well">
        <div class="row">
          <div class="col-xs-3 mintip" :title="$t('title.Kernel.Quirks.SetApfsTrimTimeout')">
            SetApfsTrimTimeout<input type="text" class="form-control" v-model="Kernel.Quirks.SetApfsTrimTimeout" />
          </div>

        </div>

        <div class="checkbox">
          <template v-for="(item, index) in Kernel.Quirks" :key="index">
            <label v-if="typeof (item) === 'boolean'" class="mintip" :title="$t('title.Kernel.Quirks.' + index)">
              <input type="checkbox" class="ace" v-model="Kernel.Quirks[index]" />
              <span class="lbl"> {{ index }}</span>
            </label>
          </template>

        </div>
      </div>


    </div>
  </div>
</template>

