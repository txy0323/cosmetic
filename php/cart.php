<?php
	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html;charset-utf-8");

	$action = $_GET["action"]; // 表明执行什么操作  search:查询购物车 add:添加购物车 update:修改购物车  delete:删除购物车
	$username = $_GET["username"]; // 用户名

	$connect = mysql_connect("bdm264098114.my3w.com", "bdm264098114", "Bleach10fandui");
	// 设置读写 mysql 编码
	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库 

	// 选择数据库
	mysql_select_db("bdm264098114_db");

	if ($action == "search") { // 查询指定用户的购物车
		$sql = "SELECT id, num, name, url, price, marketprice, amount FROM cart WHERE username='$username'";
		$result = mysql_query($sql);
		$arr = array();
		while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			$arr[] = $row; // 直接将 $row 添加到 $arr 数组中保存
		}

		echo json_encode($arr); // 返回值JSON格式为：[{},{},{}]
	} else if ($action == "add") { // 添加购物车
		$num = $_GET["num"];
		$name = $_GET["name"];
		$url = $_GET["url"];
		$price = $_GET["price"];
		$marketprice = $_GET["marketprice"];
		$amount = $_GET["amount"];
		
		$sql = "INSERT INTO cart VALUES (null, '$num', '$name', '$url', '$price', '$marketprice', '$amount', '$username')";
		echo "$sql";
		$result = mysql_query($sql);
		echo '{"status":2, "msg":"添加成功"}';
	} else if ($action == "update") { // 修改购物车商品数量
		$num = $_GET["num"];
		$amount = $_GET["amount"];
		$sql = "UPDATE cart SET amount='$amount' WHERE username='$username' AND num='$num'";
		$result = mysql_query($sql);
		echo '{"status":2, "msg":"修改成功"}';
	} else if ($action == "delete") { // 删除购物车商品信息
		$num = $_GET["num"];
		$sql = "DELETE FROM cart WHERE username='$username' AND num='$num'";
		$result = mysql_query($sql);
		echo '{"status":2, "msg":"删除成功"}';
	}

	mysql_close($connect);
?>