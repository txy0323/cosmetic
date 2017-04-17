<?php

	$server = "bdm264098114.my3w.com";	//数据库
	$username = "bdm264098114";	//用户名
	$password = "Bleach10fandui";	//密码
	// 连接数据库
	$connection = mysql_connect($server, $username, $password);

	if(!$connection) {	//连接失败
		die ("error :" .mysql_error());
	}

	echo "连接成功...";


	//关闭数据库连接
	mysql_close($connection);
?>