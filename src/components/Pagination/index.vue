<template>
   <div v-show="!listLoading && total > 0" class="pagination-container">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.page"
            :page-sizes="[25, 50, 100, 200]"
            :page-size="listQuery.perPage"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'pagination',
    props: ['listLoading','total','listQuery'],
    methods: {
         handleSizeChange(val) {
            this.listQuery.perPage = val;
            this.$emit("get",'')
          },
          handleCurrentChange(val) {
            this.listQuery.page = val;
            this.$emit("get",'')
          },
    }
}
</script>
