<?php 
// header('Content-Type: application/json');
 
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$name = $dataarray->name;
	$name = strtolower($name); // stock name lower case
	$title = $dataarray->title;
	$description = $dataarray->desc;
	$sources = $dataarray->sources;
	$date = $dataarray->date;
	$month = $dataarray->month;
	$year = $dataarray->year;
	// $rank = $dataarray->rank;
	// $thumb = $dataarray->thumb;
	$ea = $dataarray->ear;
	$trending=0;
	if(!empty($dataarray->trending))
	{
		$trending = 1;
	}


	//inserting stock data

	// $inserted1=insert("INSERT INTO stock_info(name, thumb) values(:name, :thumb)",
	// 	array('name'=>$name,
	// 		'thumb'=>$thumb
	// 	));

	$err = 0;
	$status="";
	$stock_check = 0; // flag to check stock existance

	$selected1	=	selectAll("SELECT * FROM stock_info");

	$stock_id;
	
	if($selected1->rowCount())
	{
		foreach ($selected1 as $row1) 
		{
			if($row1['name']==$name)
			{
				$stock_id=$row1['stock_id'];
				$stock_check = 1;
			}
		}
	}
	else
	{
		// $err = 1; 
		$status = "selected1 false";
	}

	// if stock exists

	if($stock_check)
	{

		// insert events data
	$inserted1=insert("INSERT INTO admin_events(name,title,description,sources,stock_id,date,month,year,ea_type,trending) values(:name,:title,:description,:sources,:stock_id,:date,:month,:year,:ea,:trending)",
		array(
			'name'=>$name,
			'title'=>$title,
			'description'=>$description,
			'sources'=>$sources,
			'stock_id'=>$stock_id,
			'date'=>$date,
			'month'=>$month,
			'year'=>$year,
			'ea'=>$ea,
			'trending'=>$trending
		));
				if(!$inserted1)
				{
					$err = 1;
					$status = "inserted1 false ";
				}
				else
				{
					$nname = "Successfully uploaded an Event/Announcement about $name";
					$ndescription = "$title";
					$ntype = "Event/Announcement box";
					$nlinked = 0;
					$nlink = "null";

					insert("INSERT INTO notifications (name,description,type,linked,link) values(:name,:description,:type,:linked,:link)",
						array('name'=>$nname,
					'description'=>$ndescription,
					'type'=>$ntype,
					'linked'=>$nlinked,
					'link'=>$nlink));
				}
	}
	
	// if stock doesn't exists
	else
	{
		// insert stock info
		$inserted2 = insert("INSERT INTO stock_info(name) values(:name)",array(
		'name'=>$name));
		
		if($inserted2)
		{
					// stock added notification 

					$nname = "Successfully added a new stock ";
					$ndescription = "$name";
					$ntype = "Event/Announcement box";
					$nlinked = 0;
					$nlink = "null";

					insert("INSERT INTO notifications (name,description,type,linked,link) values(:name,:description,:type,:linked,:link)",
						array('name'=>$nname,
					'description'=>$ndescription,
					'type'=>$ntype,
					'linked'=>$nlinked,
					'link'=>$nlink));

					// add thumbnail to new stock

					$nname = "Set the Thumbnail for";
					$ndescription = "$name";
					$ntype = "Stock Info";
					$nlinked = 1;
					$nlink = "some link";

					insert("INSERT INTO notifications (name,description,type,linked,link) values(:name,:description,:type,:linked,:link)",
						array('name'=>$nname,
					'description'=>$ndescription,
					'type'=>$ntype,
					'linked'=>$nlinked,
					'link'=>$nlink));


			//fetching stock_id

			$selected2 = select("SELECT * from stock_info where name=:name",array('name'=>$name));
			
			if($selected2->rowCount())
			{
				$row2 = $selected2->fetch();
				$stock_id=$row2['stock_id']; // stock_id fetched

					// insert events data
					$inserted=insert("INSERT INTO admin_events(name,title,description,sources,stock_id,date,month,year,ea_type,trending) values(:name,:title,:description,:sources,:stock_id,:date,:month,:year,:ea,:trending)",
						array(
							'name'=>$name,
							'title'=>$title,
							'description'=>$description,
							'sources'=>$sources,
							'stock_id'=>$stock_id,
							'date'=>$date,
							'month'=>$month,
							'year'=>$year,
							'ea'=>$ea,
							'trending'=>$trending
						));

					//notification

					$nname = "Successfully uploaded an Event/Announcement about $name";
					$ndescription = "$title";
					$ntype = "Event/Announcement box";
					$nlinked = 0;
					$nlink = "null";

					insert("INSERT INTO notifications (name,description,type,linked,link) values(:name,:description,:type,:linked,:link)",
						array('name'=>$nname,
					'description'=>$ndescription,
					'type'=>$ntype,
					'linked'=>$nlinked,
					'link'=>$nlink));

			}
			else{
				$err = 1;
				$status = "selected2 false ";
			}
		}
		else{
			$err = 1;
			$status = "inserted2 false";
		}
	}

	if($err){
		echo $status;
	}
	else{
		echo 1;
	}
}
?>