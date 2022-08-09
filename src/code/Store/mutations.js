export default  {
    setGroupList (state,data) {
        state.GroupList=data
        state.GroupListAndAllUser=data.map(n=>{return n});
        state.GroupListAndAllUser.unshift("全部用户")
    },
    setCommunityList (state,data) {
        state.CommunityList=data
        state.CommunityListAndAllUser=data.map(n=>{return n});
        state.CommunityListAndAllUser.unshift({Id:0,Name:"全部用户"})
    },
    setAdminUserInfo (state,data) {
        state.adminUserInfo=data
    }
}