/*
* �������ְ��ֲ�ͼ
*
* ˼·��
* 1�����ݻ�ȡ������
* 2�����ݰ󶨣�ʹ���ַ���ƴ�ӵķ�ʽ�������ݰ�
* 3������������
* 4������һ����ʱ����ʹ����н������ֵ�ͼƬ�ֲ���ʹ��һ��ͼƬ������ʾ��ԭ��
*   a�����������Ҫ��ʾͼƬ�Ĳ㼶�����ı�ͼƬ��indexֵ������������ͼƬ��indexֵΪ0
*   b���ı���Ҫ��ʾͼƬ��͸���ȣ�����͸����Ϊ1������������ͼƬ��͸����Ϊ0
*   c������ʹ��move����ʹ��ǰ��ʾͼƬ��͸������0��Ϊ1��������move����ִ�к󣬵��ûص��������ص�������
*      ����������ͼƬ��͸��Ϊ0
*   d�������ǰͼƬ��ʾ��Ϊ���һ�ţ���count=aDiv.length-1����ô����һ�ν��б任ǰ����count=-1;
* 5��ʹ�������ͼƬ�����л�����������ͼƬ����ʹ��count��������
*    count=0ʱ����һ���������
*    count=1ʱ���ڶ����������
*    count=2ʱ���������������
*    count=3ʱ�����ĸ��������
* 6��������룺�����ʱ�������Ұ�ť��ʾ
*    ����Ƴ���������ʱ�������Ұ�ť����
* 7���������ʱ����ͼƬ�л�
* 8��������Ұ�ť����ͼƬ�л�
*
* */
(function(){
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=oBox.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var aBtnLeft=oBox.getElementsByTagName("a")[0];
    var aBtnRight=oBox.getElementsByTagName("a")[1];
    var data=null;
    var count=0;
    var timer=null;
    var interval=2000;

    getData();
    function getData(){
        var xml=new XMLHttpRequest;
        xml.open("get","json/data.txt",false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    }

    bind();
    function bind(){
        var str1="";
        var str2="";
        for(var i=0;i<data.length;i++){
            str1+='<div><img realImg="'+data[i].imgSrc+'" alt=""/></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>';
        }
        oBoxInner.innerHTML=str1;
        oUl.innerHTML=str2;
        utils.css(aDiv[0],{
            index:1,
            opacity:1
        });
    }

    window.setTimeout(lazyLoad,200);
    function lazyLoad(){
        for(var i=0;i<aImg.length;i++){
            (function(index){
                var tmpImg=new Image;
                tmpImg.src=aImg[index].getAttribute("realImg");
                tmpImg.onload=function(){
                    aImg[index].src=this.src;
                }
            })(i);
        }
    }

    window.clearInterval(timer);
    timer=window.setInterval(autoMove,interval);
    function autoMove(){
        if(count>=aDiv.length-1){
            count=-1;
        }
        count++;
        setBanner();
    }
    function setBanner(){
        for(var i=0;i<aDiv.length;i++){
            var curEle=aDiv[i];
            if(i===count){
                utils.css(curEle,"zIndex",1);
                myAnimate(curEle,{opacity:1},500,function(){
                   var siblings=utils.siblings(this);
                    for(var j=0;j<siblings.length;j++){
                        utils.css(siblings[j],"opacity",0);
                    }
                });
                continue;
            }
            utils.css(curEle,"zIndex",0);
        }
        bannerTip();
    }

    function bannerTip(){
        for(var i=0;i<aLi.length;i++){
         aLi[i].className=i===count?"bg":"";
        }
    }

    mouseMove();
    function mouseMove(){
        oBox.onmouseover=function(){
            window.clearInterval(timer);
            aBtnRight.style.display=aBtnLeft.style.display="block";
        };
        oBox.onmouseout=function(){
            timer=setInterval(autoMove,interval);
            aBtnRight.style.display=aBtnLeft.style.display="none";
        };
    }

    handleChange();
    function handleChange(){
        for(var i=0;i<aLi.length;i++){
            (function(index){
                aLi[index].onclick=function(){
                    count=index;
                    setBanner();
                }
            })(i);
        }
    }

    leftRight();
    function leftRight(){
        aBtnRight.onclick=autoMove;
        aBtnLeft.onclick=function(){
            if(count<=0){
                count=aDiv.length;
            }
            count--;
            setBanner();
        }
    }

})();