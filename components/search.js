/**
 * 对应管线查询菜单
 */
var search = {
    template: "#search",
    data: function() {
        var childmenu = [];
        if (menus.search.haschildren) {
            for (var key in menus.search.children) {
                childmenu.push(menus.search.children[key]);
            }
        }
        return {
            childrenMenus: childmenu
        };
    },
    methods: {},
    mounted: function() {
        // button点击切换颜色
        $('.btn-tool').on("click", "button", function(e) {
            console.log(1);
            console.log(1);
            var $this = $(this)
            e.preventDefault();
            e.stopPropagation();
            if ($this.hasClass('bgcolor')) {
                $this.removeClass('bgcolor');
            } else {
                $this.addClass('bgcolor');
                $this.siblings().removeClass('bgcolor');
            }
        })
    }
};

var layermanage = {
        template: "#layermanage",
        data: function() {
            return {
                layermanage: [
                    //   {
                    //     id: 1,
                    //     label: "一级 1",
                    //     children: [
                    //       {
                    //         id: 4,
                    //         label: "二级 1-1",
                    //         children: [
                    //           {
                    //             id: 9,
                    //             label: "三级 1-1-1"
                    //           },
                    //           {
                    //             id: 10,
                    //             label: "三级 1-1-2"
                    //           }
                    //         ]
                    //       }
                    //     ]
                    //   },
                    {
                        id: 2,
                        label: "建筑模型",
                        children: [{
                                id: 5,
                                label: "模型名称"
                            },
                            {
                                id: 6,
                                label: "模型名称"
                            },
                            {
                                id: 7,
                                label: "模型名称"
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: "排水管线",
                        children: [{
                                id: 8,
                                label: "模型名称"
                            },
                            {
                                id: 9,
                                label: "模型名称"
                            },
                            {
                                id: 10,
                                label: "模型名称"
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: "children",
                    label: "label"
                }
            };
        },
        methods: {
            //   getCheckedNodes:function() {
            //     console.log(this.$refs.tree.getCheckedNodes());
            //   },
            //   getCheckedKeys:function() {
            //     console.log(this.$refs.tree.getCheckedKeys());
            //   },
            //   setCheckedNodes:function() {
            //     this.$refs.tree.setCheckedNodes([
            //       {
            //         id: 5,
            //         label: "二级 2-1"
            //       },
            //       {
            //         id: 9,
            //         label: "三级 1-1-1"
            //       }
            //     ]);
            //   },
            //   setCheckedKeys:function() {
            //     this.$refs.tree.setCheckedKeys([3]);
            //   },
            //   resetChecked:function() {
            //     this.$refs.tree.setCheckedKeys([]);
            //   }
        }
    },
    queryProperty = {
        template: "#queryProperty",
        data: function() {
            return {
                property: [
                    { text: "管线类型 : ", details: "xxx" },
                    { text: "物探点号 : ", details: "xxx" },
                    { text: "图层代号 : ", details: "xxx" },
                    { text: "名称 : ", details: "xxx" },
                    { text: "类型 : ", details: "xxx" },
                    { text: "材质 : ", details: "xxx" },
                    { text: "地面高程 : ", details: "xxx" },
                    { text: "坐标 : ", details: "xxx" },
                    { text: "所在道路 : ", details: "xxx" },
                    { text: "起点埋深 : ", details: "xxx" },
                    { text: "终点埋深 : ", details: "xxx" },
                    { text: "建设时间 : ", details: "xxx" },
                    { text: "管形状 : ", details: "xxx" },
                    { text: "规格 : ", details: "xxx" },
                    { text: "施工方式 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                    { text: "备注 : ", details: "xxx" },
                ]
            };
        },
        methods:{
            loaded: function() {
                var pathScroller;
                pathScroller = new IScroll('#pickup', {
                    mouseWheel: true
                });
            }
        },
        mounted:function(){
            this.loaded();
        }
    },
    queryByRoad = {
        template: "#queryByRoad",
        data: function() {
            return {
                pathList: ["管线1", "管线2", "管线3", "管线4", "管线5", "管线6", "管线7",
                    "管线8", "管线9", "管线10",
                    "管线11", "管线12", "管线13", "管线1", "管线1",
                    "管线1", "管线1", "管线1", "管线1", "管线1", "管线1", "管线1", "管线1",
                    "管线1", "管线1", "管线1", "管线1", "管线1", "管线1", "管线1", "管线1", "管线30"
                ],
                inputValue: 1,
            }
        },
        methods: {
            // 滑动
            pathDetail: function() {
                var pathScroller;
                pathScroller = new IScroll('#pathlist', {
                    mouseWheel: true
                });
            },
            updatePage: function() {
                if (this.inputValue > 1) {
                    this.inputValue--;
                } else {
                    confirm("已经到第一页了！");
                }
            },
            addPage: function() {
                if (this.inputValue <= 9) {
                    this.inputValue++;
                }

            },
            firstPage: function() {
                this.inputValue = 1;
            },
            lastPage: function() {
                this.inputValue = 10;
            }
        },
        mounted: function() {
            this.pathDetail();
            // 点击查询切换颜色
            $('.path_query').on("click", ".path_search", function(e) {
                var $this = $(this)
                e.preventDefault();
                e.stopPropagation();
                if ($this.hasClass('bgcolor')) {
                    $this.removeClass('bgcolor');
                } else {
                    $this.addClass('bgcolor');
                }
            })
        }
    },
    queryByInstallation = {
        template: "#queryByInstallation",
        data: function() {
            return {
                facilityList: ["管线数据列表1", "管线数据列表2", "管线数据列表3", "管线数据列表4", "管线数据列表5",
                    "管线数据列表6", "管线数据列表7", "管线数据列表8", "管线数据列表9", "管线数据列表10",
                    "管线数据列表1",
                    "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1",
                    "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1",
                    "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1", "管线数据列表1",
                    "管线数据列表30"
                ],
                inputValue: 1,
            }
        },
        methods: {
            // 滑动
            facilityDetail: function() {
                var facilityScroller;
                facilityScroller = new IScroll('#facilitylist', {
                    mouseWheel: true
                });
            },
            updatePage: function() {
                if (this.inputValue > 1) {
                    this.inputValue--;
                } else {
                    confirm("已经到第一页了！");
                }
            },
            addPage: function() {
                if (this.inputValue <= 9) {
                    this.inputValue++;
                }

            },
            firstPage: function() {
                this.inputValue = 1;
            },
            lastPage: function() {
                this.inputValue = 10;
            }
        },
        mounted: function() {
            this.facilityDetail();
        }
    },
    queryByCondition = {
        template: "#queryByCondition",
        methods:{
            loaded: function() {
                var pathScroller;
                pathScroller = new IScroll('#wrapper', {
                    mouseWheel: true
                });
            }
        },
        mounted:function(){
            this.loaded();
        }
    };