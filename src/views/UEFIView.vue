<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'

import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

import Helper from '../assets/helper'
import { plistEncode, enabledFormat, formatInteger, getPlistEncodeFunction } from '../assets/comm'

const baseStore = useBaseStore()
const table = userTableStore()


const helper = new Helper(table, baseStore)

const { UEFI } = storeToRefs(baseStore)

onMounted(() => {
  initGridTableUEFI()
})

table.setTableHeight()

const divHeight = computed(() => {
  return parseInt(table.tableHeight * 0.62) - 1
})

function initGridTableUEFI() {
  let colNames = ['Path', 'Arguments', 'Comment', 'LoadEarly', 'Enabled'];
  let colModel = [
    { name: 'Path', index: 'Path', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Arguments', index: 'Arguments', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Comment', index: 'Comment', width: 250, editable: true, sortable: false, formatter: plistEncode },
    { name: 'LoadEarly', index: 'LoadEarly', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_UEFI_Drivers = jQuery('#gridtable_UEFI_Drivers');

  table.addTable('UEFI_Drivers', objGT_UEFI_Drivers);
  const tbheight = table.tableHeight * 0.56
  helper.initGridTable(objGT_UEFI_Drivers, UEFI.Drivers, colNames, colModel, table.tableWidth, tbheight);

  const typeValues = {
    Reserved: 'Reserved',
    LoaderCode: 'LoaderCode',
    LoaderData: 'LoaderData',
    BootServiceCode: 'BootServiceCode',
    BootServiceData: 'BootServiceData',
    RuntimeCode: 'RuntimeCode',
    RuntimeData: 'RuntimeData',
    Available: 'Available',
    Persistent: 'Persistent',
    UnusableMemory: 'UnusableMemory',
    ACPIReclaimMemory: 'ACPIReclaimMemory',
    ACPIMemoryNVS: 'ACPIMemoryNVS',
    MemoryMappedIO: 'MemoryMappedIO',
    MemoryMappedIOPortSpace: 'MemoryMappedIOPortSpace',
    PalCode: 'PalCode'
  };

  colNames = ['Address', 'Comment', 'Size', 'Type', 'Enabled'];
  colModel = [
    { name: 'Address', index: 'Address', width: 150, editable: true, sortable: false, formatter: formatInteger },
    { name: 'Comment', index: 'Comment', width: 150, editable: true, sortable: false, formatter: plistEncode },
    { name: 'Size', index: 'Size', width: 100, editable: true, sortable: false, formatter: formatInteger },
    { name: 'Type', index: 'Type', width: 52, editable: true, sortable: false, edittype: 'select', editoptions: { value: typeValues }, formatter: getPlistEncodeFunction('Reserved') },
    { name: 'Enabled', index: 'Enabled', width: 70, editable: true, edittype: "checkbox", editoptions: { value: "YES:NO" }, sortable: false, fixed: true, align: 'center', formatter: enabledFormat }
  ];
  let objGT_UEFI_ReservedMemory = jQuery('#gridtable_UEFI_ReservedMemory');
  table.addTable('UEFI_ReservedMemory', objGT_UEFI_ReservedMemory);
  helper.initGridTable(objGT_UEFI_ReservedMemory, UEFI.ReservedMemory, colNames, colModel, table.tableWidth, tbheight);

}

</script>


<template>
  <div class="row">
    <div class="col-xs-12">

      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#tabbable_UEFI_Drivers" class="tablelia">Drivers</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_ReservedMemory" class="tablelia">ReservedMemory</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_APFS" class="tablelia">APFS</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_AppleInput" class="tablelia">AppleInput</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_Audio" class="tablelia">Audio</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_Input" class="tablelia">Input</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_Output" class="tablelia">Output</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_ProtocolOverrides" class="tablelia">ProtocolOverrides</a></li>
          <li><a data-toggle="tab" href="#tabbable_UEFI_Quirks" class="tablelia">Quirks</a></li>
        </ul>

        <div class="tab-content" style="padding-right:18px;padding-left:2px;">

          <div id="tabbable_UEFI_Drivers" class="tab-pane fade in active" style="padding-bottom: 5px;">
            <table id="gridtable_UEFI_Drivers"></table>
            <span class="grey pull-left">
              <label for="File_UEFI_Drivers"><img :src="helper.getImgURL('fileadd')"
                  style="padding: 0px; height: 16px; cursor:pointer;">
                <input type="file" id="File_UEFI_Drivers" style="position:absolute;clip:rect(0 0 0 0);" accept=".efi"
                  @change="helper.addFile('File_UEFI_Drivers')" multiple>
              </label>
            </span>

            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_UEFI_Drivers'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>


          <div id="tabbable_UEFI_ReservedMemory" class="tab-pane fade in" style="padding-bottom: 5px;">
            <table id="gridtable_UEFI_ReservedMemory"></table>
            <span class="grey pull-right">
              <template v-for="(item, index) in baseStore.OCbuttons5" :key="index">
                <a @click="helper.pubImgButtonClick" :id="'btn' + item + '_UEFI_ReservedMemory'"><img
                    :src='helper.getImgURL(item)' class="ctrlicon" :title="$t('lang.' + item)"></a>&nbsp;
              </template>
            </span>
          </div>



          <div id="tabbable_UEFI_APFS" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">

              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.APFS.MinDate')">
                  MinDate<input type="text" class="form-control" v-model="UEFI.APFS.MinDate">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.APFS.MinVersion')">
                  MinVersion<input type="text" class="form-control" v-model="UEFI.APFS.MinVersion">
                </div>

              </div>


              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.UEFI.APFS.EnableJumpstart')">
                  <input type="checkbox" class="ace" v-model="UEFI.APFS.EnableJumpstart" />
                  <span class="lbl"> EnableJumpstart</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.APFS.GlobalConnect')">
                  <input type="checkbox" class="ace" v-model="UEFI.APFS.GlobalConnect" />
                  <span class="lbl"> GlobalConnect</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.APFS.HideVerbose')">
                  <input type="checkbox" class="ace" v-model="UEFI.APFS.HideVerbose" />
                  <span class="lbl"> HideVerbose</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.APFS.JumpstartHotPlug')">
                  <input type="checkbox" class="ace" v-model="UEFI.APFS.JumpstartHotPlug" />
                  <span class="lbl"> JumpstartHotPlug</span>
                </label>

              </div>


            </div>
          </div>

          <div id="tabbable_UEFI_AppleInput" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">

              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.AppleEvent')">
                  AppleEvent<a id="btnradiobox_UEFI_AppleInput_AppleEvent" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="UEFI.AppleInput.AppleEvent">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.CustomDelays')">
                  CustomDelays<a id="btnradiobox_UEFI_AppleInput_CustomDelays" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;
                    <img :src="helper.getImgURL('edit')" class="ctrlicon"></a>&nbsp;<input type="text"
                    class="form-control" v-model="UEFI.AppleInput.CustomDelays">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.KeyInitialDelay')">
                  KeyInitialDelay<input type="text" class="form-control" v-model="UEFI.AppleInput.KeyInitialDelay">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.KeySubsequentDelay')">
                  KeySubsequentDelay<input type="text" class="form-control"
                    v-model="UEFI.AppleInput.KeySubsequentDelay">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.PointerPollMask')">
                  PointerPollMask<input type="text" class="form-control" v-model="UEFI.AppleInput.PointerPollMask">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.PointerPollMax')">
                  PointerPollMax<input type="text" class="form-control" v-model="UEFI.AppleInput.PointerPollMax">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.PointerPollMin')">
                  PointerPollMin<input type="text" class="form-control" v-model="UEFI.AppleInput.PointerPollMin">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.PointerSpeedDiv')">
                  PointerSpeedDiv<input type="text" class="form-control" v-model="UEFI.AppleInput.PointerSpeedDiv">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.AppleInput.PointerSpeedMul')">
                  PointerSpeedMul<input type="text" class="form-control" v-model="UEFI.AppleInput.PointerSpeedMul">
                </div>

              </div>

              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.UEFI.AppleInput.GraphicsInputMirroring')">
                  <input type="checkbox" class="ace" v-model="UEFI.AppleInput.GraphicsInputMirroring" />
                  <span class="lbl"> GraphicsInputMirroring</span>
                </label>


              </div>

            </div>
          </div>


          <div id="tabbable_UEFI_Audio" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">

              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.AudioDevice')">
                  AudioDevice<input type="text" class="form-control" v-model="UEFI.Audio.AudioDevice">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.AudioCodec')">
                  AudioCodec<input type="text" class="form-control" v-model="UEFI.Audio.AudioCodec">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.AudioOutMask')">
                  AudioOutMask<input type="text" class="form-control" v-model="UEFI.Audio.AudioOutMask">
                </div>



                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.PlayChime')">
                  PlayChime<a id="btnradiobox_UEFI_Audio_PlayChime" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="UEFI.Audio.PlayChime">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.SetupDelay')">
                  SetupDelay<input type="text" class="form-control" v-model="UEFI.Audio.SetupDelay">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.MaximumGain')">
                  MaximumGain<input type="text" class="form-control" v-model="UEFI.Audio.MaximumGain">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.MinimumAssistGain')">
                  MinimumAssistGain<input type="text" class="form-control" v-model="UEFI.Audio.MinimumAssistGain">
                </div>
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Audio.MinimumAudibleGain')">
                  MinimumAudibleGain<input type="text" class="form-control" v-model="UEFI.Audio.MinimumAudibleGain">
                </div>

              </div>


              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.UEFI.Audio.DisconnectHda')">
                  <input type="checkbox" class="ace" v-model="UEFI.Audio.DisconnectHda" />
                  <span class="lbl"> DisconnectHda</span>
                </label>

                <label class="mintip" :title="$t('title.UEFI.Audio.AudioSupport')">
                  <input type="checkbox" class="ace" v-model="UEFI.Audio.AudioSupport" />
                  <span class="lbl"> AudioSupport</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Audio.ResetTrafficClass')">
                  <input type="checkbox" class="ace" v-model="UEFI.Audio.ResetTrafficClass" />
                  <span class="lbl"> ResetTrafficClass</span>
                </label>

              </div>


            </div>
          </div>

          <div id="tabbable_UEFI_Input" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">
              <div class="row">
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Input.KeyForgetThreshold')">
                  KeyForgetThreshold<input type="text" class="form-control" v-model="UEFI.Input.KeyForgetThreshold">
                </div>


                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Input.KeySupportMode')">
                  KeySupportMode<a id="btnradiobox_UEFI_Input_KeySupportMode" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="UEFI.Input.KeySupportMode">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Input.PointerSupportMode')">
                  PointerSupportMode<input type="text" class="form-control" v-model="UEFI.Input.PointerSupportMode">
                </div>
              </div>
              <div class="row" style="margin-top: 10px">
                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Input.TimerResolution')">
                  TimerResolution<input type="text" class="form-control" v-model="UEFI.Input.TimerResolution">
                </div>
              </div>

              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.UEFI.Input.KeyFiltering')">
                  <input type="checkbox" class="ace" v-model="UEFI.Input.KeyFiltering" />
                  <span class="lbl"> KeyFiltering</span>
                </label>

                <label class="mintip" :title="$t('title.UEFI.Input.KeySupport')">
                  <input type="checkbox" class="ace" v-model="UEFI.Input.KeySupport" />
                  <span class="lbl"> KeySupport</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Input.KeySwap')">
                  <input type="checkbox" class="ace" v-model="UEFI.Input.KeySwap" />
                  <span class="lbl"> KeySwap</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Input.PointerSupport')">
                  <input type="checkbox" class="ace" v-model="UEFI.Input.PointerSupport" />
                  <span class="lbl"> PointerSupport</span>
                </label>
              </div>


            </div>
          </div>


          <div id="tabbable_UEFI_Output" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">

              <div class="row">



                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Output.TextRenderer')">
                  TextRenderer<a id="btnradiobox_UEFI_Output_TextRenderer" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="UEFI.Output.TextRenderer">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Output.ConsoleMode')">
                  ConsoleMode<a id="btnradiobox_UEFI_Output_ConsoleMode" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;<input type="text" class="form-control"
                    v-model="UEFI.Output.ConsoleMode">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Output.Resolution')">
                  Resolution<a id="btnradiobox_UEFI_Output_Resolution" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="UEFI.Output.Resolution">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Output.GopPassThrough')">
                  GopPassThrough<a id="btnradiobox_UEFI_Output_GopPassThrough" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="UEFI.Output.GopPassThrough">
                </div>

                <div class="col-xs-3 mintip" :title="$t('title.UEFI.Output.UIScale')">
                  UIScale<a id="btnradiobox_UEFI_Output_UIScale" style="text-decoration:none"
                    v-on:click="helper.btnradioboxclick($event)">&nbsp;<img :src="helper.getImgURL('edit')"
                      class="ctrlicon"></a>&nbsp;
                  <input type="text" class="form-control" v-model="UEFI.Output.UIScale">
                </div>

              </div>


              <div class="checkbox" style="margin-top: 20px">
                <label class="mintip" :title="$t('title.UEFI.Output.ClearScreenOnModeSwitch')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.ClearScreenOnModeSwitch" />
                  <span class="lbl"> ClearScreenOnModeSwitch</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.IgnoreTextInGraphics')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.IgnoreTextInGraphics" />
                  <span class="lbl"> IgnoreTextInGraphics</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.ProvideConsoleGop')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.ProvideConsoleGop" />
                  <span class="lbl"> ProvideConsoleGop</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.ReconnectGraphicsOnConnect')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.ReconnectGraphicsOnConnect" />
                  <span class="lbl"> ReconnectGraphicsOnConnect</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.DirectGopRendering')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.DirectGopRendering" />
                  <span class="lbl"> DirectGopRendering</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.ForceResolution')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.ForceResolution" />
                  <span class="lbl"> ForceResolution</span>
                </label>

                <label class="mintip" :title="$t('title.UEFI.Output.ReconnectOnResChange')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.ReconnectOnResChange" />
                  <span class="lbl"> ReconnectOnResChange</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.ReplaceTabWithSpace')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.ReplaceTabWithSpace" />
                  <span class="lbl"> ReplaceTabWithSpace</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.SanitiseClearScreen')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.SanitiseClearScreen" />
                  <span class="lbl"> SanitiseClearScreen</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.Output.UgaPassThrough')">
                  <input type="checkbox" class="ace" v-model="UEFI.Output.UgaPassThrough" />
                  <span class="lbl"> UgaPassThrough</span>
                </label>

              </div>


            </div>
          </div>


          <div id="tabbable_UEFI_ProtocolOverrides" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">
              <div class="checkbox">
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleAudio')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleAudio" />
                  <span class="lbl"> AppleAudio</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleBootPolicy')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleBootPolicy" />
                  <span class="lbl"> AppleBootPolicy</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleDebugLog')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleDebugLog" />
                  <span class="lbl"> AppleDebugLog</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleEg2Info')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleEg2Info" />
                  <span class="lbl"> AppleEg2Info</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleFramebufferInfo')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleFramebufferInfo" />
                  <span class="lbl"> AppleFramebufferInfo</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleImageConversion')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleImageConversion" />
                  <span class="lbl"> AppleImageConversion</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleImg4Verification')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleImg4Verification" />
                  <span class="lbl"> AppleImg4Verification</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleKeyMap')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleKeyMap" />
                  <span class="lbl"> AppleKeyMap</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleRtcRam')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleRtcRam" />
                  <span class="lbl"> AppleRtcRam</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleSecureBoot')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleSecureBoot" />
                  <span class="lbl"> AppleSecureBoot</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleSmcIo')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleSmcIo" />
                  <span class="lbl"> AppleSmcIo</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.AppleUserInterfaceTheme')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.AppleUserInterfaceTheme" />
                  <span class="lbl"> AppleUserInterfaceTheme</span>
                </label>

                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.DataHub')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.DataHub" />
                  <span class="lbl"> DataHub</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.DeviceProperties')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.DeviceProperties" />
                  <span class="lbl"> DeviceProperties</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.FirmwareVolume')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.FirmwareVolume" />
                  <span class="lbl"> FirmwareVolume</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.HashServices')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.HashServices" />
                  <span class="lbl"> HashServices</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.OSInfo')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.OSInfo" />
                  <span class="lbl"> OSInfo</span>
                </label>
                <label class="mintip" :title="$t('title.UEFI.ProtocolOverrides.UnicodeCollation')">
                  <input type="checkbox" class="ace" v-model="UEFI.ProtocolOverrides.UnicodeCollation" />
                  <span class="lbl"> UnicodeCollation</span>
                </label>

              </div>
            </div>
          </div>
          <div id="tabbable_UEFI_Quirks" class="tab-pane fade in" style="padding-bottom: 5px;"
            :style="{'height': divHeight +'px'}">
            <div class="well">
              <div class="row">
                <template v-for="(item, index) in UEFI.Quirks" :key="index">
                  <div v-if="typeof (item) === 'number'" class="col-xs-3 mintip"
                    :title="$t('title.UEFI.Quirks.' + index)">
                    {{ index }}<input type="text" class="form-control" v-model="UEFI.Quirks[index]">
                  </div>
                </template>
              </div>

              <div class="checkbox" style="margin-top: 20px">
                <template v-for="(item, index) in UEFI.Quirks" :key="index">
                  <label v-if="typeof (item) === 'boolean'" class="mintip" :title="$t('title.UEFI.Quirks.' + index)">
                    <input type="checkbox" class="ace" v-model="UEFI.Quirks[index]" />
                    <span class="lbl"> {{ index }}</span>
                  </label>
                </template>
              </div>

            </div>
          </div>

        </div>
      </div>


      <h3 class="header smaller lighter blue"></h3>
      <div class="well">
        <div class="checkbox">
          <label class="mintip" :title="$t('title.UEFI.ConnectDrivers')">
            <input type="checkbox" class="ace" v-model="UEFI.root.ConnectDrivers" />
            <span class="lbl"> ConnectDrivers</span>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

