<template>
  <el-tag type="info">{{searchValue}}</el-tag>
  <el-select v-model="currentValue" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "SelectSuper",
    props: {
      selectList: {
        required: true,
        type: Object
      },
      searchValue: {
        required: true,
        type: String
      },
      multi: {
        type: Boolean
      },
    },
    computed: {
      currentValue: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      }
    }
  }
</script>

<style scoped>

</style>
