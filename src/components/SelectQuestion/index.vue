<template>
  <div>
    <div class="box-start filter-container">
      <el-select v-model="query.type" placeholder="请选择试题类型">
        <el-option v-for="(item,index) in types" :label="item.title" :value="item.type" :key="index"/>
      </el-select>
      <el-input v-model="query.keyWord" class="Mr-16 Ml-20 rest" placeholder="关键字" prefix-icon="el-icon-search"/>
      <el-button type="primary" class="searchButton" style="background-color: #3D53E6;" @click="getList">搜索</el-button>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      stripe
      height="398"
      size="mini"
      style="min-width: 100%"
      @row-click="choseRow"
      @select="selectCheck"
      @select-all="selectCheckAll"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="isCheck"
        type="selection"
        align="center"
        width="55"/>
      <el-table-column
        label="题型"
        prop="type"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.type | convertQuestionTypeToTitle }}
        </template>
      </el-table-column>
      <el-table-column
        label="题干"
        prop="stem"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        width="130">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime,'{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <pagination
      v-show="query.total>0"
      :total="query.total"
      :page.sync="query.currentPage"
      :limit.sync="query.pageSize"
      @pagination="getList"
    />

    <div class="W100 scoreContainer">
      <div class="box-start Mb-20">
        <div>选择：</div>
        <div class="mousePointer">全选</div>
        <div>-</div>
        <div class="mousePointer">取消</div>
      </div>
      <div class="box-start Mb-20">
        <div class="Mr-20">当前已选中：{{ multipleSelectionAll.length }}道题目</div>
        <div>共计{{ allScore }}分</div>
      </div>
      <div class="box-start">
        <div class="itemCss">
          <div class="Mb-20">题型：</div>
          <div class="Mb-20">题数：</div>
          <div class="Mb-20 box-start" style="height:25px">分数：</div>
        </div>
        <div class="itemCss">
          <div class="Mb-20">单选题</div>
          <div class="Mb-20">{{ scoreObj.singleNum }}</div>
          <div class="Mb-20"><input v-model.number="scoreObj.singleScore" type="text" class="scoreInput"></div>
        </div>
        <div class="itemCss">
          <div class="Mb-20">多选题</div>
          <div class="Mb-20">{{ scoreObj.moreNum }}</div>
          <div class="Mb-20"><input v-model.number="scoreObj.moreScore" type="text" class="scoreInput"></div>
        </div>
        <div class="itemCss">
          <div class="Mb-20">判断题</div>
          <div class="Mb-20">{{ scoreObj.judgNum }}</div>
          <div class="Mb-20"><input v-model.number="scoreObj.judgScore" type="text" class="scoreInput"></div>
        </div>
        <div class="itemCss">
          <div class="Mb-20">填空题</div>
          <div class="Mb-20">{{ scoreObj.blankNum }}</div>
          <div class="Mb-20"><input v-model.number="scoreObj.blankScore" type="text" class="scoreInput"></div>
        </div>
        <div class="itemCss">
          <div class="Mb-20">问答题</div>
          <div class="Mb-20">{{ scoreObj.answerNum }}</div>
          <div class="Mb-20"><input v-model.number="scoreObj.answerScore" type="text" class="scoreInput"></div>
        </div>
      </div>
    </div>
    <div class="box-end">
      <el-button v-if="isCheck" type="primary" @click="sureSelect">确定</el-button>
    </div>
  </div>
</template>
<script>
  import Url from '@/api/url'
  import { listQuestion, listTypes } from '@/api/testPaper/question'

  export default {
    name: 'SelectQuestion',
    props: {
      selecttype: {
        type: String,
        default: null
      },
      dateStamp: {
        type: Number,
        default: null
      },
      selectData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        tableData: [],
        types: [],
        query: {
          type: '',
          keyWord: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        QusListQuery: {
          currentPage: 1,
          creator: null,
          search: null,
          pageSize: Url.pageSize,
          categoryId: null,
          total: null,
          searchText: null,
          type: null
        },
        selectType: 'radio',
        isShowChapter: false,
        isShowTopicLook: false,
        questionType: 1,
        topicDetail: null,
        multipleSelectionAll: [], // 所有选中的数据包含跨页数据
        selection: [], // 当前页选中的数据
        idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
        value: null,
        searchValue: null,
        searchValue2: null,
        scoreObj: {
          singleScore: 0,
          moreScore: 0,
          missMoreScore: 0,
          judgScore: 0,
          blankScore: 0,
          answerScore: 0,
          singleNum: 0,
          moreNum: 0,
          judgNum: 0,
          blankNum: 0,
          answerNum: 0
        }
      }
    },
    computed: {
      isCheck() {
        if (this.selecttype === 'radio') {
          return false
        } else {
          return true
        }
      },
      treeDataList() {
        return this.$store.getters.chapterType
      },
      allScore() {
        const temp = this.scoreObj.singleScore * this.scoreObj.singleNum +
          this.scoreObj.moreScore * this.scoreObj.moreNum +
          this.scoreObj.judgScore * this.scoreObj.judgNum +
          this.scoreObj.blankScore * this.scoreObj.blankNum +
          this.scoreObj.answerScore * this.scoreObj.answerNum
        return temp
      }
    },
    watch: {
      dateStamp(val) {
        this.multipleSelectionAll = []
        this.selection = []
        this.scoreObj = {
          singleScore: 0,
          moreScore: 0,
          judgScore: 0,
          blankScore: 0,
          answerScore: 0,
          singleNum: 0,
          moreNum: 0,
          judgNum: 0,
          blankNum: 0,
          answerNum: 0
        }
        this.getList()
      },
      multipleSelectionAll: {
        handler(val) {
          this.scoreObj.singleNum = 0
          this.scoreObj.moreNum = 0
          this.scoreObj.judgNum = 0
          this.scoreObj.blankNum = 0
          this.scoreObj.answerNum = 0
          for (let i = 0; i < val.length; i++) {
            if (val[i].type === 'choice') {
              this.scoreObj.singleNum = this.scoreObj.singleNum + 1
            } else if (val[i].type === 'choice_multi') {
              this.scoreObj.moreNum = this.scoreObj.moreNum + 1
            } else if (val[i].type === 'true_false') {
              this.scoreObj.judgNum = this.scoreObj.judgNum + 1
            } else if (val[i].type === 'fill_blank') {
              this.scoreObj.blankNum = this.scoreObj.blankNum + 1
            } else if (val[i].type === 'question') {
              this.scoreObj.answerNum = this.scoreObj.answerNum + 1
            }
          }
        },
        deep: true
      }
    },
    created() {
      this.getQuestionType()
      this.getList()
    },
    methods: {
      resetFilter() {
        const that = this
        that.QusListQuery = {
          currentPage: 1,
          creator: null,
          search: null,
          pageSize: Url.pageSize,
          categoryId: null,
          total: null,
          searchText: null,
          type: null
        }
      },
      getQuestionType() {
        listTypes().then(response => {
          this.types = response.data
        }).catch(function() {
        })
      },
      getList() {
        const params = {
          'type': this.query.type,
          'keyword': this.query.keyWord,
          'pNum': this.query.currentPage,
          'pSize': this.query.pageSize
        }
        listQuestion(params).then(response => {
          const data = response.data
          this.query.currentPage = data.current
          this.query.total = data.total
          this.tableData = data.records
        })
      },
      handleFilter() {
        this.QusListQuery.currentPage = 1
        this.getList()
      },
      choseRow(row, event, column) {
        if (this.isCheck === true) {
          return
        }
        console.log(row)
        console.log(event)
        console.log(column)
        this.$emit('giveTopic', row)
      },
      sureSelect() {
        if (this.scoreObj.singleNum !== 0) {
          if (this.scoreObj.singleScore === 0 || !this.scoreObj.singleScore) {
            this.$message('请将分数填写完整')
            return
          }
        }
        if (this.scoreObj.moreNum !== 0) {
          if (this.scoreObj.moreScore === 0 || !this.scoreObj.moreScore) {
            this.$message('请将分数填写完整')
            return
          }
        }
        if (this.scoreObj.judgNum !== 0) {
          if (this.scoreObj.judgScore === 0 || !this.scoreObj.judgScore) {
            this.$message('请将分数填写完整')
            return
          }
        }
        if (this.scoreObj.blankNum !== 0) {
          if (this.scoreObj.blankScore === 0 || !this.scoreObj.blankScore) {
            this.$message('请将分数填写完整')
            return
          }
        }
        if (this.scoreObj.answerNum !== 0) {
          if (this.scoreObj.answerScore === 0 || !this.scoreObj.answerScore) {
            this.$message('请将分数填写完整')
            return
          }
        }
        this.getAllSelectionData()
        const tempObj = {
          multipleSelectionAll: this.$copy(this.multipleSelectionAll),
          scoreObj: this.scoreObj
        }
        this.$emit('giveTopic', tempObj)
      },
      selectCheck(selection, row) {
        this.selection = selection
        this.getAllSelectionData()
        console.log(selection, row)
      },
      showChapter() {
        this.isShowChapter = true
      },
      giveChapter(data) {
        this.isShowChapter = false
        this.QusListQuery.chapterId = data.id
        this.QusListQuery.chapterName = data.name
        console.log(data)
      },
      selectCheckAll(selection) {
        this.selection = selection
        this.getAllSelectionData()
      },
      // 记忆多选方法
      // 设置选中的方法
      setSelectRow() {
        if (this.selecttype === 'radio') {
          return
        }
        if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
          return
        }
        // 标识当前行的唯一键的名称
        const idKey = this.idKey
        const selectAllIds = []
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey])
        })
        this.$refs.table.clearSelection()
        for (var i = 0; i < this.tableData.length; i++) {
          if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
            // 设置选中，记住table组件需要使用ref="table"
            this.$refs.table.toggleRowSelection(this.tableData[i], true)
          }
        }
      },
      // 记忆选择核心方法
      changePageCoreRecordData() {
        // 标识当前行的唯一键的名称
        if (this.selecttype === 'radio') {
          return
        }
        const idKey = this.idKey
        const that = this
        // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
        if (this.multipleSelectionAll.length <= 0) {
          this.multipleSelectionAll = this.selection
          return
        }
        // 总选择里面的key集合
        const selectAllIds = []
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey])
        })
        const selectIds = []
        // 获取当前页选中的id
        this.selection.forEach(row => {
          selectIds.push(row[idKey])
          // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
          if (selectAllIds.indexOf(row[idKey]) < 0) {
            that.multipleSelectionAll.push(row)
          }
        })
        const noSelectIds = []
        // 得到当前页没有选中的id
        this.tableData.forEach(row => {
          if (selectIds.indexOf(row[idKey]) < 0) {
            noSelectIds.push(row[idKey])
          }
        })
        noSelectIds.forEach(id => {
          if (selectAllIds.indexOf(id) >= 0) {
            for (let i = 0; i < that.multipleSelectionAll.length; i++) {
              if (that.multipleSelectionAll[i][idKey] === id) {
                // 如果总选择中有未被选中的，那么就删除这条
                that.multipleSelectionAll.splice(i, 1)
                break
              }
            }
          }
        })
      },
      handleCurrentChange(value) {
        // 改变页的时候调用一次
        this.changePageCoreRecordData()
        this.QusListQuery.currentPage = value
        this.getList()
      },
      handleSizesChange(value) {
        // 改变页的时候调用一次
        this.changePageCoreRecordData()
        this.QusListQuery.pageSize = value
        this.getList()
      },
      handleSelectionChange(selection) {
        this.selection = selection
        this.getAllSelectionData()
      },
      // 得到选中的所有数据
      getAllSelectionData() {
        // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
        this.changePageCoreRecordData()
        console.log(this.multipleSelectionAll)
      }
    }
  }
</script>
<style scoped>
  .itemCss {
    width: 65px;
  }

  .scoreInput {
    width: 40px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #dadada;
    padding: 5px 10px
  }

  .scoreInput:focus {
    outline: none
  }

  .scoreContainer {
    background-color: antiquewhite;
    padding: 10px;
    margin-bottom: 20px;
    margin-top: 10px
  }
</style>

