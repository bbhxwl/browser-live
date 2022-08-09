import Vue from 'vue'
import VueRouter from 'vue-router'
import {getTokenModel} from "@/code/jwt/jwtCommon";
function ChuShiHua(axx,store){
    Vue.use(VueRouter)
    const routes =
        [
            {
                path:"/",
                meta: {
                    title: '后台登陆'
                },
                component:()=>import("@/Pages/Main/LoginPage")
                // component:()=>import("@/Pages/Main/Frame1")
            },
        ]
    let router =  new VueRouter({
        routes,
         mode: 'history',
    })
    router.beforeEach((to, from, next) => {
        const decodedHeader = getTokenModel();
        if (decodedHeader) {
            if (store.state.CommunityList.length==0||store.state.GroupList.length==0){
                Init(axx,store);
            }
            //失效自动跳转
            let exp = new Date(decodedHeader.exp * 1000);
            if (new Date() > exp) {
                if (IsHouTai(to.path)){
                    localStorage.clear();
                    alert("登录已超时");
                    window.location.pathname = "/";
                    next();
                    return;
                }
            }
        }
        else{

            if (IsHouTai(to.path)){
                alert("登录超时");
                window.location.pathname = "/";
                next();
                return;
            }
        }

        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    });
    return router
}
function IsHouTai(path){
    let list=["/main","/xiaonuojiahu","/shequyanglao","/renzhiganyu","/familyoursingbed","/qujijiedaoji","/admin"];
    let isHou=false
    list.map(n=>{
        if (isHou==false){
            if (path.indexOf(n)==0){
                isHou=true
            }
        }
    })
    return isHou
}
export default ChuShiHua