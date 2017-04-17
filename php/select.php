<?php
	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html;charset-utf-8");

	$connection = mysql_connect("bdm264098114.my3w.com", "bdm264098114", "Bleach10fandui");
	
	// 设置读写 mysql 编码
	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库 

	mysql_select_db("bdm264098114_db");

	$sql = "SELECT * FROM categories";
	$result = mysql_query($sql, $connection);
	while ($row = mysql_fetch_array($result)) {
		echo "商品类名：" . $row["name"];
	}


	mysql_close($connection);
 
?> 