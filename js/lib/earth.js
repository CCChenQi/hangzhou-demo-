/**
 * 3D earth
 * @param {*} config 
 * the parameters of the earth,the type of config is JSON,and the format is:
 * {
 *  'container':'divid',        //the container of the 3d earth
 *  'version':'70',             //the version of the 3d earth,default value is 70,if you use server parameter ,you must set the value is 70,or throw a exception
 *  callback:function(earth){}, //when the project is loaded and callback the function
 *  'token':'',                 //be use to connect the sg server 
 *  server:{'isuse':true/false,'url':'http://ip:port/sg/'},// get the ip and port  from administrator if isuse set false ,the url is ignored
 *  'fly':the project url.
 * }
 */
function Earth(config) {
    var uniqueIDs = {
        "50": {
            "SGWorld": "CLSID:3a4f9191-65a8-11d5-85c1-0001023952c1"
        },
        "65": {
            "TerraExplorer3DWindow": "CLSID:3a4f9192-65a8-11d5-85c1-0001023952c1",
            "TerraExplorerInformationTree": "CLSID:3a4f9193-65a8-11d5-85c1-0001023952c1",
            "TerraExplorerNavigationMap": "CLSID:3a4f9194-65a8-11d5-85c1-0001023952c1",
            "TerraExplorer3DWindowEx": "CLSID:3a4f9196-65a8-11d5-85c1-0001023952c1",
            "SGWorld": "CLSID:3A4F9199-65A8-11D5-85C1-0001023952C1"
        },
        "66": {
            "TerraExplorer3DWindow": "CLSID:3a4f9192-65a8-11d5-85c1-0001023952c1",
            "TerraExplorerInformationTree": "CLSID:3a4f9193-65a8-11d5-85c1-0001023952c1",
            "TerraExplorerNavigationMap": "CLSID:3a4f9194-65a8-11d5-85c1-0001023952c1",
            "TerraExplorer3DWindowEx": "CLSID:3a4f9196-65a8-11d5-85c1-0001023952c1",
            "SGWorld": "CLSID:3A4F9199-65A8-11D5-85C1-0001023952C1"
        },
        "70": {
            "TerraExplorer3DWindow": "CLSID:3a4f9192-65a8-11d5-85c1-0001023952c1",
            "TerraExplorerInformationTree": "CLSID:3a4f9193-65a8-11d5-85c1-0001023952c1",
            "TerraExplorerNavigationMap": "CLSID:3a4f9194-65a8-11d5-85c1-0001023952c1",
            "TerraExplorer3DWindowEx": "CLSID:3a4f9196-65a8-11d5-85c1-0001023952c1",
            "SGWorld": "CLSID:3A4F919C-65A8-11D5-85C1-0001023952C1"
        }
    };

    var loadFinished_callback;
    var inital = function (container, version, callback, config) {
        if (!isIE()) {
            uniqueIDs_NotIE();
        }
        var explorer = browerInfo();
        var threedWin = createEartheContainer(container, version);
        var earth = createInstance(container, version,explorer);
        var earthinfo = {};
     
        try {
            earthinfo = getEarthInfo(earth);
        } catch (e) {
            alert("三维控件实例化失败");
            return;
        }
        if (earthinfo.version) {
            try {
                if (earthinfo.is32BitApp && explorer.win32 || (!earthinfo.is32BitApp && !explorer.win32)) {
                    earth.AttachEvent("OnLoadFinished", loadFinished);
                    threedWin.BorderStyle = 0;
                    if (config.server.isuse && config.server.url) {
                        var userinfo=JSON.parse(window.atob(config.token));
                        earth.SGServer.Connect(config.server.url, userinfo.username, userinfo.password);
                        setInterval(function () {
                            earth.SGServer.Reconnect();
                        }, 1800000); //reconnect per 30 minitus
                    } 
                    loadFinished_callback = callback;
                    earth.Project.Open(config.fly, true);

                } else {
                    alert("当前浏览器位数与三维控件不匹配");
                }
            } catch (e) {
                alert(e.message);
            }

        }

    };
    var loadFinished = function (isLoaded) {
        if (isLoaded) {            
            if (loadFinished_callback) {
                loadFinished_callback(getEarth());
            }

        }

    }
    /**
     * @returns 返回3d窗口
     * @param {*} container 承载3d窗口的容器
     * @param {*} version te的版本号 目前版本号有50、65、66、70,默认采用70版本,暂不支持50版本
     */
    var createEartheContainer = function (container, version) {
        version = uniqueIDs[version] ? version : "70";
        var TE3DWindow = document.getElementById("TE3DWindow");
        var explorer = browerInfo();
        if (!TE3DWindow) {
            TE3DWindow = document.createElement("object");
            TE3DWindow.setAttribute("id", "TE3DWindow");
            TE3DWindow.setAttribute("name", "TE3DWindow");
            TE3DWindow.setAttribute("width", "100%");
            TE3DWindow.setAttribute("height", "100%");

            if (explorer.type == "Chrome" || explorer.type == "Firefox") {
                TE3DWindow.setAttribute("type", "application/x-skyline");
                TE3DWindow.setAttribute("clsid", uniqueIDs[version]["TerraExplorer3DWindow"]);
            } else if (explorer.type == "MSIE") {
                TE3DWindow.setAttribute("classid", uniqueIDs[version]["TerraExplorer3DWindow"]);
            } else {
                return null;
            }
            document.getElementById(container) ? document.getElementById(container).appendChild(TE3DWindow) : document.body.appendChild(TE3DWindow);
        }
        return TE3DWindow;

    };

    var createInstance = function (container, version,explorer) {
        version = uniqueIDs[version] ? version : "70";
        var obj = document.getElementById("SGWorld");
        if (!obj) {
            obj = document.createElement("object");
            obj.setAttribute("id", "SGWorld");
            obj.setAttribute("name", "SGWorld"); //sgworld
            if (explorer.type == "Chrome" || explorer.type == "Firefox") {
                obj.setAttribute("type", "application/x-skyline");
                //obj.setAttribute("clsid", "{3a4f9199-65a8-11d5-85c1-0001023952c1}");
                obj.setAttribute("clsid", uniqueIDs[version]["SGWorld"]);
            } else if (explorer.type == "MSIE") {
                //obj.setAttribute("classid", "clsid:3a4f9199-65a8-11d5-85c1-0001023952c1");//3dwindow66
                obj.setAttribute("classid", uniqueIDs[version]["SGWorld"]);
            } else {
                return null;
            }
            obj.setAttribute("style", "display:none;height:0px");
            document.getElementById(container) ? document.getElementById(container).appendChild(obj) : document.body.appendChild(obj);
        }
        return obj;
    };

    var getEarth = function () {
        var earth = document.getElementById("SGWorld");
        if (!earth) {
            earth = document.createElement('object');
            earth.name = "SGWorld";
            earth.id = "SGWorld";
            earth.classid = "CLSID:3a4f9199-65a8-11d5-85c1-0001023952c1";
            document.body.appendChild(earth);
        }
        return earth;
    };

    var getEarthInfo = function (earth) {
        var Build = earth.Version.Build; //1
        var Freeze = earth.Version.Freeze; //1567
        var Major = earth.Version.Major; //6
        var Minor = earth.Version.Minor; //6
        var Type = earth.Version.Type; //0
        var obj = {};
        obj.type = Type; //pro,plus
        obj.version = Major + '.' + Minor + '.' + Build; //6.6.1
        obj.freeze = Freeze; //1567
        obj.is32BitApp = (parseFloat(obj.version) <= 6.6) ? true : false;
        return obj;

    };

    var detectBrower = function () {
        var nav = window.navigator;
        var platform = nav.platform;
        var explorer = nav.userAgent; //||appVersion
        if (isIE()) {
            // var platform = nav.platform;// "Win32";
            if (window.XMLHttpRequest) { //IE7+
                return "MSIE/7.0plus" + platform;
            } else { //IE6, IE5
                return "MSIE/6.0" + platform;
            }
        } else {
            //Chrome 
            if (res = explorer.match(/Chrome\/([\d.]+)/g)) {
                return res[0] + platform;
            }
            //Firefox
            else if (res = explorer.match(/Firefox\/([\d.]+)/g)) {
                return res[0] + platform;
            }
            //Opera
            else if (res = explorer.match(/Opera\/([\d.]+)/g)) {
                return res[0] + platform;
            }
            //Safari
            else if (res = explorer.match(/Safari\/([\d.]+)/g)) {
                return res[0] + platform;
            }
            //Netscape
            else {
                return "";
            } //else
        } //else

    };

    var isIE = function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        }
        return false;
    };

    var browerInfo = function () {
        var brower = {};
        var info = detectBrower();
        brower.version = transNum(info) - 0; //42
        brower.type = info.split('/')[0]; //Chrome
        brower.win32 = info.indexOf("Win32") > 0 ? true : false; //32bit
        return brower;
    };

    var transNum=function(num) {
        return (num == undefined) ? 0 : parseFloat(num.match(/[\d.]+/g)[0]);
    };

    //inital(config.container, config.version, config.callback, config);
    var _config=config;
    var init=function(){
        inital(_config.container, _config.version, _config.callback, _config);
    };
    this.inital=init;
    this.getEarth=getEarth;
}