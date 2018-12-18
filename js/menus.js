var menus={
    search:{
        text:'管线查询',
        path:'/search',
        code:'2',
        pid:'0',
        iconclass:'glyphicon glyphicon-star',
        haschildren:true,
        children:{
            layermanage:{
                text:'图层管理',
                path:'/search/layermanage',
                code:'5',
                pid:'2',
                iconclass:'glyphicon glyphicon-align-justify',
                haschildren:false,
                children:[]
            },
            property:{
                text:'属性拾取',
                path:'/search/property',
                code:'2',
                pid:'0',
                iconclass:'glyphicon glyphicon-hand-up',
                haschildren:false,
                children:[]
            },
            road:{
                text:'道路查询',
                path:'/search/road',
                code:'2',
                pid:'0',
                iconclass:'glyphicon glyphicon-road',
                haschildren:false,
                children:[]
            },
            installation:{
                text:'设施搜索',
                path:'/search/installation',
                code:'2',
                pid:'0',
                iconclass:'glyphicon glyphicon-search',
                haschildren:false,
                children:[]
            },
            condition:{
                text:'查询检索',
                path:'/search/condition',
                code:'2',
                pid:'0',
                iconclass:'glyphicon glyphicon-zoom-in',
                haschildren:false,
                children:[]
            },
        }
    },    
    statistics:{
        text:'统计分析',
        path:'/statistics',
        code:'3',
        pid:'0',
        iconclass:'glyphicon glyphicon-star',
        haschildren:true,
        children:{
            region:{
                text:'区域统计',
                path:'/statistics/region',
                code:'5',
                pid:'2',
                iconclass:'glyphicon glyphicon-th-large',
                haschildren:false, 
            },
            road:{
                text:'道路统计',
                path:'/statistics/road',
                code:'5',
                pid:'2',
                iconclass:'glyphicon glyphicon-road',
                haschildren:false, 
            },
            // material:{
            //     text:'材质分类统计',
            //     path:'/statistics/material',
            //     code:'5',
            //     pid:'2',
            //     iconclass:'glyphicon glyphicon-star',
            //     haschildren:false,
                
            // },
            // psize:{
            //     text:'管径分类统计',
            //     path:'/statistics/psize',
            //     code:'5',
            //     pid:'2',
            //     iconclass:'glyphicon glyphicon-star',
            //     haschildren:false,
            //     children:[]
            // },
            pipletype:{
                text:'管线分类统计',
                path:'/statistics/pipletype',
                code:'5',
                pid:'2',
                iconclass:'glyphicon glyphicon-th-list',
                haschildren:false, 
            },
            attachment:{
                text:'附属设施统计',
                path:'/statistics/attachment',
                code:'5',
                pid:'2',
                iconclass:'glyphicon glyphicon-paperclip',
                haschildren:false,
                
            },
            shaft:{
                text:'管井统计',
                path:'/statistics/shaft',
                code:'5',
                pid:'2',
                iconclass:'glyphicon glyphicon-cd',
                haschildren:false, 
            },
        } 
    },
    home:{
        text:'基础服务',
        path:'/home',
        code:'1',
        pid:'0',
        iconclass:'glyphicon glyphicon-star',
        haschildren:false,
    },
   
    // others:{
    //     text:'工具',
    //     path:'/others',
    //     code:'4',
    //     pid:'0',
    //     iconclass:'glyphicon glyphicon-star',
    //     haschildren:true,
    //     children:{
    //         dig:{
    //             text:'局部开挖',
    //             path:'/others/dig',
    //             code:'5',
    //             pid:'2',
    //             iconclass:'glyphicon glyphicon-star',
    //             haschildren:false, 
    //         },
    //         crosssection:{
    //             text:'剖切分析',
    //             path:'/others/crosssection',
    //             code:'5',
    //             pid:'2',
    //             iconclass:'glyphicon glyphicon-star',
    //             haschildren:false, 
    //         }
    //     } 
    // },
}