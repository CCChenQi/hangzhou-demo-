/**
 * 统计分析菜单 
 */
var statistics = {
    template: '#statistics',
    data: function () {
        var childmenu = [];
        if (menus.statistics.haschildren) {
            for (var key in menus.statistics.children) {
                childmenu.push(menus.statistics.children[key]);

            }
        } 
        return {
            childrenMenus: childmenu
        }
    },
    methods: {

    },
    mounted:function(){
        // button点击切换颜色
        $('.btn-tool').on("click","button",function(e){
            console.log(1);
                console.log(1);
             var $this=$(this)
             e.preventDefault();
             e.stopPropagation();
             if($this.hasClass('bgcolor')){
                $this.removeClass('bgcolor');
             }else {
                $this.addClass('bgcolor'); 
                $this.siblings().removeClass('bgcolor');
             }
          })
    }
};
var statisticsByRegion = {
template:'#statisticsByRegion',
    },
    statisticsByRoad = {
        template:'#statisticsByRoad',
    },
    statisticsByMaterial = {
        template:'#statisticsByMaterial',
    },
    statisticsByPsize = {
        template:'#statisticsByPsize',
    },
    statisticsBytype = {
        template:'#statisticsBytype',
    },
    statisticsByAttachment = {
        template:'#statisticsByAttachment',
    },
    statisticsByShaft = {
        template:'#statisticsByShaft',
    };