<?php
	include ("baglan.php");

	$info = $_POST['info'];
	

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

		$sql = "SELECT * FROM users WHERE username = '$username' or email = '$email'";

		$detectSql = "SELECT count(*) FROM users WHERE username = '$username' or email = '$email'";

		$detectUSql = "SELECT count(*) FROM users WHERE username = '$username'";

		$insertSql = "INSERT INTO users (name,username,email,password,level,aim,grade,learning,using_lang) VALUES(?,?,?,?,?,?,?,?,?)";

		$detecting = $db->prepare($detectSql);
		$detecting->execute();
		$count = $detecting->fetchColumn();
		if($count != 0){
			$detecting = $db->prepare($detectUSql);
			$detecting->execute();
			$count = $detecting->fetchColumn();

			if($count!=0)
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
					$select = $db->query($sql)->fetch(PDO::FETCH_ASSOC);
					$result = ['result'=>'registryOk','user'=> $select];
				}
				else
					$result = ['result'=>'registryError'];			
			}
			else
				$result = ['result' => 'emailvalidate'];
		}

		echo json_encode($result);

	}
	else if($info == "update-base")
	{
		$data 		= json_decode($_POST['data'],true);
		$username 	= strtolower($data['username']);
		$password 	= $data['password'];
	
		$have 	= "SELECT count(*) FROM users WHERE username = '$username' and password = '$password'";
		$select = "SELECT * FROM users WHERE username = '$username' and password = '$password'";

		$isHave = $db->prepare($have);
		$isHave->execute();
		$count = $isHave->fetchColumn();
		if($count == 0)
		{
			$result = ['result'=>'notUser'];
		}
		else
		{
			$user = $db->query($select)->fetch(PDO::FETCH_ASSOC);
			$result = ['result'=>'yesUser',"user"=>$user];
		}

		echo json_encode($result);


	}





?>