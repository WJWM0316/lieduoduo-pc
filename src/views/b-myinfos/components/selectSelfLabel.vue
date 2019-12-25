<template>
  <!-- 选择个人标签 -->
  <div>
    <div @click="handleShow">
      <slot>
        <div class="el-input el-input--suffix">
          <div class="el-input__inner"><span v-if="!value"  class="input-placeholder-span">{{'请选择' + title}}</span>{{value}}</div>
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i class="el-select__caret el-input__icon el-icon-arrow-down"></i>
            </span>
          </span>
        </div>
      </slot>
    </div>
    <el-dialog
      width="610px"
      custom-class="app-dialog"
      append-to-body
      :visible.sync="dialogStatus">
      <div slot="title">{{'请选择' + title}} <span class="title-tips">(最多选{{limit}}个{{title}})</span></div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    value: String,
    type: {
      type: String,
      default: ''
    },
    title: {
      required: true,
      type: String
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      dialogStatus: false
    }
  },
  methods: {
    handleShow () {
      this.dialogStatus = true
    }
  }
}
</script>
