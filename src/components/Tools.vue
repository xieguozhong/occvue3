<script setup>
import { useBaseStore } from '../stores/index'

import { userTableStore } from '../stores/table'
import Helper from '../assets/helper'
import Generateplist from '../assets/generateplist'
import PlistParser from '../assets/plistparser'
import { getTypeof, b64Decode, copyDatatoClipboard, showTipModal } from '../assets/comm'

import { onMounted, watch } from 'vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const base = useBaseStore()

const table = userTableStore()

const helper = new Helper(table, base)


//查看有没有表格在被编辑中
function checkOneditTable() {

    if (table.onEditTableList.size === 0) {
        return '';
    }

    const newset = new Set();
    for (let it of table.onEditTableList) {
        let arrit = it.split('_');
        newset.add(arrit[1] + " | " + arrit[2]);

    }

    let newmsg = '-'.repeat(30) + '<br>' + Array.from(newset).join('<br>') + '<br>' + '-'.repeat(30);
    return t('lang.editingtablemessage', [newmsg]);
}

//保存按钮
function savePlist() {
    let cotstring = checkOneditTable();
    if (cotstring !== "") {
        toastr.error(cotstring);
        return;
    }
    const genplist = new Generateplist(table, base)
    let xmlcontext = genplist.getAllPlist();
    let blob = new Blob([xmlcontext], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "config.plist");
    showTipModal(t('lang.downplistSuccess'), 'success');
}

//复制按钮
function copyPlist() {
    let cotstring = checkOneditTable();
    if (cotstring !== "") {
        toastr.error(cotstring);
        return;
    }
    const genplist = new Generateplist(table, base)
    let xmlcontext = genplist.getAllPlist();
    copyDatatoClipboard(xmlcontext);
    showTipModal(t('lang.copyplistSuccess'), 'success');
}

/**
 * 把Plist的文本内容转换成json对象返回
 * @param {string} context 
 * @returns JSON Object
 */
function formatContext(context = '') {
    context = context.replace(/[\t\r]/g, '');
    const arrayContext = context.split('\n');
    let result = '';

    for (let i = 0, len = arrayContext.length; i < len; i++) {
        result += arrayContext[i].trim();
    }

    const pp = new PlistParser()
    result = pp.parse(result)
    result = pp.serialize(result)

    const fillstring = (ke, va) => {
        if (getTypeof(va) === 'array' && va[1] === 'string') {
            va[0] = b64Decode(va[0]);
        }
        return va;
    };

    result = JSON.parse(result, fillstring);
    restoreJSONKey(result);

    return result;

}

/**
 * 遍历JSON Object 对象,把编过码的键值全部改回来
 * @param {Object} obj 
 */
function restoreJSONKey(obj) {
    Object.entries(obj).forEach(([key, value]) => {

        const tf = getTypeof(value);

        obj[b64Decode(key)] = value;
        obj[key] = null;
        Reflect.deleteProperty(obj, key)

        if (tf === 'array') {
            const lenarr = value.length;
            for (let it = 0; it < lenarr; it++) {

                if (getTypeof(value[it]) === 'object') {
                    restoreJSONKey(value[it]);
                }

            }
        } else if (tf === 'object') {
            restoreJSONKey(value);

        }

    });
}


onMounted(() => {
    $('#id-input-file-2')
        .ace_file_input({
            no_file: t('lang.no_file'),
            btn_choose: t('lang.choose'),
            btn_change: t('lang.change'),
            droppable: false,
            onchange: null,
            allowExt: ['plist'],
            thumbnail: false,
            before_change: function (files) {
                let reader = new FileReader()
                reader.readAsText(files[0])
                reader.onload = function () {
                    const result = formatContext(this.result)
                    //console.log(JSON.stringify(result))
                    base.updateAllSections(result)
                    helper.RefreshAllJqGridTable()
                }
                reader = null
                return true
            },
        })
        .on('file.error.ace', function () {
            showTipModal(t('lang.alertfileerror'), 'error')
        })

    //页面加载完成后解除文件选择框的禁用属性
    $('#id-input-file-2').removeAttr('disabled')

    //初始化提示插件
    $.minimalTips()

    //设置弹出提示插件
    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-center',
    }

    // const lastOpenCorePlistConfig = localStorage?.lastOpenCorePlistConfig;
    // if (lastOpenCorePlistConfig) {
    //     const result = formatContext(lastOpenCorePlistConfig)
    //     base.updateAllSections(result)
    //     helper.RefreshAllJqGridTable()
    //     showTipModal(lang.loadlastplist);
    // }
})



//监听configisfull
watch(() => base.configisfull, (newval, oldval) => {
    //console.log('watch 已触发', newval)
    if (oldval === true && newval === false && $("#li_PlatformInfo_Generic").hasClass("active") === false) {
        $('#button_PlatformInfo_Generic').click();
    }
})

</script>
<template>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="#">Home</a>
            </li>
            <li class="active">{{ base.root }}</li>
        </ul>
        <!-- /.breadcrumb -->

        <div class="nav-search" style="width: 270px; margin-right: 215px">
            <input type="file" disabled id="id-input-file-2" />
        </div>
        <!-- /.nav-search -->
        <div class="pull-right">
            <button class="btn btn-minier btn-success" @click="savePlist">{{ $t('lang.down') }}</button>&nbsp;
            <button class="btn btn-minier btn-success" @click="copyPlist">{{ $t('lang.copy') }}</button>
            <label class="mintip" :title="$t('title.PlatformInfo.configisfull')" style="margin-left: 10px">
                <input v-model="base.configisfull" type="checkbox" class="ace" />
                <span class="lbl"> Custom</span>
            </label>
            <label class="mintip" :title="$t('title.PlatformInfo.configisMOD')" style="margin-left: 10px">
                <input v-model="base.configisMOD" type="checkbox" class="ace" />
                <span class="lbl"> MOD</span>
            </label>
        </div>
    </div>
</template>
