$(function () {
        		// 读取登陆者的信息
         			$.cookie.json = true;
         			var user = $.cookie("user") || '';
         
       				if(user === '') {
       					alert('未登陆，请登录查看');
       					window.location.href = "/";
       					$(".first").text("[请登录]");
       				} else {
       				  // 修改登录字符
       				  $(".first").text("欢迎您，" + user);
       				  // 修改注册字符
       				  $(".second").css({"display":"none"});
       				  $(".user_exit").css({"display":"block", "margin-left":"20px"});
       				  $(".user_exit").text("退出");
       				  // 删除cookie
       				  $(".user_exit").on("click", function(){
       				    $.cookie("user",'',{expires:-1, path:"/"});
       				    $.cookie("products",'',{expires:-1, path:"/"});
       				      $(".first").text("登录");
       				  });
       				 }

       			
					
				//读取数据库中用户购物车信息
				$.cookie.json = true;
				$.ajax({
					url: "../php/cart.php",
					type: "get",
					data: {action:"search", username:user},
					dataType: "json",
					success:function(data){						
						$.cookie("products",data,{expires:7, path:"/"});
					}
				});
				
				//读取cookie中保存的products 
				var products = $.cookie("products") || [];
				console.log(products);
				
				// 判断购物车是否为空
					if (products.length === 0) {
					/*	alert("购物车为空，请选购商品");*/
						$(".car_noload").css({"display":"block"});
					}

				
				// 显示购物车中的商品信息
				$.each(products, function(index, element){	
					console.log(products);
							
					var html = $(".car_list_show:last").clone(true).data("product",element);
					html.children().children(".car_list_show_num").html(element.num);
					html.children().children(".car_list_show_img").children().eq(0).children().eq(0).prop("src", element.url);	
					html.children().children(".car_list_show_text").children().eq(0).text(element.name);
					html.children().children(".car_list_show_dj").children().eq(0).text(element.price);
					html.children().children(".car_list_show_dj").children().eq(1).text(element.marketprice);
					html.children().children(".car_list_show_je").children().eq(0).text((element.price.substr(0,element.price.length) * element.amount).toFixed(2));
					html.find(".add_num").val(element.amount);
					html.appendTo(".carshow");	
				});
				$(".carshow").children().eq(0).remove();
        	
			// 删除单行选购的商品:事件委派
			$(".car_list_show").on("click", ".car_list_show_cz a", function(){
				if (confirm("是否删除？")){
					var $row = $(this).parents(".car_list_show");
					// 获取数组中要删除的元素
					var product = $row.data("product");
					// 从服务器保存的数据中删除
					$.ajax({
						url: "../php/cart.php",
						type: "get",
						data: {action:"delete", username:user, num:product.num}
					});
					/* 从 cookie 中删除 */
					// 找出数组中删除元素的索引
					var index = $.inArray(product, products);
					// 从数组中删除元素
					products.splice(index, 1);
					// 覆盖保存回 cookie 中
					$.cookie("products", products, {expires:7, path:"/"});

					// 从页面 DOM 结构中移除
					$row.remove();

					//更新合计
					calcTotal();
				}
			});

			//默认全选 
			$(".list_all :checkbox").prop("checked", "checked");
				var _status = $(".list_all :checkbox").prop("checked");
				// 设置所有商品的复选框选中状态与“全选”一致
				$(".car_list_show_con :checkbox").prop("checked", _status);
				calcTotal();

			// 全选
			$(".list_all :checkbox").on("click", function(){
				// 获取 “全选” 复选框的选中状态
				var status = $(this).prop("checked");
				// 设置所有商品的复选框选中状态与“全选”一致
				$(".car_list_show_con :checkbox").prop("checked", status);
				// 计算商品总金额
				calcTotal();
			});
			
			//设置有一个未选中则全选不选中
			$(".car_list_show_con :checkbox").on("click", function() {
				$(".list_all :checkbox").prop("checked", "");
				calcTotal();
			});

			

			//设置内容复选框都选中则全全选选中
			/*	$(".carshow :checkbox").on("click", function() {
				var _rowbox = $(this).prop("checked");
					console.log($(".cartshow :checkbox").prop("checked"));
				// 计算商品总金额
				calcTotal();
			});*/
		

			
			// 点击 car_list_show_con 中复选框，计算累加的总金额
			$(".car_list_show_con").on("click", ":checkbox", function(){
				calcTotal();
			});

			
			

			function calcTotal() {
				// 获取 cart_body 中所有被选中的复选框
				var $ckbox = $(".car_list_show_con :checkbox:checked");
				// 累加每个选中复选框所在行中的小计
				var sum = 0;
				$ckbox.each(function(index, element){
					sum += parseFloat($(element).parents(".car_list_show").find(".heji").text())
				});
				
				$(".sumPrice").text("￥" + sum.toFixed(2));
			}

			// 加数量
			$(".car_list_show").on("click", ".add_z", function(){
				var $amount = $(this).prev();
				// 获取加之前的数量
				var _amount = parseInt($amount.val());
				// 将加数量后的值放回文本框中
				$amount.val(++_amount);
				// 获取当前行中缓存的商品对象
				var product = $(this).parents(".car_list_show").data("product");
				// 修改商品对象的数量
				product.amount = _amount;
				// 将 cookie 中该商品数量修改
				$.cookie("products", products, {expires:7, path:"/"});

				// 将服务器中当前修改数量的商品同步更新
				$.get("../php/cart.php", {action:"update", username:user, num:product.num, amount:_amount});

				// 更新小计
					var tol = (product.price.substr(0,product.price.length) * _amount).toFixed(2); 
					$(this).parents(".car_list_show").find(".heji").text(tol);
				//更新合计
					calcTotal();
			});

			// 减数量
			$(".car_list_show").on("click", ".add_j", function(){
				var $amount = $(this).next();
				// 获取减之前的数量
				var _amount = parseInt($amount.val());
				if (_amount <= 1)
					return;
				// 将减数量后的值放回文本框中
				$amount.val(--_amount);
				// 获取当前行中缓存的商品对象
				var product = $(this).parents(".car_list_show").data("product");
				// 修改商品对象的数量
				product.amount = _amount;
				// 将 cookie 中该商品数量修改
				$.cookie("products", products, {expires:7, path:"/"});

				// 更新小计
					var tol = (product.price.substr(0,product.price.length) * _amount).toFixed(2); 
					$(this).parents(".car_list_show").find(".heji").text(tol);
				// 更新合计
					calcTotal();
			});

			// 输入数量
			var beforeAmount = 0;
			$(".car_list_show").on("blur", ".add_num", function(){
				// 获取输入的数量值
				var _amount = $(this).val();
				// 验证数量值是否合法
				if (/^[1-9]\d*$/.test(_amount)){
					var product = $(this).parents(".car_list_show").data("product");
					product.amount = _amount;
					$.cookie("products", products, {expires:7, path:"/"});
					// 更新小计
					var tol = (product.price.substr(0,product.price.length) * _amount).toFixed(2); 
					$(this).parents(".car_list_show").find(".heji").text(tol);
					// 更新合计
					calcTotal();
				} else {
					$(this).val(beforeAmount);
				}
			}).on("focus", ".car_list_show_jj .add_num", function(){
				beforeAmount = $(this).val();
			});
        });
