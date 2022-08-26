<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'
import { useLangStore } from '../stores/lang'
import { usepopdataStore } from '../stores/popdata'
import Helper from '../assets/helper'


const lang = useLangStore().lang
const table = userTableStore()
const baseStore = useBaseStore()
const popdata = usepopdataStore()

const helper = new Helper(table, lang, baseStore, popdata)


</script>


<template>
    <div class="modal fade" id="inputModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- 模态框主体 -->
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="message-text" class="control-label">{{lang.pasteMessage}}</label>
                            <textarea class="form-control" id="textarea_plist_paste" rows="15" cols="40"
                                v-model="baseStore.textarea_content"></textarea>
                        </div>
                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">{{lang.close}}</button>
                    <button type="button" class="btn btn-primary btn-sm"
                        @click='helper.pasteDataToTable'>{{lang.starPaste}}</button>
                </div>

            </div>
        </div>
    </div>


    <div class="modal fade" id="divMuCheckboxPageModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- 模态框主体 -->
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="message-text"
                                class="control-label"><b>{{lang.pleasecheckmessage}}</b></label><br><br>

                            <div v-if="popdata.RADIO_CHECK_BOX === 'C'">
                                <div v-for="(it,index) in popdata.pagePublic_List" :key="index">
                                    <label>&nbsp;&nbsp;<input type="checkbox" class="ace"
                                            v-model="popdata.pagePublic_Selected" :value="it.val" /><span class="lbl">
                                            {{it.des}}</span></label><br>
                                </div>
                            </div>

                            <div v-else-if="popdata.RADIO_CHECK_BOX === 'R'">
                                <div v-for="(it,index) in popdata.pageRadio_List" :key="index">
                                    <label>&nbsp;&nbsp;<input type="radio" class="ace"
                                            v-model="popdata.pageRadio_CurrentValue" :value="it.val" /><span
                                            class="lbl">
                                            {{it.des}}</span></label><br>
                                </div>
                            </div>

                        </div>


                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">{{lang.close}}</button>
                    <button type="button" class="btn btn-primary btn-sm"
                        v-on:click="helper.checkboxPageBtnOKclick">{{lang.starPaste}}</button>
                </div>

            </div>
        </div>
    </div>
</template>