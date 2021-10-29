import server from '../server/common'

export default {
  data () {
    return {
      userAccount: {},
      apiAccountInfo: {}
    }
  },
  mounted () {
  },
  methods: {
    async getUserData () {
      // await this.findbyMobile()
      // await this.findByCreUserId()
    },
    async findbyMobile () {
      var params = {
        token: this.getToken(),
        mobile: this.getUser()
      }
      var {data} = await server.findbyMobile(params)
      if (data.resultCode === '000000') {
        this.userAccount = data.resultObj
      } else {
        this.$message.error(data.resultMsg)
      }
    },
    async findByCreUserId () {
      var params = {
        creUserId: this.userAccount.creUserId,
        token: this.getToken(),
        mobile: this.getUser()
      }
      var {data} = await server.findByCreUserId(params)
      if (data.resultCode === '000000') {
        this.apiAccountInfo = data.resultObj
      } else {
        this.$message.error(data.resultMsg)
      }
    },
    getUserId () {
      return this.userAccount.creUserId
    },
    getName () {
      return this.apiAccountInfo.name
    }
  }
}
