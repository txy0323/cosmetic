<?php	

	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html;charset-utf-8");
	// 以 POST 方式获取请求中的用户名与密码
	$username = $_POST["username"];
	$password = $_POST["password"];
	$email = $_POST["email"];

	$connection = mysql_connect("bdm264098114.my3w.com", "bdm264098114", "Bleach10fandui");

	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库 

	mysql_select_db("bdm264098114_db", $connection);

	
	$sql = "SELECT * FROM users WHERE username = '$username'";
	$res = mysql_query($sql, $connection);
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
		if (!$row) {
			echo "用户名可用";
		} else {
			echo "用户名不可用";
			die (mysql_error());
		}

	$sql = "INSERT INTO users VALUES (NULL, '$username', '$password', '$email')";
	$result = mysql_query($sql);

	if (!$result)
		die ("error : " . mysql_error());

	echo "注册成功....";

	mysql_close($connection);
?>