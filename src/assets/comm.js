//防抖函数处理
export function fandou(fn, times = 100) {
    let timeouter = null
    return function (...args) {
        if (timeouter) clearTimeout(timeouter)
        timeouter = setTimeout(() => {
            fn.apply(this, args)
        }, times)
    }
}

export function getPlistRealData(arrData, defaultVal = '') {
    if (arrData === undefined) return defaultVal;

    if (getTypeof(arrData) === 'array') {
        return arrData[1] === 'data' ? base64toHex(arrData[0]) : arrData[0]
    }
    return arrData ?? defaultVal
}

export function updateStoreForSimple(vueData, plistData) {
    for (const it in vueData) {
        const tp = getTypeof(vueData[it])
        const pdata = plistData ? plistData[it] : undefined

        if (tp === 'object') {
            updateStoreForSimple(vueData[it], plistData ? plistData[it] : {})
        } else if (tp === 'array') {
            vueData[it] = pdata ?? []
        } else if (tp === 'boolean') {
            vueData[it] = getPlistRealData(pdata, false)
        } else if (tp === 'number') {
            vueData[it] = getPlistRealData(pdata, 0)
        } else {
            vueData[it] = getPlistRealData(pdata)
        }
    }
}

export function updateStoreForValue(vueData, plistData, key) {
    vueData[key + 'Left'] = [];
    vueData[key + 'Right'] = [];
    const keypddata = plistData[key];

    let i = 0, j = 0;
    if (keypddata) {
        for (const [k, v] of Object.entries(keypddata)) {

            vueData[key + 'Left'].push({ id: i, Devices: k });

            for (const [k2, v2] of Object.entries(v)) {

                const item = {};
                item['pid'] = i;
                item['id'] = j++;
                item['Key'] = k2;
                item['Type'] = v2[1];
                item['Value'] = v2;

                vueData[key + 'Right'].push(item);
            }

            i++;

        }
    } else {
        console.log("config.plist not found:" + key)
    }

}

export function updateStoreForVolume(vueData, plistData, key) {

    vueData[key + 'Left'] = [];
    vueData[key + 'Right'] = [];
    let i = 0, id = 0;
    const keypddata = plistData[key];

    if (keypddata) {
        for (const [k, v] of Object.entries(keypddata)) {

            vueData[key + 'Left'].push({ id: i, Devices: k });

            for (let j = 0; j < v.length; j++) {

                const item = {};
                item['pid'] = i;
                item['id'] = id++;
                item['Type'] = v[j][1];
                item['Volume'] = v[j];

                vueData[key + 'Right'].push(item);
            }

            i++;

        }
    } else {
        console.log("config.plist not found:" + key)
    }

}

export function updateStoreForSpecial(vueData, plistData) {
    if (!vueData) return;

    for (const it in vueData) {
        const valType = typeof (vueData[it])
        let defaultvalue = ''
        if (valType === 'boolean') {
            defaultvalue = false
        } else if (valType === 'number') {
            defaultvalue = 0
        }
        vueData[it] = getPlistRealData(plistData[it], defaultvalue)
    }


}

/**
 * 生产UUID
 * @returns 
 */
export function getUUID() {
    let temp_url = URL.createObjectURL(new Blob());
    let uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substring(uuid.lastIndexOf("/") + 1).toUpperCase();
}

/**
* jqgrid 中的formatter使用, 把正确的值解析出来
* @param {string} context 
* @returns string
*/
export function plistEncode(context = '') {

    if (context === '' || context[0] === '') {
        return '';
    }


    if (getTypeof(context) === 'array') {
        switch (context[1]) {
            case 'data':
                return base64toHex(context[0]);
            case 'string':
                context = context[0];
                break;
            case 'bool':
                return context[0] === true ? 'YES' : 'NO';
            default:
                return context[0];
        }

    }

    return htmlEscape(context);

}

/**
 * 得到变量的真实类型
 * @param {object} obj 
 * @returns string
 */
export function getTypeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export function enabledFormat(cellvalue = false) {

    if (getTypeof(cellvalue) === 'array') {
        cellvalue = cellvalue[0];
    }
    if (cellvalue === true || cellvalue === 'YES' || cellvalue === 'true') {
        return 'YES';
    } else {
        return 'NO';
    }

}
export function formatInteger(cellvalue = 0) {

    if (cellvalue === 0) {
        return 0;
    }
    if (getTypeof(cellvalue) === 'array') {
        cellvalue = cellvalue[0];
    }

    if (isNaN(cellvalue)) {
        let warningmsg = fillLangString('The data in the plastic format was incorrectly entered in the string "{@1}", which may cause the configuration file to be wrong. Please check it', cellvalue);

        warningmsg += fillLangString(' (整形格式的数据被错误的输入了字符串"{@1}", 可能导致配置文件错误, 请检查)', cellvalue)
        showTipModal(warningmsg, 'warning');
        return 0;
    }
    return parseInt(cellvalue);
}

/**
* jqgrid 中的formatter使用, 返回一个可以带默认值得函数
* @param {string} defaultvalue 
* @returns function
*/
export function getPlistEncodeFunction(defaultvalue) {
    return (context = '') => {

        if (context === '' || context[0] === '') {
            return defaultvalue;
        }


        if (getTypeof(context) === 'array') {
            return context[1] === 'data' ? base64toHex(context[0]) : context[0]
        }

        return context;

    }
}

/**
 * 由于特殊字符串导致JSON.parse()出错,用这个函数在读取plist文件后把字符串类型数据进行base64编码
 * @param {string} str 
 * @returns string
 */
export function b64Encode(str = '') {
    return str === '' ? '' : btoa(encodeURIComponent(str));
}

/**
 * b64Encode反编码, 在plist内容成功被JSON.parse后把字符串转回来
 * @param {strting} str 
 * @returns string
 */
export function b64Decode(str = '') {
    return str === '' ? '' : decodeURIComponent(atob(str));
}

function base64_decode(input) {

    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    const output = new Array();
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    let orig_input = input;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    if (orig_input != input) {
        showTipModal('Characters outside Base64 range in input string ignored (输入字符串中超出Base64范围的字符被忽略)', 'warning');
    }

    if (input.length % 4) {
        showTipModal('Input length is not a multiple of 4 bytes 16 (进制数据输入长度不是4个字节的倍数)', 'error');
        return "";
    }

    let j = 0;
    while (i < input.length) {

        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[j++] = chr1;
        if (enc3 != 64)
            output[j++] = chr2;
        if (enc4 != 64)
            output[j++] = chr3;

    }
    //console.log('output=',output)
    return output;
}

function dec2hex(d) {
    const hD = '0123456789ABCDEF';
    let h = hD.substr(d & 15, 1);
    while (d > 15) {
        d >>= 4;
        h = hD.substr(d & 15, 1) + h;
    }
    return h;
}

function binary_to_base64(input) {
    const base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    let ret = '';
    let i = 0;
    let j = 0;
    const char_array_3 = new Array(3);
    const char_array_4 = new Array(4);
    let in_len = input.length;
    let pos = 0;

    while (in_len--) {
        char_array_3[i++] = input[pos++];
        if (i == 3) {
            char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
            char_array_4[3] = char_array_3[2] & 0x3f;

            for (i = 0; (i < 4); i++)
                ret += base64_chars.charAt(char_array_4[i]);
            i = 0;
        }
    }

    if (i) {
        for (j = i; j < 3; j++)
            char_array_3[j] = 0;

        char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
        char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
        char_array_4[3] = char_array_3[2] & 0x3f;

        for (j = 0; (j < i + 1); j++)
            ret += base64_chars.charAt(char_array_4[j]);

        while ((i++ < 3))
            ret += '=';

    }

    return ret;
}

/**
 * base64转16进制
 * Thanks to http://www.tomeko.net/online_tools/base64.php?lang=en
 * @param {string} strbase64 
 * @returns string
 */
function base64toHex(strbase64 = '') {
    if (strbase64 === '') {
        return '';
    }

    let output = base64_decode(strbase64);
    let hexText = '';
    for (let i = 0; i < output.length; i++) {
        hexText = hexText + (output[i] < 16 ? "0" : "") + dec2hex(output[i]);
    }
    return hexText;
}

/**
 * 16进制转base64
 * Thanks to http://www.tomeko.net/online_tools/hex_to_base64.php?lang=en
 * @param {*} strhex 
 * @returns 
 */
export function hextoBase64(strhex) {

    strhex = strhex.replace(/\s+/g, "");
    if (strhex.length % 2) {
        let errormsg = 'Error, ' + fillLangString('<{@1}> is not a valid hexadecimal string, because the length of a hexadecimal string cannot be odd', strhex)
        errormsg += fillLangString(' (<{@1}>不是有效的十六进制字符串, 因为十六进制字符串的长度不能为奇数)', strhex)

        showTipModal(errormsg, 'error');
        return '';
    }
    const binary = new Array();
    for (let i = 0; i < strhex.length / 2; i++) {
        let h = strhex.substr(i * 2, 2);
        binary[i] = parseInt(h, 16);
    }
    return binary_to_base64(binary);
}


/**
 * 转义字符串中的 & < > 3个符号, 在生产plist文本内容时使用
 * @param {string} context 
 * @returns string
 */
export function htmlEscape(context = '') {
    return context === '' ? '' : context.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
* 复制内容到剪贴板中
* @param {String} rowdata 
*/
export function copyDatatoClipboard(rowdata) {
    $("body").append('<div id="hiddendivforcopy"><button id="hiddenbuttonforcopy">Copy</button></div>');
    let clipboard = new ClipboardJS('#hiddenbuttonforcopy', {
        text: function () {
            return rowdata;
        }
    });
    //自动点击copy
    $("#hiddenbuttonforcopy").trigger("click");
    //释放clipboard
    clipboard.destroy();
    clipboard = null

    $("#hiddendivforcopy").remove();
}

/**
* 弹出信息窗口
* @param {String} content 信息内容
* @param {String} msgtype 信息类型
*/
export function showTipModal(content, msgtype = 'success') {
    toastr.clear();
    toastr[msgtype](content);
}

/**
 * 把一个json字符串转换成json对象,在复制粘贴功能中使用
 * 如果转换失败返回 false
 * @param {string} str 
 * @returns Object
 */
 export function stringToJSON(str) {
	let objreturn = null;
	try {
		objreturn = JSON.parse(str);
	} catch (e) {
		return false;
	}
	return objreturn;
}

/**
 * 获取表格的最大id
 * @param {Object} jqgrid 表格对象
 * @returns integer
 */
 export function getMaxrowid(objGridTable) {
    const ids = objGridTable.jqGrid('getDataIDs');
    return ids.length === 0 ? 0 : Math.max(...ids);
}

/**
 * fillLangString('my {@1} is {@2}', 'name', 'mady')
 * @param  {...String} args 
 * @returns String
 */
 export function fillLangString(...args) {    
	for(let i=1,len=args.length;i<len;i++) {      
		args[0] = args[0].replace('{@' + i + '}', args[i]);
	}  
	return args[0];
}
