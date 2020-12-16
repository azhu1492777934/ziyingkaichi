<template>
    <div>
        <el-table-column :show-overflow-tooltip="true" sortable type="selection" width="55" fixed="left"/>
         <template v-for="(item, index) in tableLabel">
            <el-table-column
            v-if="item.show"
            :key="index"
            :show-overflow-tooltip="true"
            :prop="item.prop"
            :width="item.width"
            :label="item.label"
            />
        </template>
    </div>
</template>
<script>
export default {
    name: 'file-table',
    props: {
        tableLabel: { // 父组件传递过来的表头数据
            type: Array,
            default: () => {
                return []
            }
        },
    } 
}
</script>