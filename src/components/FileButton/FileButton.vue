<template>
    <div>
         <el-button
              slot="reference"
              type="primary"
              icon="el-icon-setting"
              @click="dialogFormVisible= true; tableLabelClose()">
              列表
        </el-button>
        <el-dialog ref="dialog__wrapper" v-dialogDrag title="表格字段定制" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-row :gutter="20">
                <el-col
                v-for="(item, index) in tableLabel"
                :key="index"
                :span="6"
                style="height:35px"
                >
                <el-checkbox v-model="item.show">{{ item.label }}</el-checkbox>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="dialogFormVisible = false; ">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            tableLabel: { // 父组件传递过来的表头数据
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        data() {
            return {
                dialogFormVisible: false,
            }
            
        },
    }
</script>