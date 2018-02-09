$(function(){
    //获取canvas画布对象
    var ctx = $("#canvas").get(0).getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    var canX = $("#canvas").offset().left;
    var canY = $("#canvas").offset().top;
    var p_x = 0;//画笔初始坐标
    var p_y = 0;
    var img1 = [];//存储画布内容
    var img2 = [];//存储画布撤销前的内容
    var painting = false;//判断画笔状态
    var start_clear = true;//判断是否在使用橡皮擦
// console.log(canX+";"+canY)
    ctx.lineCap="round";//线条起始和结尾样式
    ctx.lineJoin="round";//线条转弯样式
    ctx.lineWidth = $("#size").val()/10;
    // console.log(ctx.lineWidth)
    //保存初始状态
    //复制图像，为了撤销
    // var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
    //加入数组
    // img1.push(imgData);
    $(".size").html(Math.floor($("#size").val()/10));

    $('#canvas').mousemove(function(e){//当鼠标在画布上移动时执行
        if(painting===true) {//判断是否是可绘画状态
            var x = e.pageX;//鼠标当前x坐标
            var y = e.pageY;//鼠标当前y坐标
            ctx.lineTo(x - canX, y - canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
            ctx.stroke();
        }
    });
    $('#canvas').mousedown(function(e){//当鼠标按下时触发
        painting = true;//鼠标按下可以作画
        p_x = e.pageX;//画笔起始x坐标
        p_y = e.pageY;//画笔起始y坐标
        ctx.beginPath();//开始作画
        ctx.moveTo(p_x-canX,p_y-canY);//画笔开始位置
        $('#canvas').css('cursor','pointer');//将鼠标图形设置成小手
        //复制图像，为了撤销
        var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
        //加入数组
        img1.push(imgData);
        // img2[0] = imgData;
    });
    $('#canvas').mouseup(function(e){
        painting = false;//鼠标松开，禁止作画
        ctx.closePath();//关闭画笔路径
        $('#canvas').css('cursor','');//消除鼠标小手

    });
    $('#canvas').mouseleave(function(e){//鼠标移出时，禁止作画
        painting = false;
        ctx.closePath();
        $('#canvas').css('cursor','');//消除鼠标小手
    });
    $("#color").change(function() {//当颜色改变时触发
        if(start_clear){
            ctx.strokeStyle = $(this).val();//改变画笔颜色
        }
    });
    $("#size").change(function() {
        if(start_clear){
            ctx.lineWidth = $(this).val()/10;
            $(".size").html(Math.floor(ctx.lineWidth));
        }else{
            ctx.lineWidth = $(this).val()/2;
            $(".size").html(Math.floor(ctx.lineWidth));
        }
        // console.log(ctx.lineWidth)
    });
    $("#start").click(function(){
        start_clear = true;
        ctx.lineWidth = $("#size").val()/10;
        $(".size").html(Math.floor(ctx.lineWidth));
        ctx.strokeStyle = $("#color").val();
        // console.log(ctx.lineWidth)
    });
    $("#clear").click(function(){
            var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
            //加入数组
            img1.push(imgData);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0,0,w,h);
    });
    $("#eraser").click(function(){
        start_clear = false;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = $("#size").val()/2;
        $(".size").html(Math.floor(ctx.lineWidth));
        // console.log(ctx.lineWidth)
    });
    $('#prev').click(function() {
        if(img1.length>0){
            img2.push(img1[img1.length-1]);
            ctx.putImageData(img1.pop(),0,0);
        }
    });
    $('#next').click(function() {
        if(img2.length>0){
            ctx.putImageData(img2[img2.length-1],0,0);
            img1.push(img2.pop());
        }
    });


});