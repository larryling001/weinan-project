<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="身份证" prop="cardCode">
        <el-input
          v-model="queryParams.cardCode"
          placeholder="请输入身份证"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="区县" prop="county">
        <el-input
          v-model="queryParams.county"
          placeholder="请输入区县"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="乡镇" prop="township">
        <el-input
          v-model="queryParams.township"
          placeholder="请输入乡镇"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="村民委员会" prop="villageCommittee">
        <el-input
          v-model="queryParams.villageCommittee"
          placeholder="请输入村民委员会"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['data:input:index']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:role:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport('PK')"
          v-hasPermi="['data:input:index']"
        >导入贫困户</el-button>
      </el-col>
       <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport('WG')"
          v-hasPermi="['data:input:index']"
        >导入危改户</el-button>
      </el-col>
       <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport('YB')"
          v-hasPermi="['data:input:index']"
        >异地搬迁户</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="户主姓名" prop="userName" align="center" width="120" />
      <el-table-column label="居民类型" prop="dataReserveTh" align="center" width="150" />
      <el-table-column label="市" prop="city" align="center" width="150" />
      <el-table-column label="区/县" prop="county" align="center" width="150" />
      <el-table-column label="乡镇" prop="township" align="center" width="150"></el-table-column>
      <el-table-column label="村委会" prop="villageCommittee" align="center" width="150"></el-table-column>
      <el-table-column label="户主身份证" prop="cardCode" align="center" width="165"></el-table-column>
      <!-- <el-table-column label="上传人" prop="createBy" align="center" width="100"></el-table-column> -->
      <el-table-column label="上传时间" prop="createTime" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二维码" align="center" width="165">
         <template slot-scope="scope">
          <vue-qr :text="`http://com.dl.house.vaiwan.com/h5/?id=${scope.row.id}#/pages/index/index`" :margin="0" colorDark="#000000"  :size="100"></vue-qr>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['data:input:index']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']"
          >删除</el-button> -->
           <el-button
            size="mini"
            type="text"
            icon="el-icon-picture-outline"
            @click="synchroImage(scope.row.id)"
            v-hasPermi="['data:input:index']"
          >同步图片</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-drawer
      :title="title"
      :visible.sync="open"
      size="45%"
      custom-class="edit-drawer"
      :before-close="handleClose"
    >
      <div class="add-edit">
        <div class="f-title">
          <div class="blocks"></div>基本信息
        </div>
        <div class="base-info">
          <el-form label-width="80px">
            <el-row>
              <el-col>
                <el-form-item label="户主照片:">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseUrl+'/common/upload'"
                    :show-file-list="false"
                    :headers="uploadHeaders"
                    :on-success="handleAvatarSuccess"
                  >
                    <img
                      v-if="submitForm.headPortrait"
                      :src="submitForm.headPortrait"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="户主姓名:">
                  <el-input v-model="submitForm.userName" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证:">
                  <el-input v-model="submitForm.cardCode" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="市:">
                  <el-input v-model="submitForm.city" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区/县:">
                  <el-input v-model="submitForm.county" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="乡镇:">
                  <el-input v-model="submitForm.township" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="村委会:">
                  <el-input v-model="submitForm.villageCommittee" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="给予政策:">
                  <el-input
                    v-model="submitForm.dataReserveO"
                    type="textarea"
                    :rows="4"
                    style="width:710px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="户主类型:">
                  <el-checkbox-group v-model="checkedType" @change="handleUserTypeChange">
                    <el-checkbox
                      v-for="(item,index) in userType"
                      :key="index"
                      :label="item"
                    >{{item}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="more-info">
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleTabsClick"
            v-if="checkedType.length"
          >
            <el-tab-pane
              label="贫困户"
              name="贫困户"
              v-if="checkedType.includes('贫困户')"
              style="margin-left:10px"
            >
                    
              <el-form label-width="85px" v-if="submitForm.pKpersExtendList.length">
                <el-form-item label="贫困属性:">
                  <el-input style="width:300px" v-model="submitForm.pKpersExtendList[0].pAttribute"></el-input>
                </el-form-item>
                <el-form-item label="贫困原因:">
                  <el-input style="width:300px" v-model="submitForm.pKpersExtendList[0].pReason"></el-input>
                </el-form-item>
                <el-form-item label="贫困年度:">
                  <el-input style="width:300px" v-model="submitForm.pKpersExtendList[0].pTime"></el-input>
                </el-form-item>
                <el-form-item label="贫困状态:">
                  <el-input style="width:300px"  v-model="submitForm.pKpersExtendList[0].pStatus"></el-input>
                </el-form-item>
                <el-form-item label="其他说明:">
                  <el-input style="width:300px" v-model="submitForm.pKpersExtendList[0].pRemarks"></el-input>
                </el-form-item>
                <el-form-item label="住房:">
                 <el-upload
                    :action="baseUrl+'/common/upload'"
                    list-type="picture-card"
                    :headers="uploadHeaders"
                    :file-list="submitForm.pKpersExtendList[0].picZQ"
                    :on-success="handlePKZQSuccess"
                    :on-remove="handlePKZQDelete"
                    :on-preview="handleWGZQPreview"
                    >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <!-- <el-form-item label="住房(后):">
                   <el-upload
                    :action="baseUrl+'/common/upload'"
                    list-type="picture-card"
                    :headers="uploadHeaders"
                    :file-list="submitForm.pKpersExtendList[0].picZH"
                    :on-success="handlePKZHSuccess"
                    :on-remove="handlePKZHDelete">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item> -->
                <el-form-item label="厨房:">
                  <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.pKpersExtendList[0].picCQ"
                      :on-success="handlePKCQSuccess"
                      :on-remove="handlePKCQDelete"
                      :on-preview="handleWGZQPreview"
                      >
                      <i class="el-icon-plus"></i>
                      </el-upload>
                </el-form-item>
                <!-- <el-form-item label="厨房(后):">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.pKpersExtendList[0].picCH"
                      :on-success="handlePKCHSuccess"
                      :on-remove="handlePKCHDelete">
                      <i class="el-icon-plus"></i>
                      </el-upload>
                </el-form-item> -->
                <el-form-item label="卫生间:">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.pKpersExtendList[0].picWQ"
                      :on-success="handlePKWQSuccess"
                      :on-remove="handlePKWQDelete"
                      :on-preview="handleWGZQPreview"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="卫生间(后):">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.pKpersExtendList[0].picWH"
                      :on-success="handlePKWHSuccess"
                      :on-remove="handlePKWHDelete">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              label="危改户"
              name="危改户"
              v-if="checkedType.includes('危改户')"
              style="margin-left:10px"
            >
              <el-form label-width="115px"  v-if="submitForm.wGpersExtendList.length">
                <el-form-item label="改造原因:">
                  <el-input style="width:300px" v-model="submitForm.wGpersExtendList[0].gReason"></el-input>
                </el-form-item>
                <el-form-item label="列入计划的年度:">
                  <el-input style="width:300px" v-model="submitForm.wGpersExtendList[0].gPlanTime"></el-input>
                </el-form-item>
                <el-form-item label="资金补助类型:">
                  <el-input style="width:300px" v-model="submitForm.wGpersExtendList[0].gCapitalType"></el-input>
                </el-form-item>
                <el-form-item label="改造状态:">
                  <el-input style="width:300px" v-model="submitForm.wGpersExtendList[0].gTransStatus"></el-input>
                </el-form-item>
                <el-form-item label="其他说明:">
                  <el-input style="width:300px" v-model="submitForm.wGpersExtendList[0].extendReserveTw"></el-input>
                </el-form-item>
                <el-form-item label="住房:">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.wGpersExtendList[0].picZQ"
                      :on-success="handleWGZQSuccess"
                      :on-remove="handleWGZQDelete"
                      :on-preview="handleWGZQPreview"
                      ref="avatarUploader"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="住房(后):">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.wGpersExtendList[0].picZH"
                      :on-success="handleWGZHSuccess"
                      :on-remove="handleWGZHDelete">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="厨房:">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.wGpersExtendList[0].picCQ"
                      :on-success="handleWGCQSuccess"
                      :on-remove="handleWGCQDelete"
                      :on-preview="handleWGZQPreview"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="厨房(后):">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.wGpersExtendList[0].picCH"
                      :on-success="handleWGCHSuccess"
                      :on-remove="handleWGCHDelete">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="卫生间:">
                  <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.wGpersExtendList[0].picWQ"
                      :on-success="handleWGWQSuccess"
                      :on-remove="handleWGWQDelete"
                      :on-preview="handleWGZQPreview"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="卫生间:">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.wGpersExtendList[0].picWH"
                      :on-success="handleWGWHSuccess"
                      :on-remove="handleWGWHDelete">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              label="异地搬迁户"
              name="异地搬迁户"
              v-if="checkedType.includes('异地搬迁户')"
              style="margin-left:10px"
            >
              <el-form label-width="80px"  v-if="submitForm.yBpersExtendList.length">
                <el-form-item label="说明:">
                  <el-input style="width:300px" v-model="submitForm.yBpersExtendList[0].bSRemarks"></el-input>
                </el-form-item>
                <el-form-item label="搬迁">
                   <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.yBpersExtendList[0].picBQ"
                      :on-success="handleBQQSuccess"
                      :on-remove="handleBQQDelete"
                      :on-preview="handleWGZQPreview"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="搬迁后">
                  <el-upload
                      :action="baseUrl+'/common/upload'"
                      list-type="picture-card"
                      :headers="uploadHeaders"
                      :file-list="submitForm.yBpersExtendList[0].picBH"
                      :on-success="handleBQHSuccess"
                      :on-remove="handleBQHDelete">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
       <div class="drawer-footer">
        <el-button @click="handleClose" class="btn">取 消</el-button>
        <el-button type="primary" class="btn" @click="handlesubmitForm" :loading="loading">提交</el-button>
      </div>
    </el-drawer>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?type=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <!-- <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link> -->
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
       <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getPeopleList,addPeople,selectPeople ,updataPoeple,synchroImage} from "@/api/people";
import { getToken } from "@/utils/auth";
import VueQr from 'vue-qr'
export default {
  name: "Role",
  components:{
    VueQr
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 放大
      dialogVisible:false,
      // 放大图片操作
      dialogImageUrl:"",
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        {
          value: "3",
          label: "本部门数据权限"
        },
        {
          value: "4",
          label: "本部门及以下数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName:'',
        cardCode:'',
        city:'',
        county:'',
        township:'',
        villageCommittee:''
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {},
      //add数据
      submitForm: {},
      //互助类型
      userType: ["贫困户", "危改户", "异地搬迁户"],
      activeName: "",
      checkedType: [],
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/importWGPersonnelInfo"
      },
      AvatarImageUrl: "",
      uploadHeaders: {
        Authorization: "Bearer " + getToken()
      },
      choseUserType:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 放大操作
    handleWGZQPreview(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      getPeopleList(this.queryParams)
        .then(res => {
          if (res.code == 200) {
            this.roleList = res.rows;
            this.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.tree != undefined) {
        this.$refs.tree.setCheckedKeys([]);
      }
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加角色";
      this.submitForm = {
        userName: "",
        headPortrait: "",
        cardCode: "",
        city: "",
        county: "",
        villageCommittee: "",
        township: "",
        dataReserveO: "",
        pKpersExtendList: [],
        wGpersExtendList: [],
        yBpersExtendList: []
      };
    },
    handleTabsClick() {},
    handleClose(type) {
      this.open=false
      this.submitForm = {
        userName: "",
        headPortrait: "",
        cardCode: "",
        city: "",
        county: "",
        villageCommittee: "",
        township: "",
        dataReserveO: "",
        pKpersExtendList: [],
        wGpersExtendList: [],
        yBpersExtendList: []
      };
      this.checkedType=[]
      this.choseUserType=[]
      this.activeName=''
      if(type){
        this.getList()
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.title=="修改角色"
      selectPeople(row.id).then(res=>{
        if(res.data.pKpersExtendList.length){
            res.data.pKpersExtendList[0].picZQ=[]
            res.data.pKpersExtendList[0].picZH=[]
            res.data.pKpersExtendList[0].picCQ=[]
            res.data.pKpersExtendList[0].picCH=[]
            res.data.pKpersExtendList[0].picWQ=[]
            res.data.pKpersExtendList[0].picWH=[]
          res.data.pKpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="PK-ZF-01"){
               res.data.pKpersExtendList[0].picZQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.pKpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="PK-ZF-02"){
               res.data.pKpersExtendList[0].picZH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.pKpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="PK-CF-01"){
               res.data.pKpersExtendList[0].picCQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.pKpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="PK-CF-02"){
               res.data.pKpersExtendList[0].picCH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.pKpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="PK-WS-01"){
               res.data.pKpersExtendList[0].picWQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.pKpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="PK-WS-02"){
               res.data.pKpersExtendList[0].picWH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
        }
        if(res.data.wGpersExtendList.length){
            res.data.wGpersExtendList[0].picZQ=[]
            res.data.wGpersExtendList[0].picZH=[]
            res.data.wGpersExtendList[0].picCQ=[]
            res.data.wGpersExtendList[0].picCH=[]
            res.data.wGpersExtendList[0].picWQ=[]
            res.data.wGpersExtendList[0].picWH=[]
            res.data.wGpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="WG-ZF-01"){
               res.data.wGpersExtendList[0].picZQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.wGpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="WG-ZF-02"){
               res.data.wGpersExtendList[0].picZH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.wGpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="WG-CF-01"){
               res.data.wGpersExtendList[0].picCQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.wGpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="WG-CF-02"){
               res.data.wGpersExtendList[0].picCH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.wGpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="WG-WS-01"){
               res.data.wGpersExtendList[0].picWQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
          res.data.wGpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="WG-WS-02"){
               res.data.wGpersExtendList[0].picWH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
        }
        if(res.data.yBpersExtendList.length){
          res.data.yBpersExtendList[0].picBQ=[]
          res.data.yBpersExtendList[0].picBH=[]
           res.data.yBpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="YB—01"){
              res.data.yBpersExtendList[0].picBQ.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
           res.data.yBpersExtendList[0].persMaterialList.map(item=>{
            if(item.type=="YB-02"){
              res.data.yBpersExtendList[0].picBH.push({name:item.fileName,url:this.baseUrl+item.url,defUrl:item.url})
            }
          })
        }
        if(res.data.poor){
          this.checkedType.push('贫困户')
          this.choseUserType.push('贫困户')
        }
        if(res.data.move){
          this.checkedType.push('异地搬迁户')
          this.choseUserType.push('异地搬迁户')
        }
        if(res.data.criticalReform){
          this.checkedType.push('危改户')
          this.choseUserType.push('危改户')
        }
        this.submitForm=res.data
        this.activeName=this.checkedType.length&&this.checkedType[0]
        this.open=true
      })
    },
    /** 提交按钮 */
    handlesubmitForm() {
       if(this.submitForm.pKpersExtendList.length){
            this.submitForm.pKpersExtendList[0].persMaterialList =[]
           this.submitForm.pKpersExtendList[0].picZQ.length&&this.submitForm.pKpersExtendList[0].picZQ.map(sitem=>{
              this.submitForm.pKpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'PK-ZF-01'})
            })
           this.submitForm.pKpersExtendList[0].picZH.length&&this.submitForm.pKpersExtendList[0].picZH.map(sitem=>{
              this.submitForm.pKpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'PK-ZF-02'})
          })
          this.submitForm.pKpersExtendList[0].picCQ.length&&this.submitForm.pKpersExtendList[0].picCQ.map(sitem=>{
              this.submitForm.pKpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'PK-CF-01'})
          })
           this.submitForm.pKpersExtendList[0].picCH.length&&this.submitForm.pKpersExtendList[0].picCH.map(sitem=>{
              this.submitForm.pKpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'PK-CF-02'})
          })
          this.submitForm.pKpersExtendList[0].picWQ.length&&this.submitForm.pKpersExtendList[0].picWQ.map(sitem=>{
              this.submitForm.pKpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'PK-WS-01'})
          })
          this.submitForm.pKpersExtendList[0].picWH.length&&this.submitForm.pKpersExtendList[0].picWH.map(sitem=>{
              this.submitForm.pKpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'PK-WS-02'})
          })
        }
        if(this.submitForm.wGpersExtendList.length){
          this.submitForm.wGpersExtendList[0].persMaterialList =[]
          this.submitForm.wGpersExtendList[0].picZQ.length&&this.submitForm.wGpersExtendList[0].picZQ.map(sitem=>{
              this.submitForm.wGpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'WG-ZF-01'})
          })
           this.submitForm.wGpersExtendList[0].picZH.length&&this.submitForm.wGpersExtendList[0].picZH.map(sitem=>{
              this.submitForm.wGpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'WG-ZF-02'})
          })
          this.submitForm.wGpersExtendList[0].picCQ.length&&this.submitForm.wGpersExtendList[0].picCQ.map(sitem=>{
               this.submitForm.wGpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'WG-CF-01'})
          })
           this.submitForm.wGpersExtendList[0].picCH.length&&this.submitForm.wGpersExtendList[0].picCH.map(sitem=>{
               this.submitForm.wGpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'WG-CF-02'})
          })
          this.submitForm.wGpersExtendList[0].picWQ.length&&this.submitForm.wGpersExtendList[0].picWQ.map(sitem=>{
               this.submitForm.wGpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'WG-WS-01'})
          })
          this.submitForm.wGpersExtendList[0].picWH.length&&this.submitForm.wGpersExtendList[0].picWH.map(sitem=>{
               this.submitForm.wGpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'WG-WS-02'})
          })
        }
        if(this.submitForm.yBpersExtendList.length){
          this.submitForm.yBpersExtendList[0].persMaterialList =[]
           this.submitForm.yBpersExtendList[0].picBQ.length&&this.submitForm.yBpersExtendList[0].picBQ.map(sitem=>{
             this.submitForm.yBpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'YB-01'})
          })
          this.submitForm.yBpersExtendList[0].picBH.length&&this.submitForm.yBpersExtendList[0].picBH.map(sitem=>{
              this.submitForm.yBpersExtendList[0].persMaterialList.push({fileName:sitem.name,url:sitem.defUrl,type:'YB-02'})
          })
        }
        this.submitForm.poor=this.choseUserType.includes('贫困户')
        this.submitForm.criticalReform=this.choseUserType.includes('危改户')
        this.submitForm.move=this.choseUserType.includes('异地搬迁户')
        
      if(this.title=="添加角色"){
        addPeople(this.submitForm).then(res=>{
         if(res.code==200){
           this.msgSuccess("添加成功");
           this.handleClose(1)
         }else{
           this.msgError(res.msg);
         }
        })
      }else{
        updataPoeple(this.submitForm).then(res=>{
           if(res.code==200){
           this.msgSuccess("修改成功");
           this.handleClose(1)
          }else{
            this.msgError(res.msg);
          }
        })
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
        this.$confirm('确认删除本条数据?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return synchroImage(row.id);
        }).then(() => {
          this.msgSuccess("删除");
        }).catch(function() {});
    },
    /** 导入按钮操作 */
    handleImport(type) {
      this.upload.title = type=="WG"?'危改户导入':type=="PK"?'贫困户导入':"异地搬迁户导入";
      this.upload.updateSupport=type
      this.upload.open = true;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 导出按钮操作 */
    handleExport() {},
    //用户类型选择
    handleUserTypeChange(e) {
      this.choseUserType=e
      this.activeName = e[0];
      if (e.includes("贫困户") && !this.submitForm.pKpersExtendList.length) {
        this.submitForm.pKpersExtendList.push({
          dataType:"PK",
          pAttribute: "", //贫困属性
          pReason: "", //贫困原因
          pTime: "", //贫困年度
          pStatus: "", //贫困状态
          pRemarks: "", //其他说明
          persMaterialList: [], //图片列表
          picZQ:[],//住房前
          picZH:[],//住房后
          picCQ:[],//厨房前
          picCH:[],//厨房后
          picWQ:[],//卫生前
          picWH:[],//卫生后
        });
      }
      if (!e.includes("贫困户") && this.submitForm.pKpersExtendList.length) {
        this.submitForm.pKpersExtendList = [];
      }
      if (e.includes("危改户") && !this.submitForm.wGpersExtendList.length) {
        this.submitForm.wGpersExtendList.push({
          dataType:"WG",
          gReason: "", //改造原因:
          gPlanTime: "", //列入计划的年度:
          gCapitalType: "", //资金补助类型:
          gTransStatus: "", //改造状态:
          extendReserveTw: "", //其他说明:
          persMaterialList: [], //图片列表
          picZQ:[],//住房前
          picZH:[],//住房后
          picCQ:[],//厨房前
          picCH:[],//厨房后
          picWQ:[],//卫生前
          picWH:[],//卫生后
        });
      }
      if (!e.includes("危改户") && this.submitForm.wGpersExtendList.length) {
        this.submitForm.wGpersExtendList = [];
      }
      if (
        e.includes("异地搬迁户") &&
        !this.submitForm.yBpersExtendList.length
      ) {
        this.submitForm.yBpersExtendList.push({
          dataType:"YB",
          bSRemarks: "", //说明:
          persMaterialList: [], //图片列表
          picBQ:[],//搬迁前
          picBH:[],//搬迁后
        });
      }
      if (
        !e.includes("异地搬迁户") &&
        this.submitForm.yBpersExtendList.length
      ) {
        this.submitForm.yBpersExtendList = [];
      }
    },
    //头像上传
    handleAvatarSuccess(response) {
      this.submitForm.headPortrait = response.url;
    },
    //同步图片
    synchroImage(id){
        this.$confirm('确认同步图片?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return synchroImage(id);
        }).then(() => {
          this.msgSuccess("同步成功");
        }).catch(function() {});
    },
    /*
    *上传的
    */
    //贫困-住房前上传
    handlePKZQSuccess(response) {
      this.submitForm.pKpersExtendList[0].picZQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },

    //贫困-住房后上传
    // handlePKZHSuccess(response) {
    //    this.submitForm.pKpersExtendList[0].picZH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
    //贫困-厨房前上传
    handlePKCQSuccess(response) {
       this.submitForm.pKpersExtendList[0].picCQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },
    //贫困-厨房后上传
    // handlePKCHSuccess(response) {
    //    this.submitForm.pKpersExtendList[0].picCH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
    //贫困-卫生间前上传
    handlePKWQSuccess(response) {
       this.submitForm.pKpersExtendList[0].picWQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },
    //贫困-卫生间后上传
    // handlePKWHSuccess(response) {
    //    this.submitForm.pKpersExtendList[0].picWH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
    //危改-住房前上传
    handleWGZQSuccess(response) {
        this.submitForm.wGpersExtendList[0].picZQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },
    //危改-住房后上传
    // handleWGZHSuccess(response) {
    //    this.submitForm.wGpersExtendList[0].picZH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
    //危改-厨房前上传
    handleWGCQSuccess(response) {
        this.submitForm.wGpersExtendList[0].picCQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },
    //危改-厨房后上传
    // handleWGCHSuccess(response) {
    //    this.submitForm.wGpersExtendList[0].picCH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
    //危改-卫生间前上传
    handleWGWQSuccess(response) {
       this.submitForm.wGpersExtendList[0].picWQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },
    //危改-卫生间后上传
    // handleWGWHSuccess(response) {
    //     this.submitForm.wGpersExtendList[0].picWH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
    //搬迁-前
    handleBQQSuccess(response) {
        this.submitForm.yBpersExtendList[0].picBQ.push({
        name:response.fileName,
        url:response.url,
        defUrl:response.fileName
      })
    },
    //搬迁-后
    // handleBQHSuccess(response) {
    //     this.submitForm.yBpersExtendList[0].picBH.push({
    //     name:response.fileName,
    //     url:response.url,
    //     defUrl:response.fileName
    //   })
    // },
     /*
    *删除的
    */
   //贫困-住房前上传
    handlePKZQDelete(file, fileList) {
      let i =null
      this.submitForm.pKpersExtendList[0].picZQ.map((item,index)=>{
        if(item.name==file.name){
          i=index
        }
      })
      if(i!=null){
        this.submitForm.pKpersExtendList[0].picZQ.splice(i,1)
      }
    },
    //贫困-住房后上传
    // handlePKZHDelete(file, fileList) {
    //    let i =null
    //   this.submitForm.pKpersExtendList[0].picZH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.pKpersExtendList[0].picZH.splice(i,1)
    //   }
    // },
    //贫困-厨房前上传
    handlePKCQDelete(file, fileList) {
      console.log( this.submitForm.pKpersExtendList)
        let i =null
      this.submitForm.pKpersExtendList[0].picCQ.map((item,index)=>{
        // console.log(item.name)
        // console.log(file.name)
        if(item.name==file.name){
           i=index
           
        }
      })
      if(i!=null){
        this.submitForm.pKpersExtendList[0].picCQ.splice(i,1)
      }
    },
    //贫困-厨房后上传
    // handlePKCHDelete(file, fileList) {
    //    let i =null
    //   this.submitForm.pKpersExtendList[0].picCH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.pKpersExtendList[0].picCH.splice(i,1)
    //   }
    // },
    //贫困-卫生间前上传
    handlePKWQDelete(file, fileList) {
       let i =null
      this.submitForm.pKpersExtendList[0].picWQ.map((item,index)=>{
        if(item.name==file.name){
          i=index
        }
      })
      if(i!=null){
        this.submitForm.pKpersExtendList[0].picWQ.splice(i,1)
      }
    },
    //贫困-卫生间后上传
    // handlePKWHDelete(file, fileList) {
    //    let i =null
    //   this.submitForm.pKpersExtendList[0].picWH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.pKpersExtendList[0].picWH.splice(i,1)
    //   }
    // },
    //危改-住房前上传
    handleWGZQDelete(file, fileList) {
       let i =null
      this.submitForm.wGpersExtendList[0].picZQ.map((item,index)=>{
        if(item.name==file.name){
          i=index
        }
      })
      if(i!=null){
        this.submitForm.wGpersExtendList[0].picZQ.splice(i,1)
      }
    },
    //危改-住房后上传
    // handleWGZHDelete(file, fileList) {
    //    let i =null
    //   this.submitForm.wGpersExtendList[0].picZH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.wGpersExtendList[0].picZH.splice(i,1)
    //   }
    // },
    //危改-厨房前上传
    handleWGCQDelete(file, fileList) {
       let i =null
      //  console.log(this.submitForm)
      this.submitForm.wGpersExtendList[0].picCQ.map((item,index)=>{
        if(item.name==file.name){
          i=index
        }
      })
      if(i!=null){
        this.submitForm.wGpersExtendList[0].picCQ.splice(i,1)
      }
    },
    //危改-厨房后上传
    // handleWGCHDelete(file, fileList) {
    //    let i =null
    //   this.submitForm.wGpersExtendList[0].picCH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.wGpersExtendList[0].picCH.splice(i,1)
    //   }
    // },
    //危改-卫生间前上传
    handleWGWQDelete(file, fileList) {
       let i =null
      this.submitForm.wGpersExtendList[0].picWQ.map((item,index)=>{
        if(item.name==file.name){
          i=index
        }
      })
      if(i!=null){
        this.submitForm.wGpersExtendList[0].picWQ.splice(i,1)
      }
    },
    //危改-卫生间后上传
    // handleWGWHDelete(file, fileList) {
    //    let i =null
    //   this.submitForm.wGpersExtendList[0].picWH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.wGpersExtendList[0].picWH.splice(i,1)
    //   }
    // },
    //搬迁-前
    handleBQQDelete(file, fileList) {
      let i =null
      this.submitForm.yBpersExtendList[0].picBQ.map((item,index)=>{
        if(item.name==file.name){
          i=index
        }
      })
      if(i!=null){
        this.submitForm.yBpersExtendList[0].picBQ.splice(i,1)
      }
    },
    //搬迁-后
    // handleBQHDelete(file, fileList) {
    //   let i =null
    //   this.submitForm.yBpersExtendList[0].picBH.map((item,index)=>{
    //     if(item.name==file.name){
    //       i=index
    //     }
    //   })
    //   if(i!=null){
    //     this.submitForm.yBpersExtendList[0].picBH.splice(i,1)
    //   }
    // }
  }
};
</script>
<style >
.app-container>>>.el-upload{
  display: inline;
}
.add-edit {
  padding: 15px;
}
.f-title {
  display: flex;
  font-size: 18px;
  align-items: center;
}
.blocks {
  height: 15px;
  width: 5px;
  background-color: #1890ff;
  margin-right: 5px;
}
.base-info {
  margin-left: 10px;
  margin-top: 20px;
}
.edit-drawer .el-drawer__body {
  overflow: auto;
}
/* 头像上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
  .drawer-footer {
    width: 860px;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
   
  }
   .drawer-footer button {
      margin-left: 5px;
    }
</style>