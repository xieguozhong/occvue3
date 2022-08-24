<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'
import { useTipsStore } from '../stores/Tips_zh-CN'
import { useLangStore } from '../stores/lang'
import { usepopdataStore } from '../stores/popdata'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import  {getUUID,plistEncode,enabledFormat,formatInteger}  from '../assets/comm'

const lang = useLangStore().lang
const title = useTipsStore()
const baseStore = useBaseStore()
const table = userTableStore()
const popdata = usepopdataStore()

const helper = new Helper(table, lang, baseStore,popdata)

const { PlatformInfo } = storeToRefs(baseStore)



onMounted(() => {
  initGridTablePlatformInfo()
})

function opbtnromclick() {
  PlatformInfo.value.Generic.ROM = getUUID().split('-')[4];
}

function btnSystemUUIDclick() {
  PlatformInfo.value.Generic.SystemUUID = getUUID();
}


function initGridTablePlatformInfo() {

  const colNames = ['AssetTag', 'BankLocator', 'DeviceLocator', 'Manufacturer', 'PartNumber', 'SerialNumber', 'Size', 'Speed'];
  const colModel = [
    { name: 'AssetTag', index: 'AssetTag', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'BankLocator', index: 'BankLocator', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'DeviceLocator', index: 'DeviceLocator', width: 100, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Manufacturer', index: 'Manufacturer', width: 100, editable: true, sortable: false, formatter: plistEncode },
    { name: 'PartNumber', index: 'PartNumber', width: 100, editable: true, sortable: false, formatter: plistEncode },
    { name: 'SerialNumber', index: 'SerialNumber', width: 100, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Size', index: 'Size', width: 100, editable: true, sortable: false, formatter: formatInteger },
    { name: 'Speed', index: 'Speed', width: 100, editable: true, sortable: false, formatter: formatInteger }

  ];
  let objGT_PlatformInfo_MemoryDevices = jQuery('#gridtable_PlatformInfo_MemoryDevices');
  table.addTable('PlatformInfo_MemoryDevices', objGT_PlatformInfo_MemoryDevices);
  helper.initGridTable(objGT_PlatformInfo_MemoryDevices, PlatformInfo.Memory_Devices, colNames, colModel, table.tableWidth - 15, table.tableHeight * 0.36);
}

</script>

<template>
  <div class="row">
    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active" id="li_PlatformInfo_Generic"><a data-toggle="tab" href="#tabbable_PlatformInfo_Generic"
              class="tablelia" id="button_PlatformInfo_Generic">Generic</a></li>
          <li v-show="baseStore.configisfull === true"><a data-toggle="tab" href="#tabbable_PlatformInfo_DataHub"
              class="tablelia">DataHub</a></li>
          <li v-show="baseStore.configisfull === true"><a data-toggle="tab" href="#tabbable_PlatformInfo_Memory"
              class="tablelia">Memory</a></li>
          <li v-show="baseStore.configisfull === true"><a data-toggle="tab" href="#tabbable_PlatformInfo_PlatformNVRAM"
              class="tablelia">PlatformNVRAM</a></li>
          <li v-show="baseStore.configisfull === true"><a data-toggle="tab" href="#tabbable_PlatformInfo_SMBIOS"
              class="tablelia">SMBIOS</a></li>

        </ul>

        <div class="tab-content" style="padding-right:18px;padding-left:2px;">

          <div id="tabbable_PlatformInfo_Generic" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <div class="well">
              <div class="row">
                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.SystemProductName">
                  SystemProductName<a id="btnradiobox_PlatformInfo_Generic_SystemProductName"
                    style="text-decoration:none" v-on:click="helper.btnradioboxclick($event)">&nbsp;<img
                      :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="PlatformInfo.Generic.SystemProductName">
                </div>
                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.MLB">
                  MLB<input type="text" class="form-control" v-model="PlatformInfo.Generic.MLB">
                </div>
                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.SystemSerialNumber">
                  SystemSerialNumber<a style="text-decoration:none" target="_blank"
                    :href="'https://checkcoverage.apple.com/cn/zh?sn=' + PlatformInfo.Generic.SystemSerialNumber">&nbsp;<img
                      :src="helper.getImgURL('check')" class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="PlatformInfo.Generic.SystemSerialNumber">
                </div>

                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.SystemUUID">
                  SystemUUID<a style="text-decoration:none" v-on:click="btnSystemUUIDclick">&nbsp;<img
                      :src="helper.getImgURL('generate')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="PlatformInfo.Generic.SystemUUID">
                </div>
                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.ROM">
                  ROM<a style="text-decoration:none" v-on:click="opbtnromclick">&nbsp;<img
                      :src="helper.getImgURL('generate')" class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="PlatformInfo.Generic.ROM">
                </div>
                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.ProcessorType">
                  ProcessorType<input type="text" class="form-control" v-model="PlatformInfo.Generic.ProcessorType">
                </div>

                <div class="col-xs-3 mintip" :title="title.PlatformInfo.Generic.SystemMemoryStatus">
                  SystemMemoryStatus<a id="btnradiobox_PlatformInfo_Generic_SystemMemoryStatus"
                    style="text-decoration:none" v-on:click="helper.btnradioboxclick($event)">&nbsp;<img
                      :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="PlatformInfo.Generic.SystemMemoryStatus">
                </div>
              </div>

              <div class="checkbox" style="margin-top: 20px">

                <template v-for="(item, index) in PlatformInfo.Generic" :key="index">
                  <label v-if="typeof (item) === 'boolean'" class="mintip" :title="title.PlatformInfo.Generic[index]">
                    <input type="checkbox" class="ace" v-model="PlatformInfo.Generic[index]" />
                    <span class="lbl"> {{ index }}</span>
                  </label>
                </template>


              </div>
            </div>
          </div>

          <div id="tabbable_PlatformInfo_DataHub" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">
              <div class="row">
                <div class="col-xs-3">
                  ARTFrequency<input type="text" class="form-control" v-model="PlatformInfo.DataHub.ARTFrequency">
                </div>
                <div class="col-xs-3">
                  BoardProduct<input type="text" class="form-control" v-model="PlatformInfo.DataHub.BoardProduct">
                </div>
                <div class="col-xs-3">
                  BoardRevision<input type="text" class="form-control" v-model="PlatformInfo.DataHub.BoardRevision">
                </div>
                <div class="col-xs-3">
                  DevicePathsSupported<input type="text" class="form-control"
                    v-model="PlatformInfo.DataHub.DevicePathsSupported">
                </div>

                <div class="col-xs-3">
                  FSBFrequency<input type="text" class="form-control" v-model="PlatformInfo.DataHub.FSBFrequency">
                </div>
                <div class="col-xs-3">
                  InitialTSC<input type="text" class="form-control" v-model="PlatformInfo.DataHub.InitialTSC">
                </div>
                <div class="col-xs-3">
                  PlatformName<input type="text" class="form-control" v-model="PlatformInfo.DataHub.PlatformName">
                </div>
                <div class="col-xs-3">
                  SmcBranch<input type="text" class="form-control" v-model="PlatformInfo.DataHub.SmcBranch">
                </div>

                <div class="col-xs-3">
                  SmcPlatform<input type="text" class="form-control" v-model="PlatformInfo.DataHub.SmcPlatform">
                </div>
                <div class="col-xs-3">
                  SmcRevision<input type="text" class="form-control" v-model="PlatformInfo.DataHub.SmcRevision">
                </div>
                <div class="col-xs-3">
                  StartupPowerEvents<input type="text" class="form-control"
                    v-model="PlatformInfo.DataHub.StartupPowerEvents">
                </div>
                <div class="col-xs-3">
                  SystemProductName<input type="text" class="form-control"
                    v-model="PlatformInfo.DataHub.SystemProductName">
                </div>

                <div class="col-xs-3">
                  SystemSerialNumber<input type="text" class="form-control"
                    v-model="PlatformInfo.DataHub.SystemSerialNumber">
                </div>
                <div class="col-xs-3">
                  SystemUUID<input type="text" class="form-control" v-model="PlatformInfo.DataHub.SystemUUID">
                </div>
              </div>
            </div>
          </div>


          <div id="tabbable_PlatformInfo_Memory" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_PlatformInfo_MemoryDevices"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_PlatformInfo_MemoryDevices'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="lang[item]"></a>&nbsp;
              </template>
            </span>

            <div class="well" style="margin-top: 25px">
              <div class="row">
                <div class="col-xs-3">
                  DataWidth<input type="text" class="form-control" v-model="PlatformInfo.Memory.DataWidth">
                </div>
                <div class="col-xs-3">
                  ErrorCorrection<input type="text" class="form-control" v-model="PlatformInfo.Memory.ErrorCorrection">
                </div>
                <div class="col-xs-3">
                  FormFactor<input type="text" class="form-control" v-model="PlatformInfo.Memory.FormFactor">
                </div>
                <div class="col-xs-3">
                  MaxCapacity<input type="text" class="form-control" v-model="PlatformInfo.Memory.MaxCapacity">
                </div>
                <div class="col-xs-3">
                  TotalWidth<input type="text" class="form-control" v-model="PlatformInfo.Memory.TotalWidth">
                </div>
                <div class="col-xs-3">
                  Type<input type="text" class="form-control" v-model="PlatformInfo.Memory.Type">
                </div>
                <div class="col-xs-3">
                  TypeDetail<a id="btncheckbox_PlatformInfo_Memory_TypeDetail" style="text-decoration:none"
                    v-on:click="helper.btncheckboxclick($event, 4)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="PlatformInfo.Memory.TypeDetail">
                </div>

              </div>
            </div>

          </div>




          <div id="tabbable_PlatformInfo_PlatformNVRAM" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">
              <div class="row">
                <div class="col-xs-3">
                  BID<input type="text" class="form-control" v-model="PlatformInfo.PlatformNVRAM.BID">
                </div>
                <div class="col-xs-3">
                  FirmwareFeatures<input type="text" class="form-control"
                    v-model="PlatformInfo.PlatformNVRAM.FirmwareFeatures">
                </div>
                <div class="col-xs-3">
                  FirmwareFeaturesMask<input type="text" class="form-control"
                    v-model="PlatformInfo.PlatformNVRAM.FirmwareFeaturesMask">
                </div>
                <div class="col-xs-3">
                  MLB<input type="text" class="form-control" v-model="PlatformInfo.PlatformNVRAM.MLB">
                </div>
                <div class="col-xs-3">
                  ROM<input type="text" class="form-control" v-model="PlatformInfo.PlatformNVRAM.ROM">
                </div>
                <div class="col-xs-3">
                  SystemSerialNumber<input type="text" class="form-control"
                    v-model="PlatformInfo.PlatformNVRAM.SystemSerialNumber">

                </div>
                <div class="col-xs-3">

                  SystemUUID<input type="text" class="form-control" v-model="PlatformInfo.PlatformNVRAM.SystemUUID">
                </div>
              </div>
            </div>
          </div>

          <div id="tabbable_PlatformInfo_SMBIOS" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">
              <div class="row">
                <div class="col-xs-3">
                  BIOSReleaseDate<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BIOSReleaseDate">
                </div>
                <div class="col-xs-3">
                  BIOSVendor<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BIOSVendor">
                </div>
                <div class="col-xs-3">
                  BIOSVersion<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BIOSVersion">
                </div>
                <div class="col-xs-3">
                  BoardAssetTag<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BoardAssetTag">
                </div>

                <div class="col-xs-3">
                  BoardLocationInChassis<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.BoardLocationInChassis">
                </div>
                <div class="col-xs-3">
                  BoardManufacturer<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.BoardManufacturer">
                </div>
                <div class="col-xs-3">
                  BoardProduct<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BoardProduct">
                </div>
                <div class="col-xs-3">
                  BoardSerialNumber<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.BoardSerialNumber">
                </div>

                <div class="col-xs-3">
                  BoardType<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BoardType">
                </div>
                <div class="col-xs-3">
                  BoardVersion<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.BoardVersion">
                </div>
                <div class="col-xs-3">
                  ChassisAssetTag<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.ChassisAssetTag">
                </div>
                <div class="col-xs-3">
                  ChassisManufacturer<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.ChassisManufacturer">
                </div>

                <div class="col-xs-3">
                  ChassisSerialNumber<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.ChassisSerialNumber">
                </div>
                <div class="col-xs-3">
                  ChassisType<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.ChassisType">
                </div>
                <div class="col-xs-3">
                  ChassisVersion<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.ChassisVersion">
                </div>
                <div class="col-xs-3">
                  FirmwareFeatures<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.FirmwareFeatures">
                </div>

                <div class="col-xs-3">
                  FirmwareFeaturesMask<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.FirmwareFeaturesMask">
                </div>

                <div class="col-xs-3">
                  PlatformFeature<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.PlatformFeature">
                </div>
                <div class="col-xs-3">
                  ProcessorType<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.ProcessorType">
                </div>

                <div class="col-xs-3">
                  SmcVersion<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.SmcVersion">
                </div>
                <div class="col-xs-3">
                  SystemFamily<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.SystemFamily">
                </div>
                <div class="col-xs-3">
                  SystemManufacturer<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.SystemManufacturer">
                </div>
                <div class="col-xs-3">
                  SystemProductName<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.SystemProductName">
                </div>

                <div class="col-xs-3">
                  SystemSKUNumber<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.SystemSKUNumber">
                </div>
                <div class="col-xs-3">
                  SystemSerialNumber<input type="text" class="form-control"
                    v-model="PlatformInfo.SMBIOS.SystemSerialNumber">
                </div>
                <div class="col-xs-3">
                  SystemUUID<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.SystemUUID">
                </div>
                <div class="col-xs-3">
                  SystemVersion<input type="text" class="form-control" v-model="PlatformInfo.SMBIOS.SystemVersion">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="divatbottom">
        <h3 class="header smaller lighter blue"> </h3>
        <div class="well">
          <div class="row">

            <div class="col-xs-3 mintip" :title="title.PlatformInfo.root.UpdateSMBIOSMode">
              UpdateSMBIOSMode<a id="btnradiobox_PlatformInfo_root_UpdateSMBIOSMode" style="text-decoration:none"
                v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                  class="ctrlicon"></a>&nbsp;
              <input type="text" class="form-control" v-model="PlatformInfo.root.UpdateSMBIOSMode">
            </div>
          </div>

          <div class="checkbox" style="margin-top: 20px">
            <template v-for="(item, index) in PlatformInfo.root" :key="index">
              <label v-if="typeof (item) === 'boolean'" class="mintip" :title="title.PlatformInfo.root[index]">
                <input type="checkbox" class="ace" v-model="PlatformInfo.root[index]" />
                <span class="lbl"> {{ index }}</span>
              </label>
            </template>



          </div>

        </div>
      </div>



    </div>

  </div>
</template>

