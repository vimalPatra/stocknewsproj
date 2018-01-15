<?php 

require "../../../phpController/phpController.php";

$tablename = "stock_info";

$info = array();

$info['rowspp'] = 0;

$info['pageno'] = 0;

$info['orderby'] = '';

$info['startwith'] = '';

$orderby 	= 	$info['orderby'];
$startwith 	= 	$info['startwith'];
$rowspp 	= 	$info['rowspp'];
$pageno 	= 	$info['pageno'];

$limit = $rowspp;
$offset = ($rowspp*$pageno)-($rowspp-1);
$offset=$offset-1;

// echo "******************** $startwith ***************** <br><br>";
// $selected=selectAll("SELECT * from admin_events where description like '$startwith%'");
// if($selected->rowCount())
// {
// 	foreach ($selected as $row) 
// 	{
// 		echo $row['description'];
// 		echo "<br>";
// 	}
// }


// if rows empty, return all 
// if rows something but pageno empty, return first n rows 




if(empty($rowspp) || $rowspp==0)
{
		// startwith exists
		if(!empty($info['startwith']))
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename where name like '$startwith%' order by name desc");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename where name like '$startwith%' order by name");
			}
		}

		// doesn't exists
		else
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename order by name desc");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename order by name");
			}
		}	
}

else if(empty($pageno) || $pageno==0)
{
	// startwith exists
		if(!empty($info['startwith']))
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename where name like '$startwith%' order by name desc limit $rowspp");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename where name like '$startwith%' order by name limit $rowspp");
			}
		}

		// doesn't exists
		else
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename order by name desc limit $rowspp");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename order by name limit $rowspp");
			}
		}	

	// $selected=selectAll("SELECT * from $tablename limit $rowspp");
}
else
{
	// startwith exists
		if(!empty($info['startwith']))
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename where name like '$startwith%' order by name desc limit $rowspp OFFSET $offset");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename where name like '$startwith%' order by name limit $rowspp OFFSET $offset");
			}
		}

		// doesn't exists
		else
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename order by name desc limit $rowspp OFFSET $offset");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename order by name limit $rowspp OFFSET $offset");
			}
		}	

	// $selected = selectAll("SELECT * FROM $tablename LIMIT $limit OFFSET $offset");
}

if($selected->rowCount())
	{	
		$results=$selected->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		echo $json;
		// echo "<pre>";
		// // echo $json;
		// print_r($results);
		// echo "</pre>";
	}
?>