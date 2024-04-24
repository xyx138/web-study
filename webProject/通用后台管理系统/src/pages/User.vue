<template>
  <div class="users">
    <!-- 弹窗 -->

    <el-dialog title="提示" :visible.sync="dialogVisible" width="45%" :before-close="clearData">
      <!-- 表单信息 -->
      <el-form ref="form" :model="form" :inline="true" label-width="90px" label-position="right" size="medium"
        :rules="rules">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择活动区域">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birth">
          <el-col :span="11" style="width: 80%;">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址:" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearData">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 头部 -->
    <div class="users-header"
      style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <el-button type="primary" @click="showDialog">+ 新增</el-button>
        <el-button type="warning" @click="exportExcel" > 导出</el-button>
      </div>

      <el-form :model="searchForm" :inline="true" style="margin-top: 15px">
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="请输入要搜索的姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserInfo">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>



    <!-- 用户信息列表 -->
    <div class="table-list" style="height: 80vh ; background: #fff;">
      <el-table :data="tableData" style="width: 100%" height="85%" id="out-table">

        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>

        <el-table-column prop="sex" label="性别" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex ? '男' : '女' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="age" label="年龄" width="180">
        </el-table-column>

        <el-table-column prop="birth" label="出生日期" width="180">
        </el-table-column>

        <el-table-column prop="addr" label="家庭住址">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="background: #fff; float: right;">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage" :page-size="20">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, delUser, editUser } from '../api'
import FileSaver from 'file-saver';
import XLSX from "xlsx"

export default {
  data() {
    return {
      diglogType: 0,  // 0 - 新增  1 - 编辑
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        addr: "",
        birth: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          {
            min: 2,
            max: 5,
            message: "只能输入2-5个字",
            trigger: "blur"
          }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入生日', trigger: 'change' }
        ],
      },
      tableData: [

      ],
      total: 0,
      pageData: {
        page: 1,
        limit: 20
      },
      searchForm: {
        name: "",
      }
    };
  },
  // watch: {
  //   form: {
  //     handler: () => {
  //       console.log("form的数据改变了")
  //     },
  //     deep: true
  //   }
  // },

  methods: {
    // 导出excel
     //定义导出Excel表格事件
     exportExcel() {
      var xlsxParam = { raw: true };
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "用户列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },


    // 新增按钮
    showDialog() {
      this.diglogType = 0
      this.dialogVisible = !this.dialogVisible
    },

    // 关闭弹窗并清除表单内容
    clearData() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    submit() {
      this.$refs.form.validate((value) => {
        if (value) {
          if (this.diglogType == 0) {
            this.add()
          }
          else {
            this.edit()
          }
          this.clearData()
        }
        else {
          alert("数据添加有误,请重新填写")
        }
      })

    },
    cancel() {
      this.clearData()
    },
    handleEdit(index, row) {
      this.diglogType = 1;
      this.dialogVisible = !this.dialogVisible
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.delete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 页面切换
    handlePage(val) {
      this.pageData.page = val
      // console.log(this.pageIndex)
      this.getUserInfo()
    },

    // 封装获取用户数据的函数
    getUserInfo() {
      getUser({ params: {...this.searchForm  ,...this.pageData} }).then(({ data }) => {
        console.log("数据重新渲染")
        this.tableData = data.list,
          this.total = data.list ? data.count : 0
      })
    },

    // 增加用户
    add() {
      addUser(this.form).then(
        this.getUserInfo()
      )
    },

    // 删除用户
    delete(row) {
      delUser({ id: row.id }).then(
        this.getUserInfo(),
      )
    },

    // 编辑用户
    edit() {
      editUser(this.form).then(
        this.getUserInfo()
      )
    }
  },

  mounted() {
    this.getUserInfo()
  }
};
</script>

<style lang="less" scoped>
.users {
  text-align: left;
  line-height: 0;


}
</style>