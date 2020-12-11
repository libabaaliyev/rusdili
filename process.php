<?php
	include ("baglan.php");

	$info = $_POST['info'];
	session_start();

	if($info == "import-base")
	{
		$data 		= json_decode($_POST['data'],true);
		$name 		= ucwords($data['name']);
		$username 	= strtolower($data['username']);
		$email 		= strtolower($data['email']);
		$password 	= $data['password'];
		$level 		= $data['level'];
		$aim 		= $data['aim'];
		$grade 		= $data['grade'];
		$learning	= $data['learning'];
		$lang 		= $data['use_lang'];

		$detectSql = "SELECT * FROM users WHERE username = '$username' or email = '$email'";

		$detectUSql = "SELECT * FROM users WHERE username = '$username'";

		$insertSql = "INSERT INTO users (name,username,email,password,level,aim,grade,learning,using_lang) VALUES(?,?,?,?,?,?,?,?,?)";

		$detecting = $db->query($detectSql)->fetch(PDO::FETCH_ASSOC);
		$count = count($detecting);
		if($count>1){
			$detecting = $db->query($detectUSql)->fetch(PDO::FETCH_ASSOC);;
			$count = count($detecting);

			if($count>1)
				$result = ['result'=>'existUsername'];
			else
				$result = ['result'=>'existEmail'];
		}
		else
		{
			if(filter_var($email, FILTER_VALIDATE_EMAIL))
			{
				$insert = $db->prepare($insertSql);

				$x = $insert ->execute(["$name","$username","$email","$password","$level","$aim","$grade","$learning","$lang"]);

				if($x){
					$select = $db->query($detectUSql)->fetch(PDO::FETCH_ASSOC);
					$result = ['result'=>'registryOk','user'=> $select];

					$_SESSION['username'] = $username;

				}
				else
					$result = ['result'=>'registryError'];
			
			}
			else
				$result = ['result' => 'emailvalidate'];
		}

		echo json_encode($result);

	}






?>