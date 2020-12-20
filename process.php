<?php
	include ("baglan.php");

	$info = $_POST['info'];
	$data = json_decode($_POST['data'],true);

	if($info == "import-base")
		import_user($data,$db,'without-plan','-');

	else if($info == "login-base")
		login_user($data,$db);

	else if($info == "update-base")
	{
		$id = $data['id'];		
		if($id == "not-registr")
			import_user($data,$db,'without-plan','-');
		
		else
			update_user($data,$db,'without-plan','-');
		
	}
	else if($info == "update-datas")
	{
		$id 		= $data['id'];
		$plan 		= $_POST['plan'];

		if($id == "not-registr")
			import_user($data,$db,'with-plan',$plan);
		else
			update_user($data,$db,'with-plan',$plan);
	
	}



	function import_user($data,$db,$with,$plan)
	{
		$name 		= ucwords($data['name']);
		$username 	= strtolower($data['username']);
		$email 		= strtolower($data['email']);
		$password 	= $data['password'];
		$level 		= $data['level'];
		$aim 		= $data['aim'];
		$grade 		= $data['grade'];
		$learning	= $data['learning'];
		$lang 		= $data['use_lang'];

		$sql 		= "SELECT * FROM users WHERE username = '$username' or email = '$email'";		

		$detectSql 	= "SELECT count(*) FROM users WHERE username = '$username' or email = '$email'";

		$detectUSql = "SELECT count(*) FROM users WHERE username = '$username'";

		$insertSql 	= "INSERT INTO users (name,username,email,password,level,aim,grade,learning,using_lang) VALUES(?,?,?,?,?,?,?,?,?)";

		$detecting 	= $db->prepare($detectSql);
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
					$select 	= $db->query($sql)->fetch(PDO::FETCH_ASSOC);
					
					$result 	= ['result'=>'registryOk','user'=> $select,'plan'=>'[]'];
				}
				else
					$result = ['result'=>'registryError'];			
			}
			else
				$result = ['result' => 'emailvalidate'];
		}

		if($with == "with-plan")
		{
			update_plan($id,$plan,$db,$result);
		}
		else
			echo json_encode($result);

	}

	function login_user($data,$db)
	{
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
			$user 	= $db->query($select)->fetch(PDO::FETCH_ASSOC);
			$id 	= $user['id'];

			$planX 	= $db->query("SELECT * FROM learning WHERE user_id = '$id'")->fetch(PDO::FETCH_ASSOC);
			$plan 	= json_decode($planX['plan']);

			$result = ['result'=>'yesUser',"user"=>$user,"plan"=>$plan];
		}

		echo json_encode($result);
	}

	function update_user($data,$db,$with,$plan)
	{
		$id 		= $data['id'];
		$name 		= ucwords($data['name']);
		$username 	= strtolower($data['username']);
		$email 		= strtolower($data['email']);
		$password 	= $data['password'];
		$photo 		= $data['photo'];
		$grade 		= $data['grade'];
		$gem 		= $data['gem'];
		$heart 		= $data['heart'];
		$crown 		= $data['crown'];
		$league		= $data['league'];

		$sql 			= "UPDATE users SET username = ? , name = ? , email = ? , password = ? , photo = ? , grade = ? , heart = ? , crown = ? , gem = ? , league = ? WHERE id = ?";

		$findingUpdate 	= "SELECT * FROM users WHERE id = '$id'";

		$detectSql 		= "SELECT count(*) FROM users WHERE username = '$username' or email = '$email'";

		$detectUSql 	= "SELECT count(*) FROM users WHERE username = '$username'";

		$detectMSql 	= "SELECT count(*) FROM users WHERE email = '$email'";

		
		$which = '';
		$finding = $db->query($findingUpdate)->fetch(PDO::FETCH_ASSOC);

		if($username == $finding['username'])
		{
			if($email == $finding['email'])
			{
				$count = 0;
			}
			else
			{
				$detecting 		= $db->prepare($detectMSql);

				$detecting->execute();

				$count = $detecting->fetchColumn();

				$result = ['result'=>'existEmail'];
			}
		}
		else
		{
			if($email == $finding['email']){
				$detecting 		= $db->prepare($detectUSql);
				$result = ['result'=>'existUsername'];
			}

			else
				$detecting 		= $db->prepare($detectSql);

			$detecting->execute();

			$count = $detecting->fetchColumn();
		}

		if($count == 0){

			
			if(filter_var($email, FILTER_VALIDATE_EMAIL))
			{
				$update = $db->prepare($sql);
				$update_ok = $update->execute([$username,$name,$email,$password,$photo,$grade,$heart,$crown,$gem,$league,$id]);



				if($update_ok){
					$finding = $db->query($findingUpdate)->fetch(PDO::FETCH_ASSOC);
					$result = ['result'=>'updateOk','user'=>$finding];
				}
				else
					$result = ['result'=>'updateError'];

			}
			else
				$result = ['result'=>'emailvalidate'];
		}

		if($with == "with-plan")
		{
			update_plan($id,$plan,$db,$result);
		}
		else
			echo json_encode($result);
	}

	function update_plan($id,$plan,$db,$rs)
	{
		$detectSql 		= "SELECT count(*) FROM learning WHERE user_id = '$id'";
		$insertsql 		= "INSERT INTO learning (user_id,plan) VALUES(?,?)";
		$update 		= "UPDATE learning SET plan = ? WHERE user_id = ?";

		$search 		= $db->prepare($detectSql); 	$search->execute();
		$count 			= $search->fetchColumn(); 

		if($count == 0){
			
				$inserting = $db->prepare($insertsql);
				$insert = $inserting->execute([$id,$plan]);

				if($insert)					
					$result = ['result'=>'plan-add','user-result'=>$rs];
				
				else
					$result = ['result'=>"plan-error",'user-result'=>$rs];

		}
		else{

			$updating 	= $db->prepare($update);
			$update_ok 	= $updating->execute([$plan,$id]);
			$finding 	= $db->query("SELECT * FROM learning WHERE user_id='$id'")->fetch(PDO::FETCH_ASSOC);

			if($update_ok)
				$result = ['result'=>"plan-add",'user-result'=>$rs];
			else
				$result = ['result'=>'plan-error','user-result'=>$rs];

		}
		echo json_encode($result);
	}

?>