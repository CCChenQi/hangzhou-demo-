var app=new Vue({
    el:'#app',
    data:{
        menus:menus
    },
     
    router:new VueRouter({routes:routes}),
    mounted: function () {
        var earth = new Earth({
        'container': "map",
        'token': "eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9",
        server: {
        'isuse': false,
        // 'url': 'http://15.75.0.22/sg',
        },
        'fly': 'D:\\软件项目\\杭州\\aliFLY.FLY',
        callback: function (world) {
        if (world != null) {
        app.earthloadedfinished(world); //当三维球加载完成后处理的事件
        }
        }
        });
        earth.inital(); //一定执行

        
    },
    methods:{
        // basiceService:function(){
        //     $('#map').css("width", "90%");
        // },
        // pipeline:function(){
        //     $('#map').css("width", "75%");
        // },
    },
});


// 地图
$('.list-inline>li:nth-child(3)').on("click", function (e) {
    e.preventDefault() ;
    $('#map').css("width", "89%"); 
});
$('.list-inline>li:nth-child(1)').on("click", function (e) {
    e.preventDefault() ;
    $('#map').css("width", "75%"); 
});
$('.list-inline>li:nth-child(2)').on("click", function (e) {
    e.preventDefault() ;
    $('#map').css("width", "75%"); 
});
$('.list-inline>li:nth-child(4)').on("click", function (e) {
    e.preventDefault() ;
    $('#map').css("width", "89%"); 
});
