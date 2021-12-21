<template>
  <div class="business">
    <div class="default-width cl-breadcrumb">
      <span>
        当前位置：
        <button type="button" class="el-button el-button--text">
          <span>账户资料</span></button
        >&gt;信息认证
      </span>
    </div>
    <div class="default-width cl-content-auth" v-if="status !== 'success'">
      <ul class="cl-tabs">
        <li :class="{ active: status === 'submiting' }">提交认证信息</li>
        <li :class="{ active: status === 'submited' }">等待系统审核</li>
        <li :class="{ active: status === 'success' }">完成</li>
      </ul>
      <template v-if="status === 'submiting'">
        <a-form
          id="components-form-demo-validate-other"
          :form="form"
          v-bind="formItemLayout"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-form-item label="认证类型" required>
            <a-radio-group v-model="customerType">
              <a-radio :value="1"> 企业认证 </a-radio>
              <a-radio :value="0"> 个人认证 </a-radio>
            </a-radio-group>
          </a-form-item>
          <div v-show="customerType === 1" v-if="certType1">
            <a-form-item label="营业执照">
              <a-upload
                ref="yyzzUpload"
                accept=".jpg, .jpeg, .png"
                name="img"
                class="avatar-uploader"
                :showUploadList="false"
                :beforeUpload="beforeUpload"
                @change="handleChange"
                :data="fileParams"
                :headers="headers"
                v-decorator="[
                  'upload',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                    rules: [{ required: true, message: '请上传营业执照图片' }]
                  }
                ]"
                :action="`${
                  dev ? '/apis' : ''
                }/front/customer/businessLicenseUpload`"
                list-type="picture"
              >
                <img
                  v-if="imageUrl"
                  :src="downloadDomain + imageUrl"
                  alt="avatar"
                />
                <div class="upload-button" v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <span class="ant-upload-text">点击上传营业执照图片</span>
                </div>
              </a-upload>
              <div class="ant-form-extra">
                营业执照上传后，以下内容可自动识别
              </div>
              <div class="file-format">
                <p>附件要求：</p>
                <p>
                  <span>*</span>格式要求：扫描件需要使用jpg,jpeg,png图片格式
                </p>
                <p><span>*</span>内容要求：上传营业执照正面</p>
                <p><span>*</span>大小要求：不得超过5M</p>
              </div>
            </a-form-item>
            <a-form-item label="公司名称">
              <a-input
                v-decorator="[
                  'companyName',
                  { rules: [{ required: true, message: '请输入公司名称' }] }
                ]"
              />
            </a-form-item>
            <a-form-item label="营业执照号">
              <a-input
                v-decorator="[
                  'socialCreditCode',
                  { rules: [{ required: true, message: '请输入营业执照' }] }
                ]"
              />
            </a-form-item>
            <a-form-item label="公司地址">
              <a-textarea
                v-decorator="[
                  'address',
                  { rules: [{ required: true, message: '请输入公司地址' }] }
                ]"
                :rows="2"
              />
            </a-form-item>
            <a-form-item label="法人名称">
              <a-input
                v-decorator="[
                  'legalPerson',
                  { rules: [{ required: true, message: '请输入法人名称' }] }
                ]"
              />
            </a-form-item>
            <a-form-item label="营业期限">
              <a-form-item
                class="timer-con"
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
              >
                <!-- <a-date-picker style="width: 100%"
                               v-decorator="['establishmentDate', { rules: [{ required: true, message: '请输入开始时间' }] }]"/> -->
                <a-input
                  placeholder="请输入开始时间"
                  style="width: 100%"
                  v-decorator="[
                    'establishmentDate',
                    { rules: [{ required: true, message: '请输入开始时间' }] }
                  ]"
                />
              </a-form-item>
              <span
                :style="{
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center'
                }"
              >
                -
              </span>
              <a-form-item
                class="timer-con"
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
              >
                <a-input
                  placeholder="请输入结束时间"
                  style="width: 100%"
                  v-decorator="[
                    'validityTerm',
                    { rules: [{ required: true, message: '请输入结束时间' }] }
                  ]"
                />
              </a-form-item>
            </a-form-item>
            <a-form-item label="经营范围">
              <a-textarea
                :autosize="{ minRows: 4 }"
                v-decorator="[
                  'businessScope',
                  { rules: [{ required: true, message: '请输入经营范围' }] }
                ]"
              />
            </a-form-item>
          </div>
          <div v-show="customerType === 0" v-if="certType0">
            <a-form-item label="身份证人像面">
              <a-upload
                accept=".jpg, .jpeg, .png"
                name="img"
                class="avatar-uploader"
                :showUploadList="false"
                :beforeUpload="
                  (info) => {
                    beforeUpload(info, 'front')
                  }
                "
                @change="
                  (info) => {
                    imageChange(info, setFront, 'front')
                  }
                "
                :data="fileParams"
                :headers="headers"
                v-decorator="[
                  'idCardFrontPath',
                  {
                    valuePropName: 'idCardFrontPath',
                    getValueFromEvent: normFile,
                    rules: [{ required: true, message: '请上传身份证人像面' }]
                  }
                ]"
                :action="`${dev ? '/apis' : ''}/front/customer/idCardUpload`"
                list-type="picture"
              >
                <img
                  v-if="imageUrl2"
                  :src="downloadDomain + imageUrl2"
                  alt="avatar"
                />
                <div class="upload-button" v-else>
                  <a-icon :type="loading1 ? 'loading1' : 'plus'" />
                  <span class="ant-upload-text">点击上传身份证人像面</span>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="身份证国徽面">
              <a-upload
                accept=".jpg, .jpeg, .png"
                name="img"
                class="avatar-uploader"
                :showUploadList="false"
                :beforeUpload="
                  (info) => {
                    beforeUpload(info, 'back')
                  }
                "
                @change="
                  (info) => {
                    imageChange(info, setBack, 'back')
                  }
                "
                :data="fileParams"
                :headers="headers"
                v-decorator="[
                  'idCardBackPath',
                  {
                    valuePropName: 'idCardBackPath',
                    getValueFromEvent: normFile,
                    rules: [{ required: true, message: '请上传身份证国徽面' }]
                  }
                ]"
                :action="`${dev ? '/apis' : ''}/front/customer/idCardUpload`"
                list-type="picture"
              >
                <img
                  v-if="imageUrl3"
                  :src="downloadDomain + imageUrl3"
                  alt="avatar"
                />
                <div class="upload-button" v-else>
                  <a-icon :type="loading2 ? 'loading2' : 'plus'" />
                  <span class="ant-upload-text">点击上传身份证国徽面</span>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="身份证号">
              <a-input
                v-decorator="[
                  'idCardNumber',
                  { rules: [{ required: true, message: '请输入身份证号' }] }
                ]"
              />
            </a-form-item>
            <a-form-item label="姓名">
              <a-input
                v-decorator="[
                  'idCardName',
                  { rules: [{ required: true, message: '请输入姓名' }] }
                ]"
              />
            </a-form-item>
            <a-form-item label="住址">
              <a-input
                v-decorator="[
                  'idCardAddress',
                  { rules: [{ required: true, message: '请输入住址' }] }
                ]"
              />
            </a-form-item>
            <a-form-item label="身份证有效期" required>
              <a-form-item
                class="timer-con"
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
              >
                <a-input
                  placeholder="请输入结束时间"
                  style="width: 100%"
                  v-decorator="[
                    'idCardExpireStartTime',
                    { rules: [{ required: true, message: '请输入开始时间' }] }
                  ]"
                />
              </a-form-item>
              <span
                :style="{
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center'
                }"
              >
                -
              </span>
              <a-form-item
                class="timer-con"
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
              >
                <a-input
                  placeholder="请输入结束时间"
                  style="width: 100%"
                  v-decorator="[
                    'idCardExpireEndTime',
                    { rules: [{ required: true, message: '请输入结束时间' }] }
                  ]"
                />
              </a-form-item>
            </a-form-item>
          </div>
          <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button
              :disabled="submitLoading"
              type="primary"
              html-type="submit"
              class="submitbtn"
              @click="handleSubmit"
            >
              {{ submitLoading ? '处理中...' : '提交认证' }}
            </a-button>
          </a-form-item>
        </a-form>
      </template>
      <template v-else-if="status === 'submited'">
        <div class="bg-regin">
          <h3>
            <img
              src="../assets/index/P023.png"
            />您的认证正在等待审核，请耐心等待.....
          </h3>
          <p>注：（预计三个工作日内完成审核，快速过审请联系客服。）</p>
        </div>
      </template>
    </div>
    <template v-else>
      <div data-v-b962fd1a="" class="default-width cl-content-done">
        <template v-if="customerType === 1">
          <div data-v-b962fd1a="" class="header">
            <h3 data-v-b962fd1a="">
              <img
                data-v-b962fd1a=""
                src="../assets/index/P024.png"
              />已完成企业认证
            </h3>
          </div>
          <h2 data-v-b962fd1a="">基本信息</h2>
          <form data-v-b962fd1a="" class="el-form">
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >公司名称：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.companyName
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >营业执照号：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.socialCreditCode
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >公司地址：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.address
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >法人名字：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.legalPerson
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >营业期限：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.establishmentDate +
                  '至' +
                  userAuthInfo.validityTerm
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >经营范围：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.businessScope
                }}</span>
                <!---->
              </div>
            </div>
          </form>
        </template>
        <template v-if="customerType === 0">
          <div data-v-b962fd1a="" class="header">
            <h3 data-v-b962fd1a="">
              <img
                data-v-b962fd1a=""
                src="../assets/index/P024.png"
              />已完成个人认证
            </h3>
          </div>
          <h2 data-v-b962fd1a="">基本信息</h2>
          <form data-v-b962fd1a="" class="el-form">
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >身份证号：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.idCardNumber
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >姓名：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.idCardName
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >住址：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.idCardAddress
                }}</span>
                <!---->
              </div>
            </div>
            <div data-v-b962fd1a="" class="el-form-item is-required">
              <label class="el-form-item__label" style="width: 170px"
                >身份证有效期：</label
              >
              <div class="el-form-item__content" style="margin-left: 170px">
                <span data-v-b962fd1a="" class="text-show">{{
                  userAuthInfo.idCardExpireStartTime +
                  '至' +
                  userAuthInfo.idCardExpireEndTime
                }}</span>
                <!---->
              </div>
            </div>
          </form>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import server from '../server/index'

export default {
  name: 'business',
  data: () => ({
    dev: process.env.NODE_ENV !== 'production',
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    },
    loading: false,
    loading1: false,
    loading2: false,
    imageUrl: '',
    imageUrl2: '',
    imageUrl3: '',
    status: 'submiting', // success,submiting,submited
    fileParams: {},
    headers: {},
    id: '',
    userAuthInfo: {},
    customerType: 1, // 1 企业   0 个人
    certType1: true, // 企业认证
    certType0: true, // 个人认证
    submitLoading: false,
    personalInfo: {} // 个人信息
  }),
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  async mounted () {
    this.getPersonalInfo()
  },
  // mixins: [getUserData],
  methods: {
    async getPersonalInfo () {
      var userInfo = this.getUserInfo()
      var params = {
        customerId: userInfo.id
      }
      var { data } = await server.getPersonalInfo(params)
      if (data.code === 200) {
        this.personalInfo = data.data
        if (this.personalInfo.state === 1) {
          this.$message.warning('认证已驳回，请重新编辑提交！')
        }
        this.customerType = data.data.customerType
        await this.$nextTick()
        if (!data.data.customerExt) {
          this.status = 'submiting'
        } else {
          if (data.data.state === 0) {
            this.status = 'submited'
          } else if (data.data.state === 9) {
            var userAuthInfo = data.data.customerExt
            if (this.customerType === 1) {
              this.userAuthInfo = {
                establishmentDate: userAuthInfo.businessLicenseExpireStartTime,
                address: userAuthInfo.companyAddress,
                businessScope: userAuthInfo.businessScope,
                legalPerson: userAuthInfo.legalPerson,
                companyName: userAuthInfo.companyName,
                socialCreditCode: userAuthInfo.businessLicenseNumber,
                validityTerm: userAuthInfo.businessLicenseExpireEndTime
              }
            } else {
              this.userAuthInfo = {
                idCardName: userAuthInfo.idCardName,
                idCardAddress: userAuthInfo.idCardAddress,
                idCardNumber: userAuthInfo.idCardNumber,
                idCardExpireStartTime: userAuthInfo.idCardExpireStartTime,
                idCardExpireEndTime: userAuthInfo.idCardExpireEndTime
              }
            }

            this.status = 'success'
            userInfo = this.getUserInfo()
            userInfo.state = 9
            this.setUserInfo(userInfo)
          } else if (data.data.state === 1) {
            userAuthInfo = data.data.customerExt
            this.status = 'submiting'
            if (this.customerType === 1) {
              this.form.setFieldsValue({
                establishmentDate: userAuthInfo.businessLicenseExpireStartTime,
                address: userAuthInfo.companyAddress,
                businessScope: userAuthInfo.businessScope,
                legalPerson: userAuthInfo.legalPerson,
                companyName: userAuthInfo.companyName,
                socialCreditCode: userAuthInfo.businessLicenseNumber,
                validityTerm: userAuthInfo.businessLicenseExpireEndTime
              })
              this.imageUrl = userAuthInfo.businessLicensePath
            } else {
              this.form.setFieldsValue({
                idCardFrontPath: userAuthInfo.idCardFrontPath,
                idCardBackPath: userAuthInfo.idCardBackPath,
                idCardName: userAuthInfo.idCardName,
                idCardAddress: userAuthInfo.idCardAddress,
                idCardNumber: userAuthInfo.idCardNumber,
                idCardExpireStartTime: userAuthInfo.idCardExpireStartTime,
                idCardExpireEndTime: userAuthInfo.idCardExpireEndTime
              })
              this.imageUrl2 = userAuthInfo.idCardFrontPath
              this.imageUrl3 = userAuthInfo.idCardBackPath
            }
            this.id = userAuthInfo.id
          }
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    async handleSubmit () {
      if (this.customerType === 0) {
        this.certType1 = false
      } else {
        this.certType0 = false
      }
      await this.$nextTick()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.submitLoading = true
          var userInfo = this.getUserInfo()
          var params = {}
          if (this.customerType === 1) {
            params = {
              businessLicenseExpireStartTime: values.establishmentDate,
              companyAddress: values.address,
              businessScope: values.businessScope,
              legalPerson: values.legalPerson,
              companyName: values.companyName,
              businessLicensePath: this.imageUrl,
              businessLicenseNumber: values.socialCreditCode,
              businessLicenseExpireEndTime: values.validityTerm,
              customerId: userInfo.id
            }
          } else if (this.customerType === 0) {
            params = {
              customerId: userInfo.id,
              idCardFrontPath: this.imageUrl2,
              idCardBackPath: this.imageUrl3,
              idCardName: values.idCardName,
              idCardAddress: values.idCardAddress,
              idCardNumber: values.idCardNumber,
              idCardExpireStartTime: values.idCardExpireStartTime,
              idCardExpireEndTime: values.idCardExpireEndTime
            }
          }

          if (this.id) {
            params.id = this.id
          }
          if (this.personalInfo.state !== 1) {
            // 新增不传id，再次提交传id
            delete params.id
          }
          params.customerType = this.customerType
          var { data } = await server.subUserAuthByBusiness(params)
          this.submitLoading = false
          if (data.code === 200) {
            this.status = 'submited'
          } else {
            this.$message.error(data.resultMsg)
          }
        }
      })
    },
    normFile (e) {
      // console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    setFront (info) {
      // idCardName: "某某某"
      // idCardNumber: ""
      // idCardAddress: "级行政区名称区县级行政区名称具体住宿地址"
      // idCardExpireStartTime: null
      // idCardExpireEndTime: null
      // fileAccessPath: "http://oem.shzhzh.cn:80/resource/idCard/202003242209225.png"
      var values = this.form.getFieldsValue()
      var data = {
        ...values,
        idCardFrontPath: info.fileAccessPath,
        idCardName: info.idCardName,
        idCardAddress: info.idCardAddress,
        idCardNumber: info.idCardNumber
      }
      this.imageUrl2 = info.fileAccessPath
      this.form.setFieldsValue(data)
    },
    setBack (info) {
      var values = this.form.getFieldsValue()
      var data = {
        ...values,
        idCardBackPath: info.idCardBackPath,
        idCardExpireStartTime: info.idCardExpireStartTime,
        idCardExpireEndTime: info.idCardExpireEndTime
      }
      this.imageUrl3 = info.fileAccessPath
      this.form.setFieldsValue(data)
    },
    imageChange (info, cb, type) {
      if (info.file.status === 'uploading') {
        if (type === 'front') {
          this.loading1 = true
        } else {
          this.loading2 = true
        }
        return
      }
      if (info.file.status === 'done') {
        if (type === 'front') {
          this.loading1 = false
        } else {
          this.loading2 = false
        }
        // console.log(info.file.response)
        var response = info.file.response
        if (response.code === 200) {
          var data = response.data
          // console.log(data)
          cb && cb(data)
          // imageUrl2
          // this.form.setFieldsValue(data)
        } else {
          this.$message.error(response.msg)
        }
        // Get this url from response in real world.
      }
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      console.log(info)
      if (info.file.status === 'done') {
        this.loading = false
        var response = info.file.response
        if (response.code === 200) {
          var data = response.data
          // data.establishmentDate = this.moment(data.establishmentDate.substring(0, 4) + '-' + data.establishmentDate.substring(5, 7) + '-' + data.establishmentDate.substring(8, 10))
          this.imageUrl = data.fileAccessPath
          // console.log(data)
          this.form.setFieldsValue(data)
        } else {
          this.$message.error(response.msg)
        }
        // Get this url from response in real world.
      }
    },
    async getCustomerInfoById () {
      var { data } = await server.getPersonalInfo()
      if (data.code === 200) {
      } else {
        this.$message.error(data.msg)
      }
    },
    beforeUpload (file, target) {
      // console.log(file, target)
      // var userInfo = this.getUserInfo()
      var token = this.getSessionToken()
      this.fileParams = {
        // customerId: userInfo.id
      }
      this.headers = {
        token
      }
      if (target) {
        this.fileParams.side = target
      }
      var types = ['image/jpeg', 'image/png', 'image/jpg']
      var isJPG = types.indexOf(file.type) > -1
      if (!isJPG) {
        this.$message.error('图片需要使用jpg,jpeg,png格式')
      }
      var isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('图片大小不能超过5M')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="less">
.business {
  .cl-breadcrumb {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .cl-breadcrumb .el-button {
    padding: 0;
  }

  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .el-button--text,
  .el-button--text.is-disabled,
  .el-button--text.is-disabled:focus,
  .el-button--text.is-disabled:hover,
  .el-button--text:active {
    border-color: transparent;
  }

  .el-button--text {
    color: #409eff;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
  }

  .default-width {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .cl-content-auth {
    margin-bottom: 50px;
    background-color: #fff;
    padding: 60px 250px 100px;
  }

  .cl-tabs {
    font-size: 0;
    text-align: center;
    margin-bottom: 30px;
    background-color: #98c0fe;
  }

  .cl-tabs li.active {
    background-color: #1673ff;
  }

  .cl-tabs li {
    height: 44px;
    width: 33.3333%;
    color: #fff;
    font-size: 14px;
    line-height: 44px;
    display: inline-block;
  }

  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .upload-button,
  .avatar-uploader > .ant-upload {
    width: auto;
    height: auto;
  }

  .upload-button {
    width: 170px;
    height: 91px;
  }

  .upload-button {
    line-height: 91px;
    text-align: center;
    cursor: pointer;
  }

  .cl-content-auth .file-format {
    color: #848e9a;
    margin-top: 10px;
    line-height: 26px;
  }

  .cl-content-auth .file-format span {
    color: #ff5558;
    margin-right: 5px;
    vertical-align: middle;
  }

  input.ant-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }

  /*.ant-row.ant-form-item {*/
  /*  margin-bottom: 32px;*/
  /*}*/

  .timer-con {
    margin-bottom: 0;

    .ant-form-item-control-wrapper {
      width: 100%;
    }
  }

  .submitbtn {
    width: 126px;
    height: 40px;
  }

  .cl-content-auth .bg-regin {
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #eee;

    text-align: center;
  }

  .cl-content-auth .bg-regin h3 {
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
    padding: 0 30px;
  }

  .cl-content-auth .bg-regin p {
    color: #848e9a;
    margin-top: 30px;
  }

  .cl-content-auth .bg-regin h3 img {
    margin-right: 10px;
    vertical-align: top;
  }

  .cl-content-done {
    margin-bottom: 50px;
    background-color: #fff;
    padding: 60px 250px 100px;
  }

  .cl-content-done .header {
    line-height: 40px;
    padding: 25px 30px;
    background-color: #eee;
  }

  .cl-content-done .header h3 {
    color: #666;
    font-size: 16px;
    font-weight: bold;
  }

  .cl-content-done .header h3 img {
    margin-right: 10px;
    vertical-align: middle;
  }

  .cl-content-done h2 {
    font-size: 16px;
    color: #585f68;
    padding-top: 30px;
    padding-bottom: 50px;
  }

  .el-form {
    .el-form-item {
      margin-bottom: 22px;
    }

    .el-form-item:after,
    .el-form-item:before {
      display: table;
      content: '';
    }

    .el-form-item__label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }

    .el-form-item.is-required:not(.is-no-asterisk)
      .el-form-item__label-wrap
      > .el-form-item__label:before,
    .el-form-item.is-required:not(.is-no-asterisk)
      > .el-form-item__label:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }

    .el-form-item__content {
      line-height: 40px;
      position: relative;
      font-size: 14px;
    }

    .el-form-item__content:after,
    .el-form-item__content:before {
      display: table;
      content: '';
    }

    .cl-content-done .text-show {
      color: #606266;
      line-height: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      margin-right: 100px;
      display: inline-block;
    }

    .el-form-item__content:after,
    .el-form-item__content:before {
      display: table;
      content: '';
    }

    .el-form-item:after,
    .el-form-item__content:after {
      clear: both;
    }
  }

  .avatar-uploader .ant-upload img {
    max-width: 200px;
    max-height: 200px;
    vertical-align: top;
    cursor: pointer;
  }

  .ant-form-extra {
    margin-top: 15px;
  }
}
</style>
