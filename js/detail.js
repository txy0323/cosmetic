$(function(){

			$.cookie.json = true;
	        var numproducts = JSON.parse($.cookie("numproducts"));

	        console.log(numproducts);

	        $.each(numproducts, function(index, element){				
				console.log($(".ad-hd-go").children().eq(0).text());
				console.log(element.salepromotion);
			// 名字
				$(".prd-name").text(element.name);
			// 促销信息
				$(".ad-hd-go").children().eq(0).text(element.salepromotion);
			// 图片
				$(".min_1").children().eq(1).prop("src", element.small1);
				$(".min_2").children().eq(1).prop("src", element.small2);
				$(".min_3").children().eq(1).prop("src", element.small3);
				$("#small1").prop("src",element.middle1);
				$("#small2").prop("src",element.middle2);
				$("#small3").prop("src",element.middle3);
				$("#large1").prop("src",element.large1);
				$("#large2").prop("src",element.large2);
				$("#large3").prop("src",element.large3);
			//现价
				$(".dynamic-price").text(element.price);
			//市价
				$(".mark-price").children().eq(0).text("￥" + element.marketprice);
			// 国家
				$(".flag").children().eq(0).prop("src",element.country);
			//商品名称
				$(".detail-data-box").children().eq(0).children().eq(1).children().text(element.name)
			//商品品牌
				$(".detail-data-box").children().eq(1).children().eq(1).children().text(element.brand)
			//商品功效
				$(".detail-data-box").children().eq(2).children().eq(1).children().text(element.effect)
			//商品包装
				$(".detail-data-box").children().eq(3).children().eq(1).children().text(element.pack)
			//商品产地
				$(".country").text(element.countrytext)
				$(".detail-data-box").children().eq(4).children().eq(1).children().text(element.countrytext)
			//保质期
				$(".detail-data-box").children().eq(5).children().eq(1).children().text(element.deadline)
			
	        //产品详情图片
				$(".photo1").children().eq(0).prop("src", element.photo1);
			
			//产品实拍
	        	$(".photo2").children().eq(0).prop("src", element.photo2);
	        	$(".photo3").children().eq(0).prop("src", element.photo3);
	        });
			
			
    		// 切换选项卡  
    		$("#ys1").on("mouseenter", function(){
    			$("#sy1").css({"display":"block"});
    		});
    		
    		$("#ys2").on("mouseenter", function(){
    			$("#sy2").css({"display":"block"});
    			$("#sy1").css({"display":"none"});
    		});
    		
    		$("#ys3").on("mouseenter", function(){
    			$("#sy3").css({"display":"block"});
    			$("#sy2").css({"display":"none"});
    		});
    		
    		$("#ys4").on("mouseenter", function(){
    			$("#sy4").css({"display":"block"});
    			$("#sy3").css({"display":"none"});
    		});
    		
    		$("#ys5").on("mouseenter", function(){
    			$("#sy5").css({"display":"block"});
    			$("#sy4").css({"display":"none"});
    		});
    		
    		$("#ys6").on("mouseenter", function(){
    			$("#sy6").css({"display":"block"});
    			$("#sy5").css({"display":"none"});
    		});
    		
    		$("#ys7").on("mouseenter", function(){
    			$("#sy7").css({"display":"block"});
    			$("#sy6").css({"display":"none"});
    		});
    		
    		$("#ys8").on("mouseenter", function(){
    			$("#sy8").css({"display":"block"});
    			$("#sy7").css({"display":"none"});
    		});
    		
    		$("#ys9").on("mouseenter", function(){
    			$("#sy9").css({"display":"block"});
    			$("#sy8").css({"display":"none"});
    		});
    		
    		$("#new_deal_tabs li").on("mouseenter", "a" , function(e){
    			console.log(e.target)
    			var position = $(e.target).position();
    			$(".curBg").stop().animate({left:position.left},200);
    			$(".curBg").css({"width":$(e.target).width()});
    		});
    		$("#new_deal_tabs").on("mouseleave",function(){
    			$(".curBg").stop().animate({left:0},200);
    			$(".curBg").css({"width":"97px"});
    		});


    	// 放大镜
			$("#selfzoompup").mouseenter(function(){
				$("#len").css({"display" : "block"});	
				$("#large_img").css({"display" : "block"});
	
			var lenWidth = parseInt($("#len").css("width")),
				lenHeight = parseInt($("#len").css("height")),
				middleWidth = parseInt($("#selfzoompup").css("width")),
				middleHeight = parseInt($("#selfzoompup").css("height")),
				bigWidth = parseInt($("#large_img").css("width")),
				bigHeight = parseInt($("#large_img").css("height")),
				rateX = bigWidth / lenWidth,
				rateY = bigHeight / lenHeight;

			var wid = middleWidth * rateX + "px",
				hei = middleHeight * rateY + "px";
			console.log(wid, hei);

		//图片大小设置
			$(".big_img").css({"width":wid, "height":hei});		

			$("#selfzoompup").mousemove(function(e){
				var pageX = e.pageX,
					pageY = e.pageY;
					console.log(pageX,pageY); 
				
				var _top = pageY - lenHeight / 2,
					_left = pageX - lenWidth / 2;
				

			//镜头定位
				$("#len").offset({left:_left, top:_top});

			//获取镜头定位
				var posit = $("#len").position(),
				_left = posit.left,
				_top = posit.top;

				if (_left < 0)
					_left = 0;
				else if (_left > middleWidth - lenWidth)
					_left = middleWidth - lenWidth;
				if (_top < 0)
					_top = 0;
				else if (_top > middleHeight - lenHeight)
					_top = middleHeight - lenHeight;
		
				
				$("#len").css({"left":_left,"top":_top});

			//图片定位
				var ll = -_left * rateX + "px",
					rr = -_top * rateY + "px";					
				$(".big_img").css({"left":ll, "top": rr});
				});			
			});

			
			$("#selfzoompup").mouseleave(function(){
				$("#len").css({"display" : "none"});
				$("#large_img").css({"display" : "none"});			
			});


	//点击轮播
		 var tempWrap_ul = $(".tempWrap_ul").width();
			 var k = 0;
			 //向右
    		function toRight(){
				k++;
				if(k === 2){
					k = 0;
				}
				$(".tempWrap_ul").animate({left:-1 * 960 * k},1000);
			}
			
		//向左
			function toLeft(){
				console.log(k)
				k--;
				if(k === -1){
					k = 0;
				}
				$(".tempWrap_ul").animate({left:-1 * 960 * k},1000);
			}
		 
		$("#next").on("click",function(){
		 	toRight();
		});
		$("#prev").on("click",function(){    	
		 	toLeft();
		});
		
		// 楼层导航 
            // 滚动时的效果
            $(window).on("scroll", function(){
                var _offTop = $(".floor").first().offset().top,
                    winHeight = $(window).height(), 
                    scrollTop = $(window).scrollTop(); 

              // 点击导航跳转的效果
            $("#new_deal_tabs").on("click", "li", function(){
                var _index = $(this).index(); 
                var _offsetTop = $(".floor").eq(_index).offset().top;
                $("html, body").stop(true).animate({scrollTop:_offsetTop}, 500);
            });
            });

		// 划上改变图片
			$(".min_1").on("mouseenter", function(){
				$("#small1").css({"display":"block"});
				$("#small2").css({"display":"none"});					
				$("#small3").css({"display":"none"});
				$(".img1").css({"display":"block"});
				$(".img2").css({"display":"none"});
				$(".img3").css({"display":"none"});
				$(".min_1").addClass("showborder");
				$(".min_2").removeClass("showborder");
				$(".min_3").removeClass("showborder");
			});

			$(".min_2").on("mouseenter", function(){
				$("#small1").css({"display":"none"});
				$("#small2").css({"display":"block"});
				$("#small3").css({"display":"none"});
				$(".img1").css({"display":"none"});
				$(".img2").css({"display":"block"});
				$(".img3").css({"display":"none"});
				$(".min_1").removeClass("showborder");
				$(".min_2").addClass("showborder");
				$(".min_3").removeClass("showborder");
			});

			$(".min_3").on("mouseenter", function(){
				$("#small1").css({"display":"none"});
				$("#small2").css({"display":"none"});
				$("#small3").css({"display":"block"});
				$(".img1").css({"display":"none"});
				$(".img2").css({"display":"none"});
				$(".img3").css({"display":"block"});
				$(".min_1").removeClass("showborder");
				$(".min_2").removeClass("showborder");
				$(".min_3").addClass("showborder");
			});


			//数字加减
			$(".more").on("click",function(){
				var sum = $(".num input").prop("value");
					sum++;
				$(".num input").prop("value", sum);					
			});

			$(".less").on("click",function(){
				var sum = $(".num input").prop("value");
					sum--;
					$(".num input").prop("value", sum);	
				if (sum <= 0){
					$(".num input").prop("value", 0);
				}									
			});


			//边框有无
			$(".size-con").on("click","a",function(){
				if($(".size-con a").hasClass("borde")){
					$(".size-con a").removeClass("borde");
				}
				$(this).addClass("borde");
			});	

			// 吸顶
			 $(window).on("scroll", function(){
            	var _offTop = $(".tmc_tit").first().offset().top, 
                scrollTop = $(window).scrollTop(); 
                if(scrollTop > 1150) {
                	$(".tmc_tit").addClass("fixed");
                } else{
                	$(".tmc_tit").removeClass("fixed");
                }
            });

			//添加购物车
			$(".buy-cart").on("click", function(){
				var $cells = $(this).parents().eq(1),
					$url = $(this).parents().eq(2),	
					_url = $url.children().children().children(".big-img-box").children().prop("src");	
      				_name = $cells.children(".prd-name").text(),
      				_price = $cells.children().children().children(".dynamic-price").text(),	      			
      				_marketprice =$cells.children().children().children(".mark-price del").text().substr(1),      				
      				_amount = $cells.children().children(".num").children("input").val(),
      				_num = $cells.children(".pro_num").text();
      				console.log($cells.children(".pro_num"));
				// 创建对象
      			var product = {
      				url : _url,
      				name : _name,
					price : _price,
					marketprice : _marketprice,
					num : _num,
					amount:_amount						
				};
				
				// 从cokkie中读取数组结构
				$.cookie.json = true;
				var user = $.cookie("user") || "";
				var products = $.cookie("products") || [];
				console.log(typeof products);
				// 如果有，修改数量
				var i = index(_num, products);
				
			
				if( i === -1){
					products.push(product);						
					 // 同步保存新选购商品
					$.getJSON("../php/cart.php", {action:"add", url:_url, name:_name, price:_price, marketprice:_marketprice, num:_num, amount:1, username:user});
				} else{
					products[i].amount++;
					// 修改数量
					$.getJSON("../php/cart.php", {action:"update", num:_num, amount:products[i].amount, username:user});
				}
				
				//将数组保存回 cookie 中
				$.cookie("products", products, {expires:7, path:"/"});
				alert("添加成功");
      		});

      		// 查找 _num 对应商品在 products 数组中的索引
			function index(_num, products) {
					var index = -1;
					$.each(products, function(i){
						if (_num === this.num) { // _id 商品已被选购
							index = i;
							return false;
						}
					});
	
					return index;
				}
		});