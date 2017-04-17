$(function(){

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


			// 将事件委派给 list 完成
	      	$(".rg_sl_list").on("click", ".list5 a", function(){
	      		 // $cells = $(this).parents("tr").children(),
	      			var $cells = $(this).parents(".list-item").children(),
	      				_url = $cells.eq(0).children().eq(0).prop("src"),
	      				_name = $cells.eq(1).text(),
	      				_price = $cells.eq(2).children().eq(0).children().eq(1).text(),
	      				_marketprice = $cells.eq(2).children().eq(1).children().eq(0).text(),
	      				_num = $cells.eq(5).text().trim();
	      			// 创建对象
	      			var product = {
	      				url : _url,
	      				name : _name,
						price : _price,
						marketprice : _marketprice,
						num : _num,						
						amount : 1
					};
					// 从cookie中读取数组结构
					products = $.cookie("products") || [];
					// 如果没有，添加
					var i = index(_num, products);
					if(i === -1){
						products.push(product);						
						 // 同步保存新选购商品
						$.getJSON("../php/cart.php", {action:"add", url:_url, name:_name, price:_price, marketprice:_marketprice, num:_num, amount:1, username:user});
					} else{
						products[i].amount++;
						// 修改数量
						$.getJSON("../php/cart.php", {action:"update", num:_num, amount:products[i].amount, username:user});
					}
					// 将数组保存回 cookie 中			
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

				
			//跳转详情页
				$(".rg_sl_list").on("click", ".list1", function(){
					var $cells = $(this).parents(".list-item").children(),
	      				_num = $cells.eq(5).text().trim();
	      			$.cookie("id", _num, {expires:7, path:"/"});
	      			console.log(_num);
					
					$.ajax({
    					type: "POST",
    					url: "../php/detail.php",
    					data: "id=" + _num,   
    					success:function(data){
    						console.log(data);
    						$.cookie("numproducts", data, {expires:7, path:"/"});
    						window.location.href = "detail.html";
    						console.log("aaa");
    					}
					});
				});



				$(".show").on("click", function(){
					if($(this).next().hasClass("showbox")){
						$(this).next().removeClass("showbox");
						$(this).children().eq(0).css({"background-position":"-49px -31px"});			
					} else {
						$(this).next().addClass("showbox");
					$(this).children().eq(0).css({"background-position":"-67px -31px"});
					}
				});
	      	});