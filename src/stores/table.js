import { defineStore } from "pinia";
export const userTableStore = defineStore("table", {
  state: () => {
    return {
      GLOBAL_TABLE_WIDTH: 0, //表格的宽度
      GLOBAL_TABLE_HEIGHT: 0, //表格的高度

      GLOBAL_MAP_TABLE: new Map(), //用于存储所有初始化好的表格
      GLOBAL_SET_ONEDITTABLE: new Set(), //用于存储编辑中的表格名称，回车保存后会从Set中删除

      DATA_TYPE_LIST: {
        //Type的类型列表
        string: "string",
        data: "data",
        real: "real",
        integer: "integer",
        bool: "bool",
        date: "date",
      },

      //弹出窗口相关******************
      RADIO_CHECK_BOX: "C", //用于标记显示多选列表还是单选列表, C表示多选,R表示单选

      pagePublic_List: [], //前台页面多选值循环用
      pagePublic_Selected: [], //控制哪些多选项被勾选

      pageRadio_List: [], //前台页面单选值循环用
      pageRadio_CurrentValue: "", //记录当前选中的单选的值

      //弹出窗口相关******************
    };
  },

  getters: {
    tableWidth() {
      return this.GLOBAL_TABLE_WIDTH;
    },

    //返回表格的半宽
    tableHalfWidth() {
      return parseInt(this.GLOBAL_TABLE_WIDTH / 2) - 8;
    },

    tableHeight() {
      return this.GLOBAL_TABLE_HEIGHT;
    },

    dataTypeList() {
      return this.DATA_TYPE_LIST;
    },
    onEditTableList() {
      return this.GLOBAL_SET_ONEDITTABLE;
    },
  },

  actions: {
    setTableWidthAndHeight(objTable) {
      if (this.GLOBAL_TABLE_WIDTH === 0) {
        this.GLOBAL_TABLE_WIDTH = objTable.closest(".tab-content").width();
        this.GLOBAL_TABLE_HEIGHT = $(document).height();
      }
    },
    setTableWidth(tw) {
      this.GLOBAL_TABLE_WIDTH = tw;
    },

    addTable(tabkey, tabobj) {
      this.GLOBAL_MAP_TABLE.set(tabkey, tabobj);
    },

    getTable(tbkey) {
      return this.GLOBAL_MAP_TABLE.get(tbkey);
    },

    setTableHeight() {
      if (this.GLOBAL_TABLE_HEIGHT === 0) {
        this.GLOBAL_TABLE_HEIGHT = $(document).height();
      }
    },
  },
});
