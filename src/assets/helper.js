import { fandou, copyDatatoClipboard, showTipModal, stringToJSON, getMaxrowid, handFile } from './comm.js'
export default class Helper {
    /**
     *
     * @param {*} table 表格相关数据
     * @param {*} lang  语言相关数据
     * @param {*} base  内容相关数据
     */
    constructor(table, lang, base, popdata) {
        this.table = table
        this.lang = lang
        this.base = base
        this.popdata = popdata
    }

    /**
     * 刷新所有表格数据
     */
    RefreshAllJqGridTable() {
        //重新绑定所有表格数据
        for (let item of this.table.GLOBAL_MAP_TABLE.entries()) {
            const arrayItem = item[0].split('_')
            item[1].jqGrid('clearGridData') //先清空，再加载
            item[1].jqGrid('setGridParam', { datatype: 'local', data: this.base[arrayItem[0]][arrayItem[1]] }).trigger('reloadGrid')
        }

        //选中Left表格的第一行， 注意：不能和前面的for循环合并
        for (let item of this.table.GLOBAL_MAP_TABLE.entries()) {
            if (item[0].endsWith('Left')) {
                item[1].jqGrid('setSelection', 0, true)
            }
        }
    }

    static current_paste_tableid = ''

    /**
     *
     * @param {*} objGridTable  表格对象
     * @param {*} gridData 表格数据
     * @param {*} colNames 字段名称列表
     * @param {*} colModel 字段属性列表
     * @param {*} width 表格宽度
     * @param {*} height 表格高度
     * @param {*} rownumbers 是否显示行号
     */
    initGridTable(objGridTable, gridData, colNames, colModel, width = 0, height = 0, isrownumbers = true) {
        const tableStore = this.table

        height ||= parseInt(tableStore.tableHeight * 0.45)
        width ||= tableStore.tableWidth

        objGridTable.jqGrid({
            data: gridData,
            datatype: 'local',
            height: height,
            shrinkToFit: true,
            autowidth: true,
            colNames: colNames,
            colModel: colModel,
            //altRows: true,
            scroll: false,
            multiselect: true,
            multiboxonly: true,
            rowNum: 9000,
            rownumbers: isrownumbers,
            rownumWidth: 22,
            ondblClickRow: (rowid) => {
                objGridTable.jqGrid('editRow', rowid, {
                    url: 'clientArray',
                    keys: true,
                    oneditfunc: function () {
                        //进入编辑状态
                        tableStore.GLOBAL_SET_ONEDITTABLE.add(objGridTable.selector + '_' + rowid)
                    },
                    aftersavefunc: function () {
                        //按回车保存
                        tableStore.GLOBAL_SET_ONEDITTABLE.delete(objGridTable.selector + '_' + rowid)
                    },
                    afterrestorefunc: function () {
                        //按Esc还原
                        tableStore.GLOBAL_SET_ONEDITTABLE.delete(objGridTable.selector + '_' + rowid)
                    },
                })
            },
        })

        objGridTable.jqGrid('setGridWidth', width)
        //行拖动功能
        objGridTable.jqGrid('sortableRows', {
            items: '.jqgrow:not(.unsortable)',
        })

        //窗口拉动
        $(window).on('resize.jqGrid', () => {
            const tab_content_width = objGridTable.closest('.tab-content').width()
            if (tab_content_width > 0) setAllTableWidth(this.table, tab_content_width)
        })

        //防抖后的设置所有表格宽度函数
        const setAllTableWidth = fandou(function (table, theWidth) {
            //设置表格宽度
            table.setTableWidth(theWidth)
            for (let item of table.GLOBAL_MAP_TABLE.entries()) {
                if (item[0].endsWith('Left') || item[0].endsWith('Right')) {
                    item[1].jqGrid('setGridWidth', table.tableHalfWidth)
                } else {
                    item[1].jqGrid('setGridWidth', theWidth)
                }
            }
        })
    }

    //执行所有的按钮点击事件
    pubImgButtonClick(event) {
        const buttonid = event.currentTarget.id
        const buttonBehind = buttonid.substring(buttonid.indexOf('_') + 1)
        const currentGridTable = this.table.getTable(buttonBehind)
        this['imgButtonClick_' + buttonid.substring(0, buttonid.indexOf('_'))](buttonBehind, currentGridTable)
    }

    //启用按钮点击事件
    imgButtonClick_btnenabled(buttonBehind, currentGridTable) {
        const selectedIds = currentGridTable.jqGrid('getGridParam', 'selarrrow')

        if (selectedIds.length > 0) {
            let theEnabled = currentGridTable.jqGrid('getCell', selectedIds[0], 'Enabled')
            theEnabled = theEnabled === 'YES' ? 'NO' : 'YES'

            for (let i = 0, len = selectedIds.length; i < len; i++) {
                currentGridTable.jqGrid('setCell', selectedIds[i], 'Enabled', theEnabled)
            }
        }
    }

    //增加按钮点击事件
    imgButtonClick_btnadd(buttonBehind, currentGridTable) {
        if (buttonBehind.endsWith('Right')) {
            const theGrid = this.table.getTable(buttonBehind.replace('Right', 'Left'))
            const selectedId = theGrid.jqGrid('getGridParam', 'selrow')

            if (selectedId !== null) {
                let maxid = getMaxrowid(currentGridTable)
                currentGridTable.jqGrid('addRowData', ++maxid, { pid: selectedId }, 'last')
            }
        } else {
            let maxid = getMaxrowid(currentGridTable)
            currentGridTable.jqGrid('addRowData', ++maxid, {}, 'last')
        }
    }

    //删除按钮点击事件
    imgButtonClick_btndel(buttonBehind, currentGridTable) {
        const selectedIds = currentGridTable.jqGrid('getGridParam', 'selarrrow')

        //如果有选中行, 说明可以进行删除操作
        if (selectedIds.length > 0) {
            let deleteIds = [],
                rowData,
                leftSelectedId

            //如果是右边表格, 只要删除左边选中行下面的数据即可
            if (buttonBehind.endsWith('Right')) {
                let leftGrid = this.table.getTable(buttonBehind.replace('Right', 'Left'))

                leftSelectedId = leftGrid.jqGrid('getGridParam', 'selrow')
            }

            for (let i = 0, len = selectedIds.length; i < len; i++) {
                if (leftSelectedId === undefined) {
                    deleteIds.push(parseInt(selectedIds[i]))
                } else {
                    rowData = currentGridTable.jqGrid('getRowData', selectedIds[i])
                    if (leftSelectedId == rowData.pid) {
                        deleteIds.push(parseInt(selectedIds[i]))
                    }
                }
            }
            deleteIds.sort((x, y) => y - x)

            for (let it of deleteIds) {
                //在删除行之前,把table.GLOBAL_SET_ONEDITTABLE中的记录删除(如果有的话)
                this.table.GLOBAL_SET_ONEDITTABLE.delete('#gridtable_' + buttonBehind + '_' + it)

                currentGridTable.jqGrid('delRowData', it)
            }

            //如果删除左边表格, 要隐藏右边表格
            if (buttonBehind.endsWith('Left')) {
                const rightButtonBehind = buttonBehind.replace('Left', 'Right')
                const rightGrid = this.table.getTable(rightButtonBehind)
                const rowIds = rightGrid.getDataIDs()
                for (let it of rowIds) {
                    //在隐藏行之前,把table.GLOBAL_SET_ONEDITTABLE中的记录删除(如果有的话)
                    this.table.GLOBAL_SET_ONEDITTABLE.delete('#gridtable_' + rightButtonBehind + '_' + it)

                    rightGrid.setRowData(it, null, { display: 'none' })
                }
            }

            showTipModal(this.lang.deleterowsuccess, 'success')
        }
    }

    //复制按钮点击事件
    imgButtonClick_btncopy(buttonBehind, currentGridTable) {
        //先清空剪贴板
        const selectedId = currentGridTable.jqGrid('getGridParam', 'selarrrow')
        if (selectedId.length === 0) {
            copyDatatoClipboard(' ')
            showTipModal(this.lang.checkdatafirst, 'error')
            return
        }
        let rowData,
            arrStrdata = [],
            leftSelectedId

        //如果是右边表格, 只要复制左边选中行下面的数据即可
        if (buttonBehind.endsWith('Right')) {
            const leftGrid = this.table.getTable(buttonBehind.replace('Right', 'Left'))

            leftSelectedId = leftGrid.jqGrid('getGridParam', 'selrow')
        }

        for (let i = 0, len = selectedId.length; i < len; i++) {
            rowData = currentGridTable.jqGrid('getRowData', selectedId[i])

            if (leftSelectedId === undefined || leftSelectedId == rowData.pid) {
                arrStrdata.push(JSON.stringify(rowData))
            }
        }

        copyDatatoClipboard('[' + arrStrdata.join() + ']')

        showTipModal(this.lang.copydatasuccess, 'success')
    }

    //粘贴按钮点击事件
    imgButtonClick_btnpaste(buttonBehind) {
        Helper.current_paste_tableid = '#gridtable_' + buttonBehind
        this.showTextareaModal()
    }

    /**
     * 根据左边的id决定右边的数据是否显示
     **/
    resetSubGridTable(pid, gridkey, theData, keyname) {
        let rightName = keyname + 'Right',
            objGridTable = this.table.getTable(gridkey)
        //objGridTable.jqGrid('resetSelection');

        for (let i = 0, len = theData[rightName].length; i < len; i++) {
            if (theData[rightName][i].pid == pid) {
                //注意：这里一定是==,不能===
                objGridTable.setRowData(theData[rightName][i].id, null, { display: '' })
            } else {
                objGridTable.setRowData(theData[rightName][i].id, null, { display: 'none' })
            }
        }
    }

    /**
     * 弹出粘贴窗口
     */
    showTextareaModal() {
        this.base.textarea_content = ''
        $('#inputModal').modal('show')
        $('#inputModal').on('shown.bs.modal', function () {
            $('#inputModal #textarea_plist_paste').focus() //获取焦点
        })
    }

    //数据行粘贴
    pasteDataToTable() {
        this.base.textarea_content = this.base.textarea_content.trim()
        if (this.base.textarea_content === '') {
            showTipModal(this.lang.nopasteData, 'error')
            return
        }

        let rowData = stringToJSON(this.base.textarea_content)

        if (rowData === false || rowData instanceof Array === false) {
            showTipModal(this.lang.dataFormaterror, 'error')
            return
        }

        let ids = Helper.current_paste_tableid.split('_')

        let objGridTable = this.table.getTable(ids[1] + '_' + ids[2])

        //检查数据复制源和复制的格式是否一致
        let arrayColNames = objGridTable.jqGrid('getGridParam', 'colNames')
        for (let con in rowData[0]) {
            if (arrayColNames.indexOf(con) === -1) {
                showTipModal(this.lang.dataFormaterror, 'error')
                return
            }
        }

        //如果是右边表格, 要多做几个处理,1 检查左边是否选中, 2 修改pid 3 删除id
        if (ids[2].endsWith('Right')) {
            let leftgrid = this.table.getTable(ids[1] + '_' + ids[2].replace('Right', 'Left'))
            let leftSelectedId = leftgrid.jqGrid('getGridParam', 'selrow')

            if (leftSelectedId === null) {
                showTipModal(this.lang.chooseDevices, 'warning')
                return
            }

            for (let it in rowData) {
                if (rowData[it]['pid'] !== undefined) {
                    rowData[it]['pid'] = leftSelectedId
                }
                if (rowData[it]['id'] !== undefined) {
                    delete rowData[it]['id']
                }
            }
        }
        let maxid = getMaxrowid(objGridTable)
        for (let it in rowData) {
            objGridTable.jqGrid('addRowData', ++maxid, rowData[it], 'last')
        }
        $('#inputModal').modal('hide')

        showTipModal(this.lang.pasteDataSuccess, 'success')
    }

    // 单选按钮点击事件
    btnradioboxclick(event) {
        this.popdata.RADIO_CHECK_BOX = 'R'
        let buttonids = event.currentTarget.id.split('_')

        if (this.popdata.last_radiobox_ids.join('_') !== event.currentTarget.id) {
            this.popdata.pageRadio_List = this.popdata[buttonids[3] + '_List']
            this.popdata.last_radiobox_ids = buttonids
        }

        //根据输入框中的值决定要不要勾选单选框
        let iv = this.base[buttonids[1]][buttonids[2]][buttonids[3]]
        if (this.popdata.pageRadio_CurrentValue !== iv) {
            this.popdata.pageRadio_CurrentValue = iv
        }

        $('#divMuCheckboxPageModal').modal('show')
    }

    // 弹出多选窗口按钮点击事件
    btncheckboxclick(event, vlen = 8) {
        this.popdata.RADIO_CHECK_BOX = 'C'
        let buttonids = event.currentTarget.id.split('_')

        // 1 为要显示的页面添加可选框数据列表 current_checkbox_id
        if (this.popdata.last_checkbox_ids.join('_') !== event.currentTarget.id) {
            this.popdata.pagePublic_List = this.popdata[buttonids[3] + '_List']
            this.popdata.last_checkbox_ids = buttonids
            this.popdata.pagePublic_Selected = []
        }

        // 2 获取页面上输入框中的值
        let pageinputvalue = this.base[buttonids[1]][buttonids[2]][buttonids[3]]

        //如果页面输入框中的值为空，就清空已经选中的项目
        if (pageinputvalue > 0 === false) {
            this.popdata.pagePublic_Selected = []
            $('#divMuCheckboxPageModal').modal('show')
            return
        }

        // 4 如果勾选的值和页面输入框中的值相等
        if (pageinputvalue == this.getCheckedTotal()) {
            $('#divMuCheckboxPageModal').modal('show')
            //consolelog('勾选值和页面值相等，不做自动勾选处理');
            return
        }

        let piv16 = parseInt(pageinputvalue).toString(16),
            itval,
            ckdict = {
                1: ['1'],
                2: ['2'],
                3: ['1', '2'],
                4: ['4'],
                5: ['1', '4'],
                6: ['2', '4'],
                7: ['1', '2', '4'],
                8: ['8'],
                9: ['1', '8'],
                a: ['2', '8'], //10
                b: ['1', '2', '8'], //11
                c: ['4', '8'], //12
                d: ['1', '4', '8'], //13
                e: ['2', '4', '8'], //14
                f: ['1', '2', '4', '8'], //15
            }
        this.popdata.pagePublic_Selected = []

        for (let i = piv16.length - 1, k = 1; i >= 0; i--, k++) {
            if (piv16[i] === '0') continue

            itval = ckdict[piv16[i]]
            for (let j = 0; j < itval.length; j++) {
                this.popdata.pagePublic_Selected.push('0x' + '0'.repeat(vlen - k) + itval[j] + '0'.repeat(k - 1))
            }
        }

        $('#divMuCheckboxPageModal').modal('show')
    }

    //勾选页面点击确定按钮事件
    checkboxPageBtnOKclick() {
        if (this.popdata.RADIO_CHECK_BOX === 'C') {
            this.base[this.popdata.last_checkbox_ids[1]][this.popdata.last_checkbox_ids[2]][this.popdata.last_checkbox_ids[3]] = this.getCheckedTotal()
        } else if (this.popdata.RADIO_CHECK_BOX === 'R') {
            this.base[this.popdata.last_radiobox_ids[1]][this.popdata.last_radiobox_ids[2]][this.popdata.last_radiobox_ids[3]] =
                this.popdata.pageRadio_CurrentValue
        }

        $('#divMuCheckboxPageModal').modal('hide')
    }

    //获取勾选项的合计值，以10进制返回
    getCheckedTotal() {
        let pagetotal = 0
        for (let i = 0, len = this.popdata.pagePublic_Selected.length; i < len; i++) {
            //consolelog(checklist[i]);
            pagetotal += parseInt(this.popdata.pagePublic_Selected[i], 16)
        }
        //consolelog('勾选值=' + pagetotal);
        return pagetotal
    }

    getImgURL(imgkey) {
        return new URL('../static/images/' + imgkey + '.png', import.meta.url).href
    }

    // ACPI Add 和 UEFI Drivers Kernel_Add处添加文件
    addFile(fileid) {
        const file = document.getElementById(fileid),
            thetablename = fileid.substr(fileid.indexOf('_') + 1)

        const thetable = this.table.getTable(thetablename)

        let files,
            maxid = getMaxrowid(thetable)

        //依次循环处理多选的多个文件
        for (let i = 0; i < file.files.length; i++) {
            files = file.files[i]

            if (thetablename === 'ACPI_Add') {
                thetable.jqGrid('addRowData', ++maxid, { Comment: '', Path: files.name, Enabled: 'YES' }, 'last')
            } else if (thetablename === 'UEFI_Drivers') {
                thetable.jqGrid('addRowData', ++maxid, { Path: files.name, Arguments: '', Comment: '', Enabled: 'YES' }, 'last')
            } else if (thetablename === 'Kernel_Add') {
                handFile(files, thetable)
            }
        }
    }
}
