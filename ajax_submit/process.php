<?php
	header('Content-type:text/html;charset=utf-8');
	header('Cache-Control:no-cache');
	$username=$_POST['userName'];
	if($username=='tangbc'||$username=='admin'){
		echo "<b>sorry</b>";
	}else{
		echo '<b>congratulation</b>';
	}
?>