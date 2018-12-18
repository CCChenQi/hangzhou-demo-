/**
 * 1：矩形事件
 * 2：圆形事件
 * 4：任意多边形事件
 * */
var eventFlag = 0;//记录事件类型
/**
 * 创建人：显淳
 * 创建时间:2018-7-26
 * 功能描述：在地图上创建一个面
 * @param {*} wkt  polygon的WKT描述
 * @param {*} fillcolor 填充色
 * @param {*} linecore 	线条颜色
 * @param {*} linewidth 线条宽度
 * @param {*} distance 查看距离
 */
function createPolygonFromWKT(wkt, fillcolor, linecore, linewidth, distance) {
    var geometry = SGWorld.Creator.GeometryCreator.CreateGeometryFromWKT(wkt);
    var polygon_id = SGWorld.ProjectTree.FindItem("js-polygon");
    if (polygon_id) {
        SGWorld.ProjectTree.DeleteItem(polygon_id);
    }
    var polygon = SGWorld.Creator.CreatePolygon(
        geometry,
        linecore,
        fillcolor,
        0,
        "",
        "js-polygon"
    );
    polygon.LineStyle.Width = linewidth;
    polygon.Position.Distance = distance;
    polygon.Position.Pitch = -45;
    SGWorld.Navigate.JumpTo(polygon);
}

/**
 * 创建人：黄显淳
 * 创建时间:2018-7-26
 * 功能描述:在地图上生成一个3D polyogn
 * @param {*} wkt 空间地理信息 例：polygon((x y))
 * @param {*} height 空间3D体的高度,数字
 * @param {* } fillcolor 3D体的填充色,0xff|ff|ff|ff:透明度|三基色
 * @param {*} linecolor 线条的颜色,0xff|ff|ff|ff:透明度|三基色
 * @param {*} linewidth 线条的宽度
 * @param {*} distance 查看距离,数字
 * @param {*} name 3d体的名称
 */
function create3DPolygonFromWKT(
    wkt,
    height,
    altitude,
    fillcolor,
    linecolor,
    linewidth,
    distance,
    name
) {
    var _3dgeometry = SGWorld.Creator.GeometryCreator.CreateGeometryFromWKT(wkt);
    var _3dpolygon_id = SGWorld.ProjectTree.FindItem(name);
    if (_3dpolygon_id) {
        SGWorld.ProjectTree.DeleteItem(_3dpolygon_id);
    } 
    var _3dpolygon = SGWorld.Creator.Create3DPolygon(
        _3dgeometry,
        height,
        linecolor,
        fillcolor,
        0,
        "",
        name
    );
    _3dpolygon.LineStyle.Width = linewidth;
    _3dpolygon.Position.Distance = distance;
    _3dpolygon.Position.Altitude = altitude;
   // SGWorld.Navigate.JumpTo(_3dpolygon);
}
/**
 * 创建人：黄显淳
 * 创建时间：2018-7-26
 * 功能描述：在地图上创建一个点，并定位过去
 * @param {*} wkt 点的wkt文本 例：Point(x,y)
 */
function createPointFromWKT(wkt) {
    //var geometry = SGWorld.Creator.GeometryCreator.CreateGeometryFromWKT(wkt);
    var point = SGWorld.Creator.GeometryCreator.CreatePointGeometry(wkt);
    var position = SGWorld.Creator.CreatePosition(
        point.x,
        point.y,
        point.z,
        0, -45,
        0,
        400
    );
    var point_id = SGWorld.ProjectTree.FindItem("js-location");
    if (point_id) {
        SGWorld.ProjectTree.DeleteItem(point_id);
    }
    var location = SGWorld.Creator.CreateLocation(position, "", "js-location");
    location.Position.Distance = 350;
    location.Position.Pitch = -45;
    SGWorld.Navigate.JumpTo(location);
}


/**
 * 创建一个弹窗对象，但不弹出
 * 创建人：黄显淳
 * 创建时间：2018-7-28
 * 功能描述：按照指定的位置弹出一个窗体 
 * @param {*} caption 	弹窗名称 
 * @param {*} url 		需要打开的链接地址
 * @param {*} left 		距离左边距离
 * @param {*} top 		距离上边距离
 * @param {*} width 	打开页面宽度
 * @param {*} height 	打开页面高度
 */
function CreatePopUp(caption, url, left, top, width, height) {
    var popMessage = SGWorld.Creator.CreatePopupMessage(caption, url, left, top, width, height);
    popMessage.AllowResize = false;
    popMessage.ShowCaption = false;
    return popMessage;
}

/**
 *创建一个弹窗对象，并弹出
 * 创建人：黄显淳
 * 创建时间：2018-7-28
 * 功能描述：按照指定的位置弹出一个窗体 
 * @param {*} caption 	弹窗名称 
 * @param {*} url 		需要打开的链接地址
 * @param {*} left 		距离左边距离
 * @param {*} top 		距离上边距离
 * @param {*} width 	打开页面宽度
 * @param {*} height 	打开页面高度
 */ 
function ShowPopUp(caption, url, left, top, width, height ) {
    var popMessage = CreatePopUp(caption, url, left, top, width, height); 
    SGWorld.window.ShowPopUp(popMessage); 
}


var _callBackFun = null;
var width = 2; //线条宽度
var lineColor = 0x66FF0000; //线条颜色
var innerColor = 0x55FF0000; //填充色
var polygonHeight = 0;
/**创建一个空间面 */
var _drawPolygon = null; //需要创建的polygon
var _tmp_polyline = null;

function DrawPolygon(callbackfunc) {
    if (_drawPolygon != null) {
        SGWorld.Creator.DeleteObject(_drawPolygon.ID);
        _drawPolygon = null;
    }
    eventFlag = 0x0100;
    SGWorld.Window.SetInputMode(1);
    SGWorld.AttachEvent("OnLButtonDown", startDrawPolygon);
    SGWorld.AttachEvent("OnFrame", drawPolygon);
    SGWorld.AttachEvent("OnRButtonDown", endDrawPolygon);
    _callBackFun = callbackfunc;
}

function startDrawPolygon(Flag, x, y) {
    
    if (!(eventFlag & 0x0100)) {
        return;
    }
    var startPosition = SGWorld.Window.PixelToWorld(x, y);
    if (startPosition == null)
        return;
    if (_tmp_polyline == null && _drawPolygon == null) {
        var lineGeometry = SGWorld.Creator.GeometryCreator.CreateLineStringGeometry([startPosition.Position.X, startPosition.Position.Y, polygonHeight, startPosition.Position.X, startPosition.Position.Y, polygonHeight]);
        _tmp_polyline = SGWorld.Creator.CreatePolyline(lineGeometry, lineColor, 0);
        _tmp_polyline.LineStyle.Width = width;
        _tmp_polyline.Geometry.StartEdit();
    } else {
        if (_drawPolygon == null) {
            //
            var startpos = _tmp_polyline.Geometry.Points(0);
            var polygonGeom = SGWorld.Creator.GeometryCreator.CreateLinearRingGeometry([startpos.X, startpos.Y, polygonHeight,
                startPosition.Position.X, startPosition.Position.Y, polygonHeight,
                startPosition.Position.X, startPosition.Position.Y, polygonHeight
            ]);
            _drawPolygon = SGWorld.Creator.CreatePolygon(polygonGeom, lineColor, innerColor, 0, "", "");
            _drawPolygon.Position.Altitude = polygonHeight;
            _drawPolygon.LineStyle.Width = width;
            _drawPolygon.Terrain.GroundObject = true;
            _drawPolygon.Geometry.StartEdit();
            //_tmp_polyline.EndEdit();
            SGWorld.Creator.DeleteObject(_tmp_polyline.ID);
            _tmp_polyline = null;

        } else {
            //空间面已构成，编辑空间面  
            var polygonGeometry = _drawPolygon.Geometry.Rings(0);
            var endPoint = polygonGeometry.Points(polygonGeometry.Points.Count - 1);
            endPoint.X = startPosition.Position.X;
            endPoint.Y = startPosition.Position.Y;
            endPoint.Z = polygonHeight;
            polygonGeometry.Points.AddPoint(startPosition.Position.X,
                startPosition.Position.Y, polygonHeight);
            _drawPolygon.SetParam(5440, 1); 
        }
    }

}

function drawPolygon() {
    if (!(eventFlag & 0x0100)) {
        return;
    }
    var mousePos = SGWorld.Window.GetMouseInfo();
    var currentPos = SGWorld.window.PixelToWorld(mousePos.X, mousePos.Y);

    if (_tmp_polyline != null && _drawPolygon == null) {
        _tmp_polyline.Geometry.EndPoint.X = currentPos.Position.X;
        _tmp_polyline.Geometry.EndPoint.Y = currentPos.Position.Y;
        _tmp_polyline.Geometry.EndPoint.Z = polygonHeight;
        _tmp_polyline.SetParam(5440, 1);
    } else {
        if (_drawPolygon != null) {
            var polygonGeometry = _drawPolygon.Geometry.Rings(0);
            var endPoint = polygonGeometry.Points(polygonGeometry.Points.Count - 1);
            endPoint.X = currentPos.Position.X;
            endPoint.Y = currentPos.Position.Y;
            endPoint.Z = polygonHeight;
            _drawPolygon.SetParam(5440, 1); 
        }
    }

}

function endDrawPolygon(Flags, x, y) {
    if (!(eventFlag & 0x0100)) {
        return;
    }
    eventFlag = 0x0000;
    SGWorld.Window.SetInputMode(0);
    SGWorld.DetachEvent("OnLButtonDown", startDrawPolygon);
    SGWorld.DetachEvent("OnFrame", drawPolygon);
    SGWorld.DetachEvent("OnRButtonDown", endDrawPolygon);
    if (_drawPolygon != null) {
        var polygon = _drawPolygon.Geometry;
        var polygonGeometry = polygon.Rings(0);
        polygonGeometry.Points.DeletePoint(polygonGeometry.Points.Count - 1); 
        _drawPolygon.Geometry.EndEdit();
        if (_callBackFun != null) {
            _callBackFun(_drawPolygon.Geometry.Wks.ExportToWKT());
        }
    }
}
/**
 * 创建一个空间面结束
 */

/**
 * 创建一条线
 */
var _drawLine = null;

function DrawLine(callbackfunc) {
    if (_drawLine != null) {
        SGWorld.ProjectTree.DeleteItem(_drawLine.ID);
        _drawLine = null;
    }
    SGWorld.Window.SetInputMode(1);
    SGWorld.AttachEvent("OnLButtonDown", startDrawLine);
    SGWorld.AttachEvent("OnFrame", drawLine);
    SGWorld.AttachEvent("OnRButtonDown", endDrawLine);
    _callBackFun = callbackfunc;
}

function startDrawLine(Flags, x, y) {
    var startPosition = SGWorld.Window.PixelToWorld(x, y);
    if (startPosition == null) {
        return false;
    }
    if (_drawLine === null) {
        var lineGeometry = SGWorld.Creator.GeometryCreator.CreateLineStringGeometry([startPosition.Position.X, startPosition.Position.Y, polygonHeight, startPosition.Position.X, startPosition.Position.Y, polygonHeight]);

        _drawLine = SGWorld.Creator.CreatePolyline(lineGeometry, lineColor, 0);
        _drawLine.LineStyle.Width = width;
        _drawLine.Geometry.StartEdit();
        _drawLine.SetParam(5440, 1);
    } else {
        var endposition = SGWorld.Window.PixelToWorld(x, y);
        var lGeometry = _drawLine.Geometry;
        var endpoint = lGeometry.EndPoint;
        endpoint.X = endposition.Position.X;
        endpoint.Y = endposition.Position.Y;
        endpoint.Z = polygonHeight;
        _drawLine.Geometry.Points.AddPoint(endposition.Position.X, endposition.Position.Y, polygonHeight)
        _drawLine.SetParam(5440, 1);
    }

}

function drawLine() {
    var mouseInfo = SGWorld.Window.GetMouseInfo();
    if (_drawLine !== null) {
        var endposition = SGWorld.Window.PixelToWorld(mouseInfo.X,
            mouseInfo.Y);
        var lineGeometry = _drawLine.Geometry;
        var endpoint = lineGeometry.EndPoint;
        endpoint.X = endposition.Position.X;
        endpoint.Y = endposition.Position.Y;
        endpoint.Z = polygonHeight;
        _drawLine.SetParam(5440, 1);
    }
}

function endDrawLine(Flags, x, y) {
    SGWorld.Window.SetInputMode(0);
    SGWorld.DetachEvent("OnLButtonDown", startDrawLine);
    SGWorld.DetachEvent("OnFrame", drawLine);
    SGWorld.DetachEvent("OnRButtonDown", endDrawLine);
    _drawLine.Geometry.EndEdit();
    if (_callBackFun !== null) { //回调函数
        _callBackFun(_drawLine.Geometry.Wks.ExportToWKT());
    }
}
/**
 * 创建线条功能结束 * 
 */

/**
 * 点击获取当前
 */
function getPositon(callBackFun) {
    _callBackFun = callBackFun;
    SGWorld.Window.SetInputMode(1);
    SGWorld.AttachEvent('OnLButtonDown', function (Flag, x, y) {
        var postion = SGWorld.Window.PixelToWorld(x, y);
        _callBackFun({
            "x": postion.Position.X,
            "y": postion.Position.Y,
            "z": postion.Position.Altitude
        });
    });
    SGWorld.AttachEvent('OnRButtonDown', function (Flag, x, y) {
        _callBackFun=null;
        SGWorld.Window.SetInputMode(0);        
        SGWorld.OnLButtonDown=null;
    });
}

/**
 * @return Imagelabel
 * 在地图上标注一个图标
 * @param {*} jd 图标经度
 * @param {*} wd 图标纬度
 * @param {*} altitue 图标相对地形高度
 * @param {*} iconpath 图标位置
 * @param {*} imgname 图标名称，唯一标识
 * @param {*} groupname 图标所在的组
 */
function markImageLable(jd, wd, altitue, iconpath, imgname, groupname) {
    var lableStyle = SGWorld.Creator.CreateLabelStyle();
    lableStyle.Scale = 1;
    lableStyle.PivotAlignment = "Bottom, Center";
    var position = SGWorld.Creator.CreatePosition(
      jd,
      wd,
      altitue,
      0,
      0,
      -45,
      0,
      0
    );
    var imglable = SGWorld.Creator.CreateImageLabel(
      position,
      iconpath,
      lableStyle,
      groupname,
      imgname
    );
    return imglable;
}
 

 /**
  * 在地图上画一个圆
  * @param {*} jd 圆心的精度
  * @param {*} wd 圆心的纬度
  * @param {*} altitue 圆心高度
  * @param {*} radius 圆半径
  * @param {*} lineColor 圆周线段的颜色 eg:0xff|ff|ff|ff
  * @param {*} fillColor 圆的填充色
  * @param {*} name 圆的名称
  * @param {*} group 圆所在的工程组
  */
  function createCircle(jd, wd, altitue, radius, lineColor, fillColor, name, group) {
    var position = SGWorld.Creator.CreatePosition(jd, wd, altitue, 0, 0, -45, 0, 0);
    var circle = SGWorld.Creator.CreateRegularPolygon(position, radius,100, lineColor, fillColor, group, name);
    return circle;
}

function createModel(jd, wd, altitude, filename, scale, name, groupid) {
    var position = SGWorld.Creator.CreatePosition(jd, wd, altitude, 0, 0, 0, 0, 0);
    var model = SGWorld.Creator.CreateModel(position, filename, scale, 0, groupid, name);
    return model;
}

/**
 * 创建一个矩形面数据
 * @param {any} callback 矩形画完后需要的回调函数
 */
var _rectangle = null;
var _rectangle_label = null;
function createRectangle(callback) { 
    eventFlag = 0x0001;
    if (_rectangle != null) {
        SGWorld.Creator.DeleteObject(_rectangle.ID);
        _rectangle = null;
    }
    if (_rectangle_label != null) {
        SGWorld.Creator.DeleteObject(_rectangle_label.ID);
        _rectangle_label = null;
    } 
    SGWorld.Window.SetInputMode(1);
    SGWorld.AttachEvent("OnLButtonDown", startDrawRectangle);
    SGWorld.AttachEvent("OnFrame", drawRectangle);
    SGWorld.AttachEvent("OnRButtonDown", endDrawRectangle);
    _callBackFun = callback; 
};

var pt_3, pt_2, pt_1, pt_0, pos1, pos2, pos3;
var rectangle_width = 0;//pt_0.DistanceTo(pt_1);
var rectangle_depth = 0;//pt_0.DistanceTo(pt_3);

function startDrawRectangle(Flags, x, y) {
    if (!(eventFlag & 0x0001)) {
        return;
    }
    var startPosition = SGWorld.Window.PixelToWorld(x, y);
    var endPosition = SGWorld.Window.PixelToWorld(x, y); 
    if (startPosition == null)
        return;
    if (_rectangle == null) {
        pos1 = startPosition.Position;
        pos2 = SGWorld.Creator.CreatePosition(startPosition.Position.X, startPosition.Position.Y, 0, 0, 0, 0, 0, 0);
        pos3 = SGWorld.Creator.CreatePosition(startPosition.Position.X, startPosition.Position.Y, 0, 0, 0, 0, 0, 0);
        var polygonGeom = SGWorld.Creator.GeometryCreator.CreateLinearRingGeometry([startPosition.Position.X, startPosition.Position.Y, polygonHeight,
        endPosition.Position.X, startPosition.Position.Y, polygonHeight,
        endPosition.Position.X, endPosition.Position.Y, polygonHeight,
        startPosition.Position.X, endPosition.Position.Y, polygonHeight,
        startPosition.Position.X, endPosition.Position.Y, polygonHeight
        ]);

        _rectangle = SGWorld.Creator.CreatePolygon(polygonGeom, 0xffffff80, 0x00ff0000, 0, "", "");
        _rectangle.Position.Altitude = polygonHeight;
        _rectangle.LineStyle.Width = width;
        _rectangle.Terrain.GroundObject = true;
        _rectangle.Geometry.StartEdit();
        if (_rectangle_label == null) {
            var labelstyle = SGWorld.Creator.CreateLabelStyle(0);
            labelstyle.FontSize = 12;
            labelstyle.TextColor.FromBGRColor(0xff80ffff);
            _rectangle_label = SGWorld.Creator.CreateLabel(_rectangle.Position, "长：0 m;宽：0m", "", labelstyle, "", "rectangletext");
        }
    } else {
        SGWorld.DetachEvent("OnLButtonDown", startDrawRectangle);
        SGWorld.DetachEvent("OnFrame", drawRectangle);
    }
  
};
function drawRectangle() {
    if (!(eventFlag & 0x0001)){
        return;
    }
    if (_rectangle != null) {
        var mousePos = SGWorld.Window.GetMouseInfo();
        var currentPos = SGWorld.window.PixelToWorld(mousePos.X, mousePos.Y);
        var polygonGeometry = _rectangle.Geometry.Rings(0);
         pt_3 = polygonGeometry.Points(polygonGeometry.Points.Count -1); //第四个点  x不变y变
         pt_2 = polygonGeometry.Points(polygonGeometry.Points.Count - 2); //第三个点  全变
         pt_1 = polygonGeometry.Points(polygonGeometry.Points.Count - 3);//第二点      x变 y不变
        pt_0 = polygonGeometry.Points(polygonGeometry.Points.Count - 3);//第一点       静止
        
        //交换  
        pt_2.X = currentPos.Position.X;
        pt_2.Y = currentPos.Position.Y;
        pt_2.Z = polygonHeight; 

        pt_1.X = currentPos.Position.X;
        pt_1.Z = polygonHeight;
        pos2.X = currentPos.Position.X;

        pt_3.Y = currentPos.Position.Y;
        pt_3.Z = polygonHeight;
        pos3.Y = currentPos.Position.Y

        rectangle_depth = pos1.DistanceTo(pos3);
        rectangle_width = pos1.DistanceTo(pos2);
        _rectangle_label.Position.X = _rectangle.Position.X;
        _rectangle_label.Position.Y = _rectangle.Position.Y;
        _rectangle_label.Position.Altitude = 50;
        _rectangle_label.Position.AltitudeType = 4;
        _rectangle_label.Text = '长：' + rectangle_depth.toFixed(2).toString() + ' m 宽：' + rectangle_width.toFixed(2).toString()+' m';
        _rectangle.SetParam(5440, 1);
    }
    
};
function endDrawRectangle(Flags, x, y) { 
    if (!(eventFlag & 0x0001)){
        return;
    }
    eventFlag = 0x0000;
    SGWorld.Window.SetInputMode(0);
    SGWorld.DetachEvent("OnLButtonDown", startDrawRectangle);
    SGWorld.DetachEvent("OnFrame", drawRectangle);
    SGWorld.DetachEvent("OnRButtonDown", endDrawRectangle); 
    if (_rectangle != null) {
        _rectangle.Geometry.EndEdit();
        pt_0 = null;
        pt_1 = null;
        pt_2 = null;
        pt_3 = null;

        var wkt = _rectangle.Geometry.Wks.ExportToWKT();
        if (_callBackFun != null) {
            _callBackFun(wkt);
        }
    }
  
};

/**
 * 创建一个圆形
 * 完成后返回圆形的wkt
 * */
var _circle = null;
var circle_line = null;
var tlable = null;
function drawCircle(callback) {
    eventFlag = 0x0010;
    SGWorld.Window.SetInputMode(1);
    if (_circle != null) {
        SGWorld.Creator.DeleteObject(_circle.ID);
        _circle = null; 
    }
    if (circle_line != null) {
        SGWorld.Creator.DeleteObject(circle_line.ID);
        circle_line = null; 
    }
    if (tlable != null) {
        SGWorld.Creator.DeleteObject(tlable.ID);
        tlable = null; 
    }
    _callBackFun = callback;
    SGWorld.AttachEvent("OnLButtonDown", startDrawCircle);
    SGWorld.AttachEvent("OnFrame", drawCircleFrame);
    SGWorld.AttachEvent("OnRButtonDown", endDrawCircle); 
};
function startDrawCircle(Flags, x, y) {
    if (!(eventFlag & 0x0010)){
        return;
    }
    var startPosition = SGWorld.Window.PixelToWorld(x, y);
    if (startPosition == null) {
        return;
    }
    if (_circle == null) {
        var circle_position = startPosition.Position;
        _circle = SGWorld.Creator.CreateRegularPolygon(circle_position, 1, 100, 0xff34c53f, 0x7f80ff80, "", "circle");
        var line_wkt = ' LineString(' + circle_position.X + ' ' + circle_position.Y + ',' + circle_position.X + ' ' + circle_position.Y + ')';
        var line_geometry = SGWorld.Creator.GeometryCreator.CreateGeometryFromWKT(line_wkt);
        circle_line = SGWorld.Creator.CreatePolyline(line_geometry, 0xff80ffff, 0, "", "circleline");
        circle_line.Terrain.GroundObject = true;
        circle_line.Geometry.StartEdit();
        var labelstyle = SGWorld.Creator.CreateLabelStyle(0);
        labelstyle.FontSize = 12;
        labelstyle.TextColor.FromBGRColor(0xff80ffff);
        tlable = SGWorld.Creator.CreateLabel(circle_position, "0 m", "", labelstyle, "", "circletext");
    } else {
        SGWorld.DetachEvent("OnLButtonDown", startDrawCircle);
        SGWorld.DetachEvent("OnFrame", drawCircleFrame);
    }

 
};
function drawCircleFrame() {
    if (!(eventFlag & 0x0010)){
        return;
    }
    if (_circle != null) {
        var currentPos = SGWorld.Window.GetMouseInfo();
        var currentposition = SGWorld.Window.PixelToWorld(currentPos.X, currentPos.Y);
        var r = currentposition.Position.DistanceTo(_circle.Position);
        _circle.Radius = r;
        circle_line.Geometry.EndPoint.X = currentposition.Position.X;
        circle_line.Geometry.EndPoint.Y = currentposition.Position.Y;
        circle_line.Geometry.EndPoint.Z = currentposition.Position.Z;
        tlable.Position.X = circle_line.Position.X;
        tlable.Position.Y = circle_line.Position.Y;
        tlable.Position.Altitude = 50;
        tlable.Position.AltitudeType = 4;
        tlable.Text =r.toFixed(2).toString()+ ' m';
        
    }
}; 
function endDrawCircle() {  
    //SGWorld.DetachEvent("OnLButtonDown", startDrawCircle);
    SGWorld.DetachEvent("OnFrame", drawCircleFrame);
    SGWorld.DetachEvent("OnRButtonDown", endDrawCircle); 
    eventFlag = 0x0000;
    SGWorld.Window.SetInputMode(0);
    if (_circle != null) {
        var pos = _circle.Position;
        var circlegeometry = SGWorld.Creator.GeometryCreator.CreateGeometryFromWKT('point(' + pos.X + ' ' + pos.Y + ')');
        var wkt = circlegeometry.SpatialOperator.Buffer(_circle.Radius).Wks.ExportToWKT();
        circle_line.Geometry.EndEdit();
        _callBackFun(wkt); 
    } 
};