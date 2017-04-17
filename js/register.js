$(function() { 
    	var strue = false;   		
    		// 验证用户名是否为空
    		$("#userId").on("blur", function(){
    			var userid = $("#userId").val();
    			if (userid === ""){
    				$(".one").css({"color":"red"});
    				$(".one").html("用户名不能为空");
    				$("#userId").focus();
    			} else if (!userid.match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/)) {
    				$(".one").css({"color":"red"});
    				$(".one").html("用户名格式不正确");
    				$("#userId").focus();
    			} else {
    				$(".one").html("用户名可用");
    				$(".one").css({"color":"green"});
    			}
    		});
    		
    		// 验证邮箱是否符合格式    			
    		$("#eMail").on("blur", function(){
    			var email = $("#eMail").val();
    			if (email === "") {
    				$(".two").css({"color":"red"});
    				$(".two").html("邮箱不可为空");   				
    			} else if (!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
    				$(".two").css({"color":"red"});
    				$(".two").html("邮箱格式不正确");
    				$("#eMail").focus();
    			} else {
    				$(".two").html("邮箱可用");
    				$(".two").css({"color":"green"});
    			}
    		});
    		
            
    		// 验证密码是否为空
    		$("#passWord").on("blur", function(){
    			var pword = $("#passWord").val();
    			if (pword === ""){
    				$(".three").css({"color":"red"});
    				$(".three").html("密码不能为空");				
    			} else if(!pword.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/)){
    				$(".three").html("密码格式不正确");
    				$(".three").css({"color":"red"});
    				$("#passWord").focus();
    			} else {
    				$(".three").html("密码可用");
    				$(".three").css({"color":"green"});
    			}
    		});
    			
			// 验证两次密码是否一致
			$("#repeatPassWord").on("blur", function(){
    			if ($("#passWord").val() !== $("#repeatPassWord").val()){
    				$(".four").html("两次输入密码不一致,请重新输入");
    			} else{
    				$(".four").html("密码正确");
    				$(".four").css({"color":"green"});
    			}
    		});
    			
    			
		
				//是否勾选协议
				$("#r_load_btn").on("click", function(){
					if($("#rdoRead").prop("checked") === false){
						$("#info").html("未同意萤草网协议");
						$("#info").css({"color":"red"});
						return false;
	    	 		} else {
	    	 			$("#info").html("");
	    	 		}

	    	 		if($("#userId").val() === "" || $("#passWord").val() === "" || $("#eMail").val() === ""){
	    	 			$("#info").html("信息不完整");
	    	 			$("#info").css({"color":"red"});
	    	 			return false;
	    	 		} else{
	    	 			$("#info").html("");
	    	 		}
				});

    			
			// 验证码
    			// 进入页面时加载验证码
				AJAX();

				//看不清，换一张
				$(".c_ts").on("click", function(){
					AJAX();
    			});

    			// 点图片
    			$("#img_code").on("click", function(){
    				AJAX();
    			});
		
				// 验证码ajax封装
				function AJAX(){
					var imgurl;
		    			$.ajax({
		    				type: "POST",
		    				url: "http://route.showapi.com/26-4?showapi_appid=31520&showapi_sign=c880c67cfa774877b34500ca01023b31",
		    				dataType: "json" ,
		    				success: function(data){
		    					console.log(data.showapi_res_body.text);
		    					imgurl = data.showapi_res_body.img_path;
		    					// 图片路径
		    					$("#img_code").prop("src", imgurl);	    					
		    					
		    					$("#word_code").on("blur",function(){
		    						var wordcode = $("#word_code").val();
		    						console.log(wordcode);
			    					if(wordcode === data.showapi_res_body.text){
			    						$(".five").html("验证码正确");
			    						$(".five").css({"color":"green"});
			    						strue = true;
			    					} else {
			    						$(".five").html("验证码输入不正确");
			    						$(".five").css({"color":"red"});
			    						return false;
			    					}
		    					});  					
						    }
		    			});
					}


    			// 写入数据
    			$("#r_load_btn").on("click", function(){
	    			if(strue === true){
	    				$.ajax({
						   type: "POST",
						   url: "../php/insert.php",
						   data: "username=" + $("#userId").val() + "&password=" + $("#passWord").val() + "&email=" + $("#eMail").val(),
						   success: function(data){
						     	$("#info").html(data);
						     	console.log(data);
						     	window.location.href = "login.html";
		  					}
						});
	    			}	
    			});		
    		});