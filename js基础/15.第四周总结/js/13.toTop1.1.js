$(function(){
    var $win=$(window);
    var timer=null;
    var $aBtn=$("input").eq(0);
    var flag=false;
    console.log($aBtn);

    // ��������󶨹����¼�
    $win.on("scroll",computedDisplay);
    function computedDisplay(){
        if(flag){
            window.clearInterval(timer);
        }
        flag=true;
        if($win.scrollTop()>=$win.height()){
            // ��toTop�İ�ť��ʾ
            $aBtn.css("display","block");
        }else{
            // ��toTop�İ�ť����
            $aBtn.css("display","none");
        }
    }

    $aBtn.click(function(){
        var target=$win.scrollTop();
        var duration=2000;
        var interval=100;
        var step=target/duration*interval;
        timer=window.setInterval(function(){
            flag=false;
            target-=step;
            if(target<=0){
                window.clearInterval(timer);
                return;
            }
            $win.scrollTop(target);
        },interval);
    })
});