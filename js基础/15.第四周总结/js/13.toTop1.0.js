$(function(){
    var $win=$(window);
    var timer=null;
    var $aBtn=$("input").eq(0);
    console.log($aBtn);

    // ��������󶨹����¼�
    $win.on("scroll",computedDisplay);
    function computedDisplay(){
        if($win.scrollTop()>=$win.height()){
            // ��toTop�İ�ť��ʾ
            $aBtn.css("display","block");
        }else{
            // ��toTop�İ�ť����
            $aBtn.css("display","none");
        }
    }

    $aBtn.click(function(){
        $aBtn.css("display","none");
        // ��������¼�
        $win.off("scroll");
        var target=$win.scrollTop();
        var duration=1000;
        var interval=10;
        var step=target/duration*interval;
        timer=window.setInterval(function(){
            target-=step;
            if(target<=0){
                window.clearInterval(timer);
                $win.on("scroll",computedDisplay);
                return
            }
            $win.scrollTop(target);
        },interval);
    })
});