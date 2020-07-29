<template>
<div>
  <el-tag class="tag" type="info">{{searchValue}}</el-tag>
  <el-select  filterable v-model="value" @input="$emit('update:selects', value)" placeholder="请选择">
    <el-option
      v-for="item in selectList"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
  </div>
</template>

<script>
  export default {
    name: "SelectSuper",
    props: {
      selectList: {
        required: true,
        type: Array
      },
      searchValue: {
        required: true,
        type: String
      },
      multi: {
        type: Boolean
      },
      value:{

      }
    },
    computed: {
      currentValue: {
        set(val) {
          this.$emit('selects', val)
        }
      }
    }
  }
</script>

<style scoped>
.el-tag{
  width: 110px;
    height: 35px;
    position: relative;
    top: -4px;
    line-height: 26px;
    text-align: center;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}
.el-select{
  width: 250px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
