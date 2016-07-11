/*
* �������ֲ�ͼʵ��˼·
*
* 1��������Ҫ��ȡ����
* 2�������ݣ�������õİ󶨷�ʽΪ�ַ���ƴ��
* 3������ͼƬ������
* 4��ʵ��ͼƬ�Զ����ţ��ഴ����һ��ͼƬ����ô��ʱͼƬ��˳��Ϊ 1 2 3 4 1
*   ���ֲ��������ͼƬ֮���������� 1 �����˶����˶�����˲��ı�oBoxInner��leftֵΪ0
*   ֮���ٽ����ֲ�
* 5���ı佹�����ɫ�������Ѿ�ͨ������һ��ȫ�ֵı���count��ʵ��ͼƬ���ֲ���������ɫ�ĸı�
*    ����ͨ��count��ֵ�������жϣ���countΪ1ʱ����1����������ɫ����countΪ2ʱ����3��
*    ��������ɫ����countΪ3ʱ����4����������ɫ����countΪ4ʱ����0����������ɫ
* 6��ʵ��������룬�õ�Ƭֹͣ�ֲ���������ʾ���Ұ�ť������Ƴ����õ�Ƭ��ʼ�ֲ�����������
*    ��ť
* 7������������ͼƬ�л��������л�ʱ������Ҫͨ������count��ֵ��ʵ��ͼƬ���л�,
*   ����˼�룺���ÿ����ť��ʱ�򣬰������ť��������Ϊstep���ù�stepȥ�˶��ı�left
* 8���������ʵ��ͼͼƬ�л�������ǵ���ұߣ���ô����ֱ�ӵ���autoMove������������
*    ��ߣ���ô��Ҫ��count--�������ʱcount==0����ô˲��ı�oBoxInner��leftֵΪ
*    aLi.length����ʱ���൱��˲����ת�����һ�ź͵�һ��һ����ͼƬ��
*
* */
(function(){
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=oBox.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var aBtn=oBox.getElementsByTagName("a");
    var data=null;
    var autoTimer=null;
    var count=0;

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
        var str1="";  // ����ͼƬ���ݰ�
        var str2="";  //  ���н��㼴li���ݰ�
        for(var i=0;i<data.length;i++){
            str1+='<div><img realImg="'+data[i].imgSrc+'" alt=""/></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>';
        }
        str1+='<div><img realImg="'+data[0].imgSrc+'" alt=""/></div>';
        oBoxInner.innerHTML=str1;
        oUl.innerHTML=str2;
        utils.css(oBoxInner,"width",utils.css(aDiv[0],"width")*aDiv.length);
    }

    window.setInterval(lazyLoad,500);
    function lazyLoad(){
        for(var i=0;i<aImg.length;i++){
            var tmpImg=new Image;
            tmpImg.index=i;
            tmpImg.src=aImg[i].getAttribute("realImg");
            tmpImg.onload=function(){
                aImg[this.index].src=this.src;
            }
        }
    }

    window.clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,2000);
    function autoMove(){
        if(count>=aLi.length){
            count=0;
            utils.css(oBoxInner,"left",0);
        }
        count++;
        myAnimate(oBoxInner,{left:-count*1000},500);
        bannerTip();
    }

    function bannerTip(){
        var tmpCount=count===aLi.length?0:count;
        for(var i=0;i<aLi.length;i++){
            aLi[i].className=i===tmpCount?"bg":"";
        }
    }

    mouseMove();
    function mouseMove(){
        oBox.onmouseover=function(){
            window.clearInterval(autoTimer);
            aBtn[0].style.display=aBtn[1].style.display="block";
        };
        oBox.onmouseout=function(){
            autoTimer=setInterval(autoMove,2000);
            aBtn[0].style.display=aBtn[1].style.display="none";
        };
    }

    handleChange();
    function handleChange(){
        for(var i=0;i<aLi.length;i++){
            (function(index){
                aLi[index].onclick=function(){
                    count=index;
                    myAnimate(oBoxInner,{left:-count*1000},500);
                    bannerTip();
                }
            })(i);
        }
    }

    leftRight();
    function leftRight(){
        aBtn[1].onclick=autoMove;
        aBtn[0].onclick=function(){
            if(count<=0){
                count=aLi.length;
                utils.css(oBoxInner,"left",-count*1000);
            }
            count--;
            myAnimate(oBoxInner,{left:-count*1000},500);
            bannerTip();
        }
    }

})();
