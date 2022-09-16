<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import { plistEncode, enabledFormat, getPlistEncodeFunction } from '../assets/comm'


const baseStore = useBaseStore()
const table = userTableStore()


const helper = new Helper(table, baseStore)

const { Misc } = storeToRefs(baseStore)



onMounted(() => {
  initGridTableMisc()
})

function initGridTableMisc() {
  let colNames = ['Arguments', 'Comment', 'Name', 'Flavour', 'Path', 'TextMode', 'Auxiliary', 'Enabled'];
  let colModel = [
    { name: 'Arguments', index: 'Arguments', width: 100, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Comment', index: 'Comment', width: 130, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Name', index: 'Name', width: 100, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Flavour', index: 'Flavour', width: 80, editable: true, sortable: false, formatter: getPlistEncodeFunction('Auto') },
    { name: 'Path', index: 'Path', width: 410, editable: true, sortable: false, formatter: plistEncode },
    { name: 'TextMode', index: 'TextMode', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'Auxiliary', index: 'Auxiliary', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Misc_Entries = jQuery('#gridtable_Misc_Entries');
  table.addTable('Misc_Entries', objGT_Misc_Entries);
  const tableHeight = table.tableHeight * 0.67
  helper.initGridTable(objGT_Misc_Entries, Misc.Entries, colNames, colModel, table.tableWidth, tableHeight);

  //BlessOverride
  colNames = ['ScanningPaths'];
  colModel = [
    { name: 'ScanningPaths', index: 'ScanningPaths', width: 150, editable: true, sortable: false, formatter: plistEncode }
  ];
  let objGT_Misc_BlessOverride = jQuery('#gridtable_Misc_BlessOverride');
  table.addTable('Misc_BlessOverride', objGT_Misc_BlessOverride);

  helper.initGridTable(objGT_Misc_BlessOverride, Misc.BlessOverride, colNames, colModel, table.tableWidth, tableHeight);



  //Tools
  colNames = ['Arguments', 'Comment', 'Name', 'Flavour', 'Path', 'FullNvramAccess', 'Auxiliary', 'RealPath', 'TextMode', 'Enabled'];
  colModel = [
    { name: 'Arguments', index: 'Arguments', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Comment', index: 'Comment', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Name', index: 'Name', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Flavour', index: 'Flavour', width: 150, editable: true, sortable: false, formatter: getPlistEncodeFunction('Auto') },
    { name: 'Path', index: 'Path', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'FullNvramAccess', index: 'FullNvramAccess', width: 110, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'Auxiliary', index: 'Auxiliary', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'RealPath', index: 'RealPath', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'TextMode', index: 'TextMode', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_Misc_Tools = jQuery('#gridtable_Misc_Tools');
  table.addTable('Misc_Tools', objGT_Misc_Tools);
  helper.initGridTable(objGT_Misc_Tools, Misc.Tools, colNames, colModel, table.tableWidth, tableHeight);

}
</script>


<template>
  <div class="row">

    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#tabbable_Misc_BlessOverride" class="tablelia">BlessOverride</a>
          </li>
          <li><a data-toggle="tab" href="#tabbable_Misc_Entries" class="tablelia">Entries</a></li>
          <li><a data-toggle="tab" href="#tabbable_Misc_Tools" class="tablelia">Tools</a></li>
          <li><a data-toggle="tab" href="#tabbable_Misc_Boot" class="tablelia">Boot</a></li>
          <li><a data-toggle="tab" href="#tabbable_Misc_Debug" class="tablelia">Debug</a></li>
          <li><a data-toggle="tab" href="#tabbable_Misc_Security" class="tablelia">Security</a></li>
          <li><a data-toggle="tab" href="#tabbable_Misc_Serial" class="tablelia">Serial</a></li>
        </ul>

        <div class="tab-content" style="padding-right:18px;padding-left:2px;">

          <div id="tabbable_Misc_BlessOverride" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <table id="gridtable_Misc_BlessOverride"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons4" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Misc_BlessOverride'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>

          <div id="tabbable_Misc_Entries" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_Misc_Entries"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Misc_Entries'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>
          <div id="tabbable_Misc_Tools" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_Misc_Tools"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_Misc_Tools'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>
          <div id="tabbable_Misc_Boot" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">

              <div class="row">

                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.HibernateMode')">
                  HibernateMode<a id="btnradiobox_Misc_Boot_HibernateMode" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Boot.HibernateMode" />
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.PickerMode')">
                  PickerMode<a id="btnradiobox_Misc_Boot_PickerMode" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Boot.PickerMode" />
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.PickerVariant')">
                  PickerVariant<a id="btnradiobox_Misc_Boot_PickerVariant" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Boot.PickerVariant" />
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.TakeoffDelay')">
                  TakeoffDelay<input type="text" class="form-control" v-model="Misc.Boot.TakeoffDelay" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.Timeout')">
                  Timeout<input type="text" class="form-control" v-model="Misc.Boot.Timeout" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.ConsoleAttributes')">
                  ConsoleAttributes<input type="text" class="form-control" v-model="Misc.Boot.ConsoleAttributes" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.PickerAttributes')">
                  PickerAttributes<a id="btncheckbox_Misc_Boot_PickerAttributes" style="text-decoration:none"
                    v-on:click="helper.btncheckboxclick($event, 4)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Boot.PickerAttributes" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.LauncherOption')">
                  LauncherOption<a id="btnradiobox_Misc_Boot_LauncherOption" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Boot.LauncherOption" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Boot.LauncherPath')">
                  LauncherPath<input type="text" class="form-control" v-model="Misc.Boot.LauncherPath" />
                </div>

              </div>

              <div class="checkbox" style="margin-top: 20px ">
                <label class="mintip" :title="$t('title.Misc.Boot.HideAuxiliary')">
                  <input type="checkbox" class="ace" v-model="Misc.Boot.HideAuxiliary" />
                  <span class="lbl"> HideAuxiliary</span>
                </label>

                <label class="mintip" :title="$t('title.Misc.Boot.PickerAudioAssist')">
                  <input type="checkbox" class="ace" v-model="Misc.Boot.PickerAudioAssist" />
                  <span class="lbl"> PickerAudioAssist</span>
                </label>
                <label class="mintip" style="margin-left: 5px;" :title="$t('title.Misc.Boot.PollAppleHotKeys')">
                  <input type="checkbox" class="ace" v-model="Misc.Boot.PollAppleHotKeys" />
                  <span class="lbl"> PollAppleHotKeys</span>
                </label>
                <label class="mintip" style="margin-left: 5px;" :title="$t('title.Misc.Boot.ShowPicker')">
                  <input type="checkbox" class="ace" v-model="Misc.Boot.ShowPicker" />
                  <span class="lbl"> ShowPicker</span>
                </label>
                <label v-show="baseStore.configisMOD === true" class="mintip"
                  :title="$t('title.Misc.Boot.SkipCustomEntryCheck')">
                  <input type="checkbox" class="ace" v-model="Misc.Boot.SkipCustomEntryCheck" />
                  <span class="lbl"> SkipCustomEntryCheck</span>
                </label>
              </div>
            </div>
          </div>

          <div id="tabbable_Misc_Debug" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">

              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Debug.DisplayDelay')">
                  DisplayDelay<input type="text" class="form-control" v-model="Misc.Debug.DisplayDelay" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Debug.DisplayLevel')">
                  DisplayLevel<a id="btncheckbox_Misc_Debug_DisplayLevel" style="text-decoration:none"
                    v-on:click="helper.btncheckboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Debug.DisplayLevel" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Debug.LogModules')">
                  LogModules<input type="text" class="form-control" v-model="Misc.Debug.LogModules" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Debug.Target')">
                  Target<a id="btncheckbox_Misc_Debug_Target" style="text-decoration:none"
                    v-on:click="helper.btncheckboxclick($event, 2)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Debug.Target" />
                </div>
              </div>

              <div class="checkbox" style="margin-top: 20px ">
                <label class="mintip" :title="$t('title.Misc.Debug.AppleDebug')">
                  <input type="checkbox" class="ace" v-model="Misc.Debug.AppleDebug" />
                  <span class="lbl"> AppleDebug</span>
                </label>

                <label class="mintip" :title="$t('title.Misc.Debug.ApplePanic')">
                  <input type="checkbox" class="ace" v-model="Misc.Debug.ApplePanic" />
                  <span class="lbl"> ApplePanic</span>
                </label>


                <label class="mintip" :title="$t('title.Misc.Debug.DisableWatchDog')">
                  <input type="checkbox" class="ace" v-model="Misc.Debug.DisableWatchDog" />
                  <span class="lbl"> DisableWatchDog</span>
                </label>



                <label class="mintip" :title="$t('title.Misc.Debug.SysReport')">
                  <input type="checkbox" class="ace" v-model="Misc.Debug.SysReport" />
                  <span class="lbl"> SysReport</span>
                </label>

              </div>
            </div>
          </div>
          <div id="tabbable_Misc_Security" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">

              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.ExposeSensitiveData')">
                  ExposeSensitiveData<a id="btncheckbox_Misc_Security_ExposeSensitiveData" style="text-decoration:none"
                    v-on:click="helper.btncheckboxclick($event, 2)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="Misc.Security.ExposeSensitiveData" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.ApECID')">
                  ApECID<input type="text" class="form-control" v-model="Misc.Security.ApECID" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.HaltLevel')">
                  HaltLevel<input type="text" class="form-control" v-model="Misc.Security.HaltLevel" />
                </div>


                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.Vault')">
                  Vault<a id="btnradiobox_Misc_Security_Vault" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="Misc.Security.Vault">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.ScanPolicy')">
                  ScanPolicy<a id="btncheckbox_Misc_Security_ScanPolicy" style="text-decoration:none"
                    v-on:click="helper.btncheckboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="Misc.Security.ScanPolicy" />
                </div>


                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.DmgLoading')">
                  DmgLoading<a id="btnradiobox_Misc_Security_DmgLoading" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="Misc.Security.DmgLoading">
                </div>


                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.SecureBootModel')">
                  SecureBootModel<a id="btnradiobox_Misc_Security_SecureBootModel" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="Misc.Security.SecureBootModel">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.PasswordHash')">
                  PasswordHash<input type="text" class="form-control" v-model="Misc.Security.PasswordHash" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Security.PasswordSalt')">
                  PasswordSalt<input type="text" class="form-control" v-model="Misc.Security.PasswordSalt" />
                </div>

              </div>

              <div class="checkbox" style="margin-top: 20px">

                <label class="mintip" :title="$t('title.Misc.Security.AllowSetDefault')">
                  <input type="checkbox" class="ace" v-model="Misc.Security.AllowSetDefault" />
                  <span class="lbl"> AllowSetDefault</span>
                </label>

                <label class="mintip" :title="$t('title.Misc.Security.AuthRestart')">
                  <input type="checkbox" class="ace" v-model="Misc.Security.AuthRestart" />
                  <span class="lbl"> AuthRestart</span>
                </label>
                <label class="mintip" :title="$t('title.Misc.Security.BlacklistAppleUpdate')">
                  <input type="checkbox" class="ace" v-model="Misc.Security.BlacklistAppleUpdate" />
                  <span class="lbl"> BlacklistAppleUpdate</span>
                </label>
                <label class="mintip" :title="$t('title.Misc.Security.EnablePassword')">
                  <input type="checkbox" class="ace" v-model="Misc.Security.EnablePassword" />
                  <span class="lbl"> EnablePassword</span>
                </label>


              </div>
            </div>
          </div>

          <div id="tabbable_Misc_Serial" class="tab-pane fade in" style="padding-bottom: 5px;">
            <div class="well">

              <div class="checkbox" style="margin-top: 20px ">
                <label class="mintip" :title="$t('title.Misc.Serial.Init')">
                  <input type="checkbox" class="ace" v-model="Misc.Serial.Init" />
                  <span class="lbl"> Init</span>
                </label>

                <label class="mintip" :title="$t('title.Misc.Serial.Override')">
                  <input type="checkbox" class="ace" v-model="Misc.Serial.Override" />
                  <span class="lbl"> Override</span>
                </label>
              </div>

              <div class="row" v-show="Misc.Serial.Override === true">
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.BaudRate')">
                  BaudRate<input type="text" class="form-control" v-model="Misc.Serial.Custom.BaudRate" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.ClockRate')">
                  ClockRate<input type="text" class="form-control" v-model="Misc.Serial.Custom.ClockRate" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.ExtendedTxFifoSize')">
                  ExtendedTxFifoSize<input type="text" class="form-control"
                    v-model="Misc.Serial.Custom.ExtendedTxFifoSize" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.FifoControl')">
                  FifoControl<input type="text" class="form-control" v-model="Misc.Serial.Custom.FifoControl" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.LineControl')">
                  LineControl<input type="text" class="form-control" v-model="Misc.Serial.Custom.LineControl" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.PciDeviceInfo')">
                  PciDeviceInfo<input type="text" class="form-control" v-model="Misc.Serial.Custom.PciDeviceInfo" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.RegisterAccessWidth')">
                  RegisterAccessWidth<input type="text" class="form-control"
                    v-model="Misc.Serial.Custom.RegisterAccessWidth" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.RegisterBase')">
                  RegisterBase<input type="text" class="form-control" v-model="Misc.Serial.Custom.RegisterBase" />
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.Misc.Serial.Custom.RegisterStride')">
                  RegisterStride<input type="text" class="form-control" v-model="Misc.Serial.Custom.RegisterStride" />
                </div>

              </div>

              <div class="checkbox" style="margin-top: 20px " v-show="Misc.Serial.Override === true">
                <label class="mintip" :title="$t('title.Misc.Serial.Custom.UseHardwareFlowControl')">
                  <input type="checkbox" class="ace" v-model="Misc.Serial.Custom.UseHardwareFlowControl" />
                  <span class="lbl"> UseHardwareFlowControl</span>
                </label>
                <label class="mintip" :title="$t('title.Misc.Serial.Custom.UseMmio')">
                  <input type="checkbox" class="ace" v-model="Misc.Serial.Custom.UseMmio" />
                  <span class="lbl"> UseMmio</span>
                </label>
              </div>

            </div>
          </div>


        </div>
      </div>

    </div>

  </div>
</template >

