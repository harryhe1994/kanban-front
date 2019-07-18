<template>
    <section>
        <el-row style="margin-bottom: 5px">
            <div class="div-btn">
                <el-button type="primary" size="small" @click="addIteration">Add Iteration</el-button>
            </div>
            <div class="div-btn">
                <el-button type="danger" size="small" @click="deleteIteration">Delete Iteration</el-button>
            </div>
            <div class="div-btn" style="margin-left: 60px">
                <el-button type="success" size="small" @click="save">Save</el-button>
            </div>
        </el-row>
        <el-row>
            <el-col :span="4">
                <el-table
                        :data="iterationTitle"
                        height="400"
                        border
                        :highlight-current-row="true"
                        :row-class-name="tableRowClassName"
                        @row-click="tableRowClick"
                        style="width: 100%">
                    <el-table-column
                            prop="iterationTitle"
                            label="Iteration">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="17">
                <!--<quill-editor class="editorStyle" ref="myTextEditor"-->
                <!--v-model="comment"-->
                <!--:config="editorOption"-->
                <!--@blur="onEditorBlur($event)">-->
                <!--</quill-editor>-->
                <!--<div id="ueditor" style="width: 100%; height: auto">-->
                <!--<vue-ueditor-wrap @ready="onEditorBlur" v-model="comment" :config="editorConfig"></vue-ueditor-wrap>-->
                <!--</div>-->
                <div style="height: 400px">
                    <VueUEditor @ready="editorReady"
                                ueditorPath="../../../static/UEditor/"
                                :ueditorConfig="editorConfig">

                    </VueUEditor>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import actionService from '../../service/ActionService';
    // import VueUeditorWrap from 'vue-ueditor-wrap';
    import VueUEditor from 'vue-ueditor';

    export default {
        components: {
            // VueUeditorWrap,
            VueUEditor
        },
        data() {
            return {
                contentHasSave: true,
                comment: '',
                iterationData: [],
                backupData: [],
                temp: [],
                editor: null,
                iterationTitle: [],
                selectedIterationId: '',
                selectedTitle: '',
                editorConfig: {
                    autoHeightEnabled: false,
                    initialFrameHeight: 600,
                    initialFrameWidth: '100%',
                    enableAutoSave: false,
                    toolbars: [
                        [
                            'fullscreen', 'source', 'undo', 'redo', 'bold', 'italic',
                            'underline','fontborder', 'backcolor', 'fontsize', 'fontfamily',
                            'justifyleft', 'justifyright','justifycenter', 'justifyjustify',
                            'strikethrough','superscript', 'subscript', 'removeformat',
                            'formatmatch','autotypeset', 'blockquote', 'pasteplain', '|',
                            'forecolor', 'backcolor','insertorderedlist', 'insertunorderedlist',
                            'selectall', 'cleardoc', 'link', 'unlink','emotion', 'help'
                        ]
                    ]
                }
            }
        },
        methods: {
            async loadBackupData() {
                let data = await actionService.findActionByTime();
                let $this = this;
                $this.backupData = [];
                data.forEach(function (iteration) {
                    $this.backupData.push(iteration);
                });
            },

            addIteration() {
                let $this = this;
                this.$prompt('Iteration Name', 'Tips', {
                    confirmButtonText: 'Save',
                    cancelButtonText: 'Cancel',
                    inputPattern: /\S/,
                    inputErrorMessage: 'Please input iteration name'
                }).then(async ({value}) => {
                    let checkName = true;
                    $this.iterationTitle.forEach(function (record) {
                        if (record.iterationTitle === value) {
                            checkName = false;
                            return false;
                        }
                    });
                    if (checkName) {
                        let action = {};
                        action.iteration = value;
                        action.comment = '';
                        let data = await actionService.addAction(action);
                        data.forEach(function (iteration) {
                            $this.iterationData.unshift(iteration);
                            $this.iterationTitle.unshift({iterationTitle: iteration.iteration});
                        });
                        this.editor.setContent('');
                        this.selectedIterationId = this.iterationData[0]._id;
                        this.selectedTitle = this.iterationTitle[0].iterationTitle;
                        this.$message({
                            type: 'success',
                            message: 'Iteration name is: ' + value
                        });
                    } else {
                        $this.$message({
                            type: 'info',
                            message: 'Iteration name has used!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel input!'
                    });
                });
            },

            async loadDefaultIteration() {
                let data = await actionService.findActionByTime();
                let $this = this;
                data.forEach(function (iteration) {
                    $this.iterationData.push(iteration);
                    $this.iterationTitle.push({iterationTitle: iteration.iteration});
                });
                if (this.iterationData.length > 0) {
                    this.editor.setContent(this.iterationData[0].comment);
                    this.selectedIterationId = this.iterationData[0]._id;
                    this.selectedTitle = this.iterationData[0].iteration;
                } else {
                    this.editor.setContent('');
                }
            },

            tableRowClassName(row) {
                if (row.iterationTitle === this.iterationTitle[0].iterationTitle) {
                    return 'el-table__row first-row current-row';
                } else {
                    return '';
                }
            },

            tableRowClick(row, event, column) {
                console.log(this.editor.getContent());
                let title = row.iterationTitle;
                let $this = this;
                this.iterationData.forEach((r, index) => {
                    if (r.iteration === $this.selectedTitle) {
                        $this.iterationData[index].comment = $this.editor.getContent();
                    }
                });
                this.iterationData.forEach(function (record) {
                    if (title === record.iteration) {
                        $this.editor.setContent(record.comment);
                        $this.selectedIterationId = record._id;
                        $this.selectedTitle = record.iteration;
                    }
                });
            },

            deleteIteration() {
                let $this = this;
                this.$confirm('Are you want to delete?', 'Tips', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    let result = await actionService.deleteActionById(this.selectedIterationId);
                    if (result.ok === 1) {
                        this.iterationTitle =[];
                        this.iterationData = [];
                        this.loadDefaultIteration();
                        this.loadBackupData();
                        this.$message({
                            type: 'success',
                            message: 'success!'
                        });
                        this.editor.setContent('');
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            },

            checkContentChange() {
                let $this = this;
                if($this.backupData.length !== $this.iterationData.length) {
                    $this.contentHasSave = false;
                    return;
                }

                for(let i = 0; i < $this.iterationData.length; i++) {
                    let result = $this.backupData.find((e) => {
                        return e._id === $this.iterationData[i]._id;
                    });
                    if(!!result && result.comment.length !== $this.iterationData[i].comment.length && result.comment !==
                        $this.iterationData[i].comment){
                        $this.contentHasSave = false;
                    }
                }
            },

            async save() {
                let $this = this;
                let result = await actionService.updateAction(this.iterationData);
                if (result.ok === 1) {
                    $this.backupData = $this.iterationData.slice();
                    $this.contentHasSave = true;
                    $this.$message({
                        type: 'success',
                        message: 'updated!'
                    });
                } else {
                    $this.$message({
                        type: 'info',
                        message: 'save failed!'
                    });
                }
            },

            editorReady(editorInstance) {
                let $this = this;
                editorInstance.addListener('blur', () => {
                    let index = $this.iterationData.findIndex((rec) => {
                        return rec._id === $this.selectedIterationId;
                    });
                    $this.iterationData[index].comment = editorInstance.getContent();
                });
                this.editor = editorInstance;
                this.loadDefaultIteration();
            }
        },

        beforeRouteLeave: function(to, from, next) {
            this.checkContentChange();
            let $this = this;
            if(!this.contentHasSave) {
                next(false);
                this.$confirm('Please save changes at first!', 'Tip', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    $this.save();
                    next();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            } else {
                next();
            }
        },


        // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            // editor() {
            //     return this.$refs.myTextEditor.quillEditor
            // }
        },
        mounted() {
            this.loadBackupData();
            window.onbeforeunload = function (e) {
                e = e || window.event;
                e.returnValue = 'confirm';
            };
        },

        destroyed() {
        }
    }
</script>
<style scoped>
    .div-btn {
        float: left;
        margin-left: 10px;
    }
</style>