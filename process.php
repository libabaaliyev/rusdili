<?php
	include ("baglan.php");

	$info = $_POST['info'];
	$data = json_decode($_POST['data'],true);

	if($info == "import-base")
		import_user($data,$db,'without-plan','-','-','-');

	else if($info == "login-base")
		login_user($data,$db);

	else if($info == "update-base")
	{
		$id = $data['id'];		
		if($id == "not-registr")
			import_user($data,$db,'without-plan','-','-','-');
		
		else
			update_user($data,$db,'without-plan','-','-','-');
		
	}
	else if($info == "update-datas")
	{
		$id 		= $data['id'];
		$plan 		= $_POST['plan'];
		$achieve 	= $_POST['achieve'];
		$skills		= $_POST['skills'];

		if($id == "not-registr")
			import_user($data,$db,'with-plan',$plan,$achieve,$skills);
		else
			update_user($data,$db,'with-plan',$plan,$achieve,$skills);
	
	}
	else if($info == "score-board")
	{
		$lang 		= $_POST['lang'];
		$id 		= $_POST['id'];
		$getting 	= $data['getting'];
		$sql 		= "SELECT users.id,users.name,users.photo,day_aim.getting FROM day_aim INNER JOIN users ON users.id = day_aim.user_id WHERE day_aim.lang = '$lang' and day_aim.getting > 0 and day_aim.time_aim = CURDATE() ORDER BY day_aim.getting DESC LIMIT 20";
		$users 		= $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
		$result 	= ['result' => $users];
		
		import_aim($db,$lang,$id,$getting,$result);
				
	}
	else if($info == "import-scoreboard") {

		$lang 		= $_POST['lang'];
		$id 		= $_POST['id'];		
		$getting 	= $data['getting'];
		
		import_aim($db,$lang,$id,$getting,'import');

	}
	else if($info == "control-version")
	{
		$lang 		= $_POST['lang'];
		$version 	= $_POST['version'];

		$control 	= $db -> query("SELECT * FROM version WHERE lang = '$lang' and vers = '$version' ")->fetch(PDO::FETCH_ASSOC);

		echo json_encode(["result" => $control]);

	}
	else if($info == "upgrade-pro")
	{
		$time 	= $_POST['timer'];
		$lang 	= $data['learning'];
		$id 	= $data['id'];
		$pro_id = uniqid(8);

		$insertsql = "INSERT INTO pro_list (user_id,lang,timer,pro_id) VALUES(?,?,?,?)";

		$i = $db->prepare($insertsql);
		$insert = $i->execute([$id,$lang,$time,$pro_id]);

		//update_user($data,$db,'without-plan','-','-','-');

		if($insert)
			echo json_encode(["result" => "pro-ok"]);
		else
			echo json_encode(["result" => "errorsomething"]);

	}

	function import_user($data,$db,$with,$plan,$achieve,$skills)
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
			update_plan($id,$plan,$db,$result,$achieve,$skills);
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

			$result = ['result'=>'yesUser',"user"=>$user,"plan"=>$planX];
		}

		echo json_encode($result);
	}

	function update_user($data,$db,$with,$plan,$achieve,$skills)
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
		$lang 		= $data['using_lang'];
		$version 	= $data['version'];

		$sql 			= "UPDATE users SET username = ? , name = ? , email = ? , password = ? , photo = ? , grade = ? , heart = ? , crown = ? , gem = ? , league = ? , using_lang = ?, version = ? WHERE id = ?";

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
				$update_ok = $update->execute([$username,$name,$email,$password,$photo,$grade,$heart,$crown,$gem,$league,$lang,$version,$id]);



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
			update_plan($id,$plan,$db,$result,$achieve,$skills);
		}
		else
			echo json_encode($result);
	}

	function update_plan($id,$plan,$db,$rs,$achieve,$skills)
	{
		$detectSql 		= "SELECT count(*) FROM learning WHERE user_id = '$id'";
		$insertsql 		= "INSERT INTO learning (user_id,plan,achieve,skills) VALUES(?,?,?,?)";
		$update 		= "UPDATE learning SET plan = ? , achieve = ? , skills = ? WHERE user_id = ?";

		$search 		= $db->prepare($detectSql); 	$search->execute();
		$count 			= $search->fetchColumn(); 

		if($count == 0){
			
				$inserting = $db->prepare($insertsql);
				$insert = $inserting->execute([$id,$plan,$achieve,$skills]);

				if($insert)					
					$result = ['result'=>'plan-add','user-result'=>$rs];
				
				else
					$result = ['result'=>"plan-error",'user-result'=>$rs];

		}
		else{

			$updating 	= $db->prepare($update);
			$update_ok 	= $updating->execute([$plan,$achieve,$skills,$id]);
			$finding 	= $db->query("SELECT * FROM learning WHERE user_id='$id'")->fetch(PDO::FETCH_ASSOC);

			if($update_ok)
				$result = ['result'=>"plan-add",'user-result'=>$rs];
			else
				$result = ['result'=>'plan-error','user-result'=>$rs];

		}
		echo json_encode($result);
	}

	function import_aim($db,$lang,$id,$getting,$action)
	{
		$time 		= date("y-m-d");
		$detect 	= "SELECT COUNT(*) FROM day_aim WHERE time_aim = CURDATE() and user_id = '$id'";
		$import 	= "INSERT INTO day_aim (user_id,getting,time_aim,lang) VALUES(?,?,?,?)";
		$update 	= "UPDATE day_aim SET getting = ? WHERE time_aim = CURDATE() and user_id = ?";

		$detecting 	= $db->prepare($detect);
		$detecting->execute();
		$count = $detecting->fetchColumn();
		if($count == 0)
		{
			$importing = $db->prepare($import);
			$insert = $importing->execute([$id,$getting,$time,$lang]);

			if($insert)
				$result = ['result' => 'updateOk'];
			else
				$result = ['result' => 'errorsomething'];
		}
		else
		{
			$updating = $db->prepare($update);
			$updateX = $updating->execute([$getting,$id]);

			if($updateX)
				$result = ['result' => 'updateOk'];
			else
				$result = ['result' => 'errorsomething'];

		}
		if($action == "import")
			echo json_encode($result);
		else
			echo json_encode($action);
	}

?>