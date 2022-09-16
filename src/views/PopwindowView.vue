<script setup>
import { useBaseStore } from '../stores/index'
import { userTableStore } from '../stores/table'

import Helper from '../assets/helper'

const table = userTableStore()
const baseStore = useBaseStore()

const helper = new Helper(table, baseStore)


</script>


<template>
    <div class="modal fade" id="inputModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- 模态框主体 -->
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="message-text" class="control-label">{{$t('lang.pasteMessage')}}</label>
                            <textarea class="form-control" id="textarea_plist_paste" rows="15" cols="40"
                                v-model="baseStore.textarea_content"></textarea>
                        </div>
                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary btn-sm"
                        data-dismiss="modal">{{$t('lang.close')}}</button>
                    <button type="button" class="btn btn-primary btn-sm"
                        @click='helper.pasteDataToTable'>{{$t('lang.starPaste')}}</button>
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
                                class="control-label"><b>{{$t('lang.pleasecheckmessage')}}</b></label><br><br>

                            <div v-if="table.RADIO_CHECK_BOX === 'C'">
                                <div v-for="(it,index) in table.pagePublic_List" :key="index">
                                    <label>&nbsp;&nbsp;<input type="checkbox" class="ace"
                                            v-model="table.pagePublic_Selected" :value="it.val" /><span class="lbl">
                                            {{it.des}}</span></label><br>
                                </div>
                            </div>

                            <div v-else-if="table.RADIO_CHECK_BOX === 'R'">
                                <div v-for="(it,index) in table.pageRadio_List" :key="index">
                                    <label>&nbsp;&nbsp;<input type="radio" class="ace"
                                            v-model="table.pageRadio_CurrentValue" :value="it.val" /><span class="lbl">
                                            {{it.des}}</span></label><br>
                                </div>
                            </div>

                        </div>


                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary btn-sm"
                        data-dismiss="modal">{{$t('lang.close')}}</button>
                    <button type="button" class="btn btn-primary btn-sm"
                        v-on:click="helper.checkboxPageBtnOKclick">{{$t('lang.starPaste')}}</button>
                </div>

            </div>
        </div>
    </div>
</template>