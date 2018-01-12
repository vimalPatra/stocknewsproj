<?php 

require "../../../phpController/phpController.php";

$tablename = "admin_events";

$info = array();

$info['rowspp'] = 0;

$info['pageno'] = 0;

$info['orderby'] = 'desc';

$info['startwith'] = 't';

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
				$selected=selectAll("SELECT * from $tablename where description like '$startwith%' order by description desc");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename where description like '$startwith%' order by description");
			}
		}

		// doesn't exists
		else
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename order by description desc");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename order by description");
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
				$selected=selectAll("SELECT * from $tablename where description like '$startwith%' order by description desc limit $rowspp");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename where description like '$startwith%' order by description limit $rowspp");
			}
		}

		// doesn't exists
		else
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename order by description desc limit $rowspp");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename order by description limit $rowspp");
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
				$selected=selectAll("SELECT * from $tablename where description like '$startwith%' order by description desc limit $rowspp OFFSET $offset");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename where description like '$startwith%' order by description limit $rowspp OFFSET $offset");
			}
		}

		// doesn't exists
		else
		{
			// orderby exists
			if(!empty($info['orderby']))
			{
				$selected=selectAll("SELECT * from $tablename order by description desc limit $rowspp OFFSET $offset");
			}
			else
			{
				$selected=selectAll("SELECT * from $tablename order by description limit $rowspp OFFSET $offset");
			}
		}	

	// $selected = selectAll("SELECT * FROM $tablename LIMIT $limit OFFSET $offset");
}

if($selected->rowCount())
	{	
		$results=$selected->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		// echo $json;
		echo "<pre>";
		// echo $json;
		print_r($results);
		echo "</pre>";
	}
?>