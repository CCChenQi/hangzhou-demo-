/**
 * 其他菜单 
 */
var others = {
    template: '#others',
    data: function () {
        var childmenu=[];
        if(menus.others.haschildren){
            for(var key in menus.others.children){
                childmenu.push(menus.others.children[key]);
            }
        } 
        return {
            childrenMenus: childmenu

        }
    },
    methods: {

    }
};

var dig={
    template:'#dig',
    data:function(){
        return{

        }
    },
    methods:{

    }

};

var crosssection={
    template:'#crosssection',
    data:function(){
        return{

        }
    },
    methods:{
        
    }

};