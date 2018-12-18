var routes = [{
        //基础服务
        path: '/home',
        component: home,
    },
    {
        //管线查询
        path: '/search',
        component: search,
        children:[
            {
                //管线图层管理
                path:'layermanage',
                component:layermanage
            },
            {
                //管线属性拾取
                path:'property',
                component:queryProperty
            },
            {
                //道路查询
                path:'road',
                component:queryByRoad
            },
            {
                //设施搜索
                path:'installation',
                component:queryByInstallation
            },
            {
                //关键字检索（组合查询）
                path:'condition',
                component:queryByCondition
            }

        ]
    },
    {
        //统计分析
        path: '/statistics',
        component: statistics,
        children:[
            {
                //根据区域统计
                path:'region',
                component:statisticsByRegion
            },
            {
                //根据道路统计
                path:'road',
                component:statisticsByRoad
            },
            {
                //根据管线材质分类统计
                path:'material',
                component:statisticsByMaterial
            },
            {
                //管径分类统计
                path:'psize',
                component:statisticsByPsize
            },
            {
                //管线分类统计
                path:'pipletype',
                component:statisticsBytype

            },
            {
                //附属物统计
                path:'attachment',
                component:statisticsByAttachment
            },
            {
                //管井统计
                path:'shaft',
                component:statisticsByShaft
            }

        ]
    },
    {
        path: '/others',
        component: others,
        children: [{
            //局部开挖
                path: 'dig',
                component: dig,
            },
            {
                //剖切分析
                path: 'crosssection',
                component: crosssection,
            }
        ]
    }
]; //路由