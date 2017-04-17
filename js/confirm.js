  $(function(){
		    	// 读取登陆者的信息
         			$.cookie.json = true;
         			var user = $.cookie("user") || '';
         
       				if(user === '') {
       				  $(".shop_head_l_hy").text("[请登录]");
       				} else {
       				  // 修改登录字符
       				  $(".shop_head_l_hy").text("欢迎您，" + user);
       				  // 删除cookie
       				  $(".user_exit").on("click", function(){
       				    $.cookie("user",'',{expires:-1, path:"/"});
       				    $.cookie("products",'',{expires:-1, path:"/"});
       				  });
       				 }

		    // 编辑地址
		    	$(".car_hd_address_con_show").on("mouseenter", function(){
		    		$(".bj_ad").css({"display":"block"});
		    		$(".bj_ad").on("click", function(){
		    			Popup();
		    		});
		    	});
		    	
		    	$(".car_hd_address_con_show").on("mouseleave", function(){
		    		$(".bj_ad").css({"display":"none"});
		    	});
	    
		    //弹出层函数
		    	function Popup(){
		    		$(".car_address_revise").css({"display":"block"});
		    		$(".box").css({"display":"block"});
		    		
		    	//收货人不能为空
			    	$("#name").focus();		    	
			    	$("#name").on("blur", function(){
			    	var _name = $("#name").val();			    		
			    		if(_name === ""){
			    			$(".getname").css({"color":"red"});
			    			$(".getname").text("收货人不能为空");
			    			$("#name").focus();
			    		} else {
			    			$(".getname").text("√");
			    			$(".getname").css({"color":"green","font-size":"18px"});
			    		}
			    	});

		    	//收货详细地址不能为空
			    	$("#address").on("blur", function(){
			    	var address = $("#address").val();			    		
			    		if(address === ""){
			    			$(".address").css({"color":"red"});
			    			$(".address").text("详细地址不能为空");
			    		} else {
			    			$(".address").text("√");
			    			$(".address").css({"color":"green","font-size":"18px"});
			    		}
			    	});

			    //电话不能为空
			    	$("#mobile").on("blur", function(){	
			    	var mobile = $("#mobile").val();	    		
			    		if(mobile === ""){
			    			$(".mobile").css({"color":"red"});
			    			$(".mobile").text("联系电话不能为空");			    			
			    		} else if(!mobile.match(/^1[34578]\d{9}$/)){
			    			$(".mobile").css({"color":"red"});
			    			$(".mobile").text("号码不符合格式");		
			    		} else {
			    			$(".mobile").text("√");
			    			$(".mobile").css({"color":"green","font-size":"18px"});
			    		}
			    	});

			    	//确认地址
			    	$(".car_address_revise_btn1").on("click", function(){
			    		var _name = $("#name").val(),
			    			address = $("#address").val(),
			    			mobile = $("#mobile").val();	  
			    		// 都不为空
			    		if(_name !== "" && address !== "" && mobile !== "" && mobile.match(/^1[34578]\d{9}$/)){
			    				$(".car_address_revise").css({"display":"none"});
			    				$(".box").css({"display":"none"});
			    			
			    			var province = $("#province").val(),
			    				city = $("#city").val(),
			    				district = $("#district").val();
			    			$(".name1").text(province);
			    			$(".name2").text(city);
			    			$(".name3").text(district);
			    			$(".name4").text(" ( " + _name + " " + " " + "收" + " ) ");
			    			// 详细地址
			    			$(".address_con").text($("#address").val());
			    			//电话
			    			$(".address_tel span").text($("#mobile").val());
			    		}
			    	});
		    	}
		    	
		    // 弹出层
		    	$(".car_hd_address_add").on("click",function(){
		    		Popup();	    		
		    	});
		   
		    // 关闭弹出层
		    	$(".car_address_revise_t_close").on("click", function(){
		    		$(".car_address_revise").css({"display":"none"});
		    		$(".box").css({"display":"none"});
		    	});

		    	$(".car_address_revise_btn2").on("click", function(){
		    		$(".car_address_revise").css({"display":"none"});
		    		$(".box").css({"display":"none"});
		    	});

		    // 省市级联
		    	var addr = {};	
		    	// 存放所有省市区信息的对象
					// 将省份名称/城市名称作为对象的属性名
					/* 类似于：{
						"四川":{
							"成都":["青羊区", "武侯区"],
							"绵阳":,
							"广元":
						},
						"广东":,
						"陕西":
					}*/
			// 读取所有省市区信息
			$.getJSON("../data/addresses.json", function(data){
				// 处理省份信息
				$.each(data.regions, function(index, province){
					// 创建省份表示的对象
					addr[province.name] = {};
					// 处理城市信息
					$.each(province.regions, function(index, city){
						// 创建城市表示的对象
						addr[province.name][city.name] = [];
						// 处理区县信息
						$.each(city.regions, function(){
							addr[province.name][city.name].push(this.name);
						});
					});
				});

				// 初始化省份信息
				initProvince();		
			});

			// 初始化省份下拉列表
			function initProvince() {
				for (var attr in addr) { // attr 代表 addr 对象属性名称，即省份名
					$("#province").append("<option>"+attr+"</option>")
				}

				// 初始化城市
				initCity();
			}

			// 初始化城市下拉列表
			function initCity() {
				// 先清除城市下拉列表中原有的选项
				$("#city").empty();
				// 获取选择的省份信息
				var _prov = $("#province").val(); // "四川", "广东"
				// 遍历所有城市
				for (var attr in addr[_prov]) {
					$("#city").append("<option>"+ attr +"</option>");
				}

				// 初始化区县
				initDistrict();
			}

			// 初始化区县下拉列表
			function initDistrict() {
				$("#district").empty();
				// 获取选择的省份、城市信息
				var _prov = $("#province").val(),
					_city = $("#city").val();
				// 遍历所有区县
				var districts = addr[_prov][_city];
				for (var i in districts) {
					$("#district").append("<option>"+districts[i]+"</option>");
				}
			}

			// 省份选择发生改变，重新加载城市
			$("#province").on("change", initCity);
			// 城市选择改变后，重新加载区县信息
			$("#city").on("change", initDistrict);
			// $("#province").change(initCity);

	

		// 读取购物车中信息
			$.cookie.json = true;
			var products = $.cookie("products");

			//显示商品信息
				$.each(products, function(index, element){					
					var html = $(".pro_list:last").clone(true).data("product",element);	
					html.children(".car_gw_list_id").html(element.id);
					html.children(".car_gw_list_name").children(".car_gw_list_introduce").html(element.name);
					html.children(".car_gw_list_price").text(element.price);
					html.children(".car_gw_list_amount").text(element.amount);
					
					html.children(".car_gw_list_money").text((element.price.substr(1,element.price.length) * element.amount).toFixed(2));
					html.appendTo(".tbodylist");	
				});
				$(".tbodylist").children().eq(1).remove();


				function calcTotal() {
					var $ckbox = $(".car_gw_list_money"),
					// 累加小计 
					sum = 0;
					$ckbox.each(function(index,element){	
						sum += parseFloat($(element).text());
					});
	
				$("#orderSumTotal").text("￥" + sum.toFixed(2));
			}
				calcTotal();
	});