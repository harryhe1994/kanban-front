<template>
    <section>
        <el-row>
            <div class="div-btn">
                <el-button type="primary" size="small" @click="addDefect">Add Defect</el-button>
            </div>
            <div class="div-btn">
                <el-button type="primary" size="small" @click="openSearchDefectWin">Search Defect</el-button>
            </div>
        </el-row>
        <el-row>
            <el-col>
                <div id="chartLine" style="width:100%; height:800px; margin-top: 10px"></div>
            </el-col>
        </el-row>
        <el-dialog title="Add Defect" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="Iteration" prop="iteration">
                    <el-input v-model="addForm.iteration" auto-complete="off" placeholder="eg. 2018-IXX"></el-input>
                </el-form-item>
                <el-form-item label="Defect">
                    <el-input-number v-model="addForm.number" :min="0" :max="200"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click.native="addSubmit">Save</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Search Defect" v-model="searchFromVisible" :close-on-click-modal="false">
            <el-row>
                <el-col>
                    <el-form :model="searchCriteria" :inline="true" :rules="searchFormRules" ref="searchCriteria">
                        <el-form-item label="Iteration Name" prop="iteration">
                            <el-input v-model="searchCriteria.iteration"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="searchDefect">Search</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <div style="height: 10px"></div>
            </el-row>
            <el-row>
                <el-col>
                    <el-table :data="defect" highlight-current-row v-loading="listLoading" @selection-change="" style="width: 100%;">
                        <el-table-column type="selection" width="150">
                        </el-table-column>
                        <el-table-column type="index" width="150">
                        </el-table-column>
                        <el-table-column prop="iteration" label="Iteration" width="200" sortable>
                        </el-table-column>
                        <el-table-column prop="number" label="Number" width="200" sortable>
                        </el-table-column>
                        <el-table-column label="Operation" width="200">
                            <template slot-scope="scope">
                                <!--<el-button type="primary" size="small" @click="">Edit</el-button>-->
                                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <div style="margin-top: 2px; float: right">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="this.totalPage"
                            :current-page.sync="pageNo"
                            @current-change="checkOutPage()">
                    </el-pagination>
                </div>
            </el-row>
        </el-dialog>
    </section>
</template>

<script>
    import echarts from 'echarts';
    import defectService from '../../service/DefectService'

    export default {
        data() {
            return {
                chartLine: null,
                defectPoint: [],
                totalPoint: [],
                iterationData: [],
                addFormVisible: false,
                searchFromVisible: false,
                addForm: {
                    iteration: '',
                    number: 0
                },
                searchCriteria: {iteration: ''},
                searchFormRules: {
                    iteration: [
                        {required: true, message: 'Name can not is empty!', trigger: 'blur'}
                    ]
                },
                addFormRules: {
                    iteration: [
                        {required: true, message: 'Name can not is empty!', trigger: 'blur'}
                    ]
                },
                listLoading: false,
                defect: [],
                totalPage: 1,
                pageNo: 1
            }
        },

        methods: {
            test() {
                alert(this.pageNo);
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title: {
                        text: 'Defect Line Chart'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Defect', 'Total Defect']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Defect',
                            type: 'line',
                            stack: 'Number',
                            data: []
                        },
                        {
                            name: 'Total Defect',
                            type: 'line',
                            stack: 'Number',
                            data: []
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawLineChart();
            },
            addDefect() {
                this.addFormVisible = true;
            },
            async openSearchDefectWin() {
                this.searchFromVisible = true;
                this.defect = await defectService.getDefectByPage(0);
                this.getTotalCount();
            },
            async searchDefect() {
                if (this.searchCriteria.iteration.trim() !== '') {
                    this.defect = await defectService.findDefectByIteration(this.searchCriteria.iteration.trim());
                    this.totalPage = 1;
                }
            },
            async loadInitData() {
                this.defectPoint = [];
                this.totalPoint = [];
                this.iterationData = [];
                let data = await defectService.findAll();
                let $this = this;
                data.forEach(function (record) {
                    $this.defectPoint.push(record.number);
                    $this.totalPoint.push(record.total);
                    $this.iterationData.push(record.iteration);
                });
                this.chartLine.setOption({
                    xAxis: {
                        data: this.iterationData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Defect',
                            type: 'line',
                            data: this.defectPoint
                        },
                        {
                            name: 'Total Defect',
                            type: 'line',
                            data: this.totalPoint
                        }
                    ]
                });
            },
            async addSubmit() {
                if (this.addForm.iteration.trim() === '') {
                    this.$message({
                        type: 'info',
                        message: 'Iteration name can not is empty!'
                    });
                    return;
                }
                let validateResult = await defectService.findDefectByIteration(this.addForm.iteration);
                if (validateResult.length > 0) {
                    this.$message({
                        type: 'info',
                        message: 'Iteration name must be unique!'
                    });
                } else {
                    let sum = Number(this.addForm.number);
                    for (let i = 0; i < this.defectPoint.length; i++) {
                        sum += Number(this.defectPoint[i]);
                    }
                    let defect = {
                        iteration: this.addForm.iteration.trim(),
                        number: this.addForm.number,
                        total: sum
                    };
                    await defectService.addDefect(defect);
                    this.$message({
                        type: 'success',
                        message: 'Success'
                    });
                    this.addFormVisible = false;
                    this.loadInitData();
                }

            },
            handleDel(index, row) {
                this.$confirm('Are you want to delete?', 'Tips', {
                    type: 'warning',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then(async () => {
                    this.listLoading = true;
                    defectService.deleteDefectById(row._id).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    });
                    this.defect = await defectService.getDefectByPage(0);
                });
            },
            async getTotalCount() {
                this.totalPage = await defectService.getTotalCount();
            },
            async checkOutPage() {
                this.defect = await defectService.getDefectByPage(this.pageNo - 1);
            }
        },
        mounted: function () {
            this.drawCharts();
            this.loadInitData();
        },
        watch: {
            searchFromVisible: function (oldValue, newValue) {
                if (newValue) {
                    this.loadInitData();
                }
            }
        }
    }
</script>

<style scoped>
    .div-btn {
        float: left;
        margin-left: 10px;
    }
</style>