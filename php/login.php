<?php
	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html;charset-utf-8");

	$username = $_POST["username"];
	$password = $_POST["password"];

	$connection = mysql_connect("bdm264098114.my3w.com", "bdm264098114", "Bleach10fandui");
	
	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库 

	mysql_select_db("bdm264098114_db");

	// SQL 语句
	$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
	// 发送 SQL 语句执行
	$result = mysql_query($sql, $connection);
	// 得到查询结果集中的行
	$row = mysql_fetch_array($result, MYSQL_ASSOC);
	
	if (!$row) {
		echo "0";	//用户名或密码错误
	} else {
		echo "登录成功<br>";
		echo json_encode($row);
	}

	mysql_close($connection);
?>