/**
 * 基础服务菜单 
 */
var home={
    template:'#home',
    data:function(){
        return{
            childrenMenus:[
                {
                    text:'水平距离测量',
                    code:'1',
                    iconclass:'glyphicon glyphicon-resize-horizontal',
                    eventname:'horizontalMeasure'
                },
                {
                    text:'垂直距离测量',
                    code:'2',
                    iconclass:'glyphicon glyphicon-resize-vertical',
                    eventname:'verticalMeasure'
                },
                {
                    text:'面积测量',
                    code:'3',
                    iconclass:'glyphicon glyphicon-globe',
                    eventname:'areaMeasure'
                },
                // {
                //     text:'地址定位',
                //     code:'4',
                //     iconclass:'glyphicon glyphicon-pawn',
                //     eventname:'locationByAddress'
                // },
                // {
                //     text:'坐标定位',
                //     code:'5',
                //     iconclass:'glyphicon glyphicon-save',
                //     eventname:'locationByPostion'
                // },
                {
                    text:'地下模式',
                    code:'6',
                    iconclass:'glyphicon glyphicon-sound-5-1',
                    eventname:'underModel'
                },
                {
                    text:'穿透模式',
                    code:'7',
                    iconclass:'glyphicon glyphicon-sound-6-1',
                    eventname:'throuModel'
                },
                {
                    text:'局部开挖',
                    code:'8',
                    iconclass:'glyphicon glyphicon-inbox',
                    eventname:'partionDig'
                },
                {
                    text:'管线标注',
                    code:'9',
                    iconclass:'glyphicon glyphicon-tag',
                    eventname:'labelPipleline'
                },
                {
                    text:'打印出图',
                    code:'10',
                    iconclass:'glyphicon glyphicon-print',
                    eventname:'printPipleline'
                },
                // {
                //     text:'工具',
                //     code:'11',
                //     iconclass:'glyphicon glyphicon-wrench',
                //     eventname:'tools'
                // },
            ],
            underModel:true

        }
    },
    methods:{
        handlerEvent:function(eventName){ 
           var method=this.$options.methods[eventName];
           if(void 0!==method){
               method();
           }else{
               alert('未找到对应的方法');
           }
        },
        //水平测量
        horizontalMeasure:function(){
            if(void 0!==SGWorld){
                SGWorld.Command.Execute(1034,0); 
            }  
        },
        //垂直测量
        verticalMeasure:function(){
           if(void 0!==SGWorld){
               SGWorld.Command.Execute(1036,0);
           }
        },
        //面积测量
        areaMeasure:function(){
            if(void 0!=SGWorld){
                SGWorld.Command.Execute(1165,0);
            }
        },
        //地址定位
        locationByAddress:function(){
            alert("locationByAddress");
        },
        //坐标定位
        locationByPostion:function(){
            alert("locationByPostion");
        },
        //地下模式
        underModel:function(){
            if(void 0!==SGWorld){
                SGWorld.Command.Execute(1027,0);
            }
        },
        //穿透模式
        throuModel:function(){
            if(void 0!==SGWorld){                
                SGWorld.SetParam(8338,this.underModel);
                this.underModel=!this.underModel;
            }
        },
        //局部开挖
        partionDig:function(){
            if(void 0!==SGWorld){
                SGWorld.Command.Execute(1012,16);
            }
        },
        //管线标注
        labelPipleline:function(){
           //弹出一个窗体
          var messagebox= SGWorld.Creator.CreatePopupMessage('labelpipleline',config.baseUrl+'/html/lablepipleline.html',0,0,100,100,-1);
          SGWorld.Window.ShowPopup(messagebox); 
        },
        //打印管线
        printPipleline:function(){
           // alert("printPipleline");
           if(void 0!==SGWorld){
               SGWorld.Command.Execute(1067,0);
           }
        },
        //工具栏
        tools:function(){
            alert("tools");
        }
        



    },
    mounted: function (){

    }
}