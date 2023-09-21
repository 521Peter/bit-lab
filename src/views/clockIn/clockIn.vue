<!-- 打卡页面 -->

<template>
    <div>
        <!-- 签到表 -->
        <div class="clockIn">
            <p>签到签退表</p>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="签到时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="签退时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date3">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date3"
                                style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date4">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.date4"
                                style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="是否值日" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>

                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">打卡</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 值日表 -->
        <div class="duty">
            <p>值日表</p>
            <el-calendar>
                <template slot="dateCell" slot-scope="{ data}">

                    {{ data.day.split('-').slice(1).join('-') }}
                    <div v-for="item in persons" :key="item.date">
                        <div v-if="item.date == data.day.split('-').slice(1).join('-')">
                            {{ item.name }}
                        </div>
                    </div>

                </template>
            </el-calendar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                date1: '',
                date2: '',
                date3: '',
                date4: '',
                delivery: false,
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],

                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                date3: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date4: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],

            },
            persons: [
                { date: '08-01', name: 'asd' },
                { date: '08-02', name: 'sfd' },

                { date: '08-03', name: 'gfh' },
                { date: '08-04', name: 'rty' },
                { date: '08-05', name: 'qw' },
                { date: '08-14', name: 'sfd' },
                { date: '08-23', name: 'bmnm' },

            ]
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('打卡成功!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss">
@media screen and (min-device-width:800px) {
    .clockIn {
        width: 50vw;
        margin: 50px auto;
    }

    .duty {
        width: 50vw;
        margin: 100px auto;
    }
}


@media screen and (min-device-width:400px) and (max-device-width:799px) {
    .clockIn {
        width: 80vw;
        margin: 50px auto;
    }

    .duty {
        width: 80vw;
        margin: 100px auto;
    }
}

.duty p {
    font-size: 20px;
    font-weight: 700;
    margin: 10px;
    color: rgb(255, 212, 4);
}

.clockIn p {
    font-size: 20px;
    font-weight: 700;
    margin: 20px;
    color: rgb(255, 212, 4);
}
</style>