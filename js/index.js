//轮播图
	$(function(){
		var i=0;
		var imgWidth = $("#carousel li").width();
		var clone = $("#carousel li").first().clone(true);
		$("#carousel").append(clone);
		var len = $("#carousel li").length;
		console.log(len);

		// 小圆点划上事件
		$("#slidebutton span").first().addClass("on");
		$("#slidebutton span").on("mouseenter", function(){
			i = $(this).index();
			clearInterval(timer);
			$(".banner ul").stop().animate({left:-i*imgWidth}, 200);
			$(this).addClass("on").siblings().removeClass("on");
		});
	
		//鼠标进入停止轮播，移出开始轮播
		$(".banner").mouseenter(function(){
			clearInterval(timer);
		});
		$(".banner").mouseleave(function(){
			timer = setInterval(function(){
				Toleft();
			}, 3000)
		});
		//定时器
		var timer = setInterval(function(){
			Toleft();
		}, 3000)

		//图片向左移动：后翻
		function Toleft(){
			i++;
			//i代表第i+1张图片,i = len,len-1代表应该跳转的位置和clone的第一张图片
			if(i === len){
				$(".banner ul").css({left:0});
				i = 1;
			}
			$(".banner ul").stop().animate({left:-i*imgWidth}, 300);
			if(i === len - 1){
				$("#slidebutton span").eq(0).addClass("on").siblings().removeClass("on");
			}else{
				$("#slidebutton span").eq(i).addClass("on").siblings().removeClass("on");
			}

		}
		//图片向右移动：前翻
		function Toright(){
			i--;
			if(i === -1){
				$(".banner ul").css({left:-(len-1)*imgWidth});
				i = len - 2; 
			}
			$(".banner ul").stop().animate({left:-i*imgWidth}, 300);
			$("#slidebutton span").eq(i).addClass("on").siblings().removeClass("on");
		}
		
	//用户名
        $(".user_exit").css({"display":"none"});
        // 读取cookie 中保存的用户名信息
          $.cookie.json = true;
          var user = $.cookie("user") || '';
        
        if(user === '') {
          $(".user_login").text("登录");
        } else {
          // 修改登录字符
          $(".user_login").text("欢迎您，" + user);
          // 修改注册字符
          $(".user_reg").css({"display":"none"});
          $(".user_exit").css({"display":"block"});
          $(".user_exit").text("退出");
          // 删除cookie
          $(".user_exit").on("click", function(){
            $.cookie("user",'',{expires:-1, path:"/"});
            $.cookie("products",'',{expires:-1, path:"/"});
              $(".user_login").text("登录");
          });
         }
          

        // 楼层导航 
            // 滚动时的效果
            $(window).on("scroll", function(){
                var _offTop = $(".floor").first().offset().top,
                    winHeight = $(window).height(), 
                    scrollTop = $(window).scrollTop(); 
                    console.log(scrollTop);

                if (scrollTop > _offTop - winHeight / 5) {
                    $(".leftnav ul").show(); 
                } else {
                    $(".leftnav ul").hide(); 
                }

                $(".floor").each(function(index, element){
                    // 获取当前楼层距离文档顶部的高度
                    var _offsetTop = $(element).offset().top
                    // 判断与窗口滚动距离的关系
                    if (scrollTop > _offsetTop - winHeight / 5) {
                        $(".leftnav ul li").eq(index).children("a").addClass("show").end()
                            .siblings().children("a").removeClass("show");
                    }
                });
            });

            // 点击导航跳转的效果
            $(".leftnav ul").on("click", "li", function(){
                var _index = $(this).index(); 
                var _offsetTop = $(".floor").eq(_index).offset().top;
                $("html, body").stop(true).animate({scrollTop:_offsetTop}, 500);
            });

            // 导航移入移出效果
            $(".leftnav ul li").hover(function(){
                $(this).children("a").addClass("show");
            }, function(){
                if ($(".show").length > 1)
                    $(this).children("a").removeClass("show");
            });

            // 倒计时
            var sum = 36000;
              id = setInterval(function(){
                var seconds = ("0" + Math.floor(sum / 10 % 60)).slice(-2),
                    minutes = ("0" + Math.floor(sum / 600) % 60).slice(-2);
                    summin = sum % 10;
                $(".minutes").text(minutes);
                $(".seconds").text(seconds);
                $(".ime_min").text(summin);

              sum--;
              // console.log(result);
              
              if(sum < 0)
                clearInterval(id);

              },100);

          //天气
              $.ajax({
                type: "POST",
                url: "http://route.showapi.com/9-8?showapi_appid=31702&showapi_sign=7f4dd3f509dd4ce2841774ad2aea334b&",  
                dataType: "json" ,
                success: function(data){
                  console.log(data);
                }
              });		
		});
	
