<script setup>
import { useBaseStore } from '../stores/index'
import { useLangStore } from '../stores/lang'
import { useTipsStore } from '../stores/Tips_zh-CN'
import { userTableStore } from '../stores/table'
import Helper from '../assets/helper'
import Generateplist from '../assets/generateplist'
import  {PlistParser}  from '../assets/plistparser'
import {getTypeof,b64Decode,fillLangString,copyDatatoClipboard,showTipModal} from '../assets/comm'


import { onMounted, watch } from 'vue'

const base = useBaseStore()
const title = useTipsStore()
const table = userTableStore()
const lang = useLangStore().lang
const helper = new Helper(table, title, base)

//查看有没有表格在被编辑中
function checkOneditTable() {

    if(table.GLOBAL_SET_ONEDITTABLE.size === 0) {
        return '';
    }

    const newset = new Set();
    for(let it of table.GLOBAL_SET_ONEDITTABLE) {
        let arrit = it.split('_');
        newset.add(arrit[1] + " | " + arrit[2]);
        
    }
    
    let newmsg = '-'.repeat(30) + '<br>' + Array.from(newset).join('<br>') + '<br>' + '-'.repeat(30);
    return fillLangString(lang.editingtablemessage, newmsg);
}

//保存按钮
function savePlist() {
    let cotstring = checkOneditTable();
    if(cotstring !== "") {
        toastr.error(cotstring);
        return;
    }
    const genplist = new Generateplist(table,lang, base)
    let xmlcontext = genplist.getAllPlist();
    let blob = new Blob([xmlcontext], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "config.plist");
    showTipModal(lang.downplistSuccess, 'success');
}

//复制按钮
function copyPlist() {
    let cotstring = checkOneditTable();
    if(cotstring !== "") {
        toastr.error(cotstring);
        return;
    }
    const genplist = new Generateplist(table,lang, base)
	let xmlcontext = genplist.getAllPlist();
	copyDatatoClipboard(xmlcontext);
	showTipModal(lang.copyplistSuccess, 'success');
}

/**
 * 把Plist的文本内容转换成json对象返回
 * @param {string} context 
 * @returns JSON Object
 */
 function formatContext(context='') {
    context = context.replace(/[\t\r]/g,'');
    const arrayContext = context.split('\n');
    let result = '';

    for(let i=0,len=arrayContext.length;i<len;i++) {
        result += arrayContext[i].trim();
    }

    result = PlistParser.parse(result);
    result = PlistParser.serialize(result);
    
    const fillstring = (ke,va) => {
        if(getTypeof(va) === 'array' && va[1] === 'string') {
            va[0] = b64Decode(va[0]);
        }
        return va;
    };

    result = JSON.parse(result,fillstring);
    bljsonobj(result);
        
    return result;
    
}

/**
 * 遍历JSON Object 对象,把编过码的键值全部改回来
 * @param {Object} obj 
 */
function bljsonobj(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        
        const tf = getTypeof(value);

        obj[b64Decode(key)] = value;
        obj[key] = null;
        Reflect.deleteProperty(obj, key)
        //delete obj[key];

        if(tf === 'array') {
            const lenarr = value.length;
            for(let it=0;it<lenarr;it++) {
                
                if(getTypeof(value[it]) === 'object') {
                    bljsonobj(value[it]);
                } 
                
            }
        } else if(tf === 'object') {
            bljsonobj(value);

        }
        
    });
}


onMounted(() => {
    $('#id-input-file-2')
        .ace_file_input({
            no_file: lang.no_file,
            btn_choose: lang.choose,
            btn_change: lang.change,
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
            showTipModal(lang.alertfileerror, 'error')
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
            <button class="btn btn-minier btn-success" @click="savePlist">{{ lang.down }}</button>&nbsp;
            <button class="btn btn-minier btn-success" @click="copyPlist">{{ lang.copy }}</button>
            <label class="mintip" :title="title.PlatformInfo.configisfull" style="margin-left: 10px">
                <input v-model="base.configisfull" type="checkbox" class="ace" />
                <span class="lbl"> Custom</span>
            </label>
            <label class="mintip" :title="title.PlatformInfo.configisMOD" style="margin-left: 10px">
                <input v-model="base.configisMOD" type="checkbox" class="ace" />
                <span class="lbl"> MOD</span>
            </label>
        </div>
    </div>
</template>
