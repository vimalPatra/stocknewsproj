<?php  
require "../../../phpController/phpController.php";


/******************************* Query Functions *******************************/

// if (year) 
function getEventsY($year)
{
	$selected1=select("SELECT * from admin_events where year=:year",array('year'=>$year));
	return $selected1;

}


// if (month, year) 
function getEventsYM($year, $month)
{
	$selected1=select("SELECT * from admin_events where month=:month and year=:year",array('month'=>$month, 'year'=>$year));

	return $selected1;

}

// if (day, month, year) 
function getEventsYMD($year, $month, $date)
{
	$selected1=select("SELECT * from admin_events where date=:date and month=:month and year=:year",array('date'=>$date,'month'=>$month,'year'=>$year));

	return $selected1;

}


//combined query
//SELECT * FROM `admin_events` WHERE (year=2017 or year=2019) and (month='oct' or month ='nov')
//SELECT * FROM `admin_events` WHERE year IN (2017,2019) and month IN('nov','oct')


function getEventsYa($year)
{
	$years = implode(",",$year);
	$selected1=selectAll("SELECT * from admin_events where year IN ($years)");
	return $selected1;

}


/********************* Problem in these two functions below ****************/
/* Problem arises when passing multiple values in array */
// if (month, year) 
// function getEventsYMa($year, $month)
// {
// 	echo "<br>************ inside ********<br>";
// 	$years = implode(",",$year);
// 	$months = implode(",",$month);
// 	print_r($years);
// 	echo "<br>";
// 	print_r($months);
// 	$selected1=select("SELECT * from admin_events where year IN($years) and month IN(:months)",array('months'=>$months));
// 	return $selected1;

// }

// // if (day, month, year) 
// function getEventsYMDa($year, $month, $date)
// {
// 	$years = implode(",",$year);
// 	$months = implode(",",$month);
// 	$dates = implode(",",$date);
// 	$selected1=select("SELECT * from admin_events where year IN (:years) and month IN (:months) and date IN (:dates)",array('years'=>$years,'months'=>$months,'dates'=>$dates));

// 	return $selected1;

// }

// All events 
function getEvents()
{
	$selected1=selectAll("SELECT * from admin_events order by year");

	return $selected1;

}




function getEventsData($yeariAr, $monthiAr, $dateiAr){
//getting arrays in parameters

$yearAr = array();


	if($yeariAr && $monthiAr && $dateiAr){	
		/*echo " year month date ";
		echo "<br>";*/
		$selected1 = getEventsYa($yeariAr);
	}
	else if($yeariAr && $monthiAr){
		/*echo " year month ";
		echo "<br>";
		print_r($monthiAr);
		echo "<br>";
		print_r($yeariAr);*/
		$selected1 = getEventsYa($yeariAr);
		/*print_r($selected1);*/
	}
	else if($yeariAr){
		/*echo " year ";
		echo "<br>";*/
		$selected1 = getEventsYa($yeariAr);
	}
	// add data 
	else{
		/*echo "all ";
		echo "<br>";*/
		$selected1 = getEvents();
	}

	

	foreach ($selected1 as $value) {
			$yearAr[]=$value['year'];
		}
		/*print_r("********************** yearAr ***************");
		print_r($yearAr);*/

		require "makejson.php";
}



// provided year, month and date

if($_SERVER['REQUEST_METHOD']=='POST')
{
	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	// echo "*********** json data ***********";
	// var_dump($dataarray);
	// echo "+=====================";
	// 	print_r($dataarray);
	// echo "****************json data ";
	// echo "<br><br>";
	$yearPrar = $dataarray->year;
	$datePrar = $dataarray->date;
	$monthPrar = $dataarray->month;

	// echo "<br>";
	// echo "************* backend data ************";
	// // print_r($year);
	// // print_r($date);
	// // print_r($month);
	// echo "<br>";
	// echo "************* backend data ************";
}
$yearProvided  = $yearPrar;
$monthProvided = $monthPrar;
$dateProvided  = $datePrar;

getEventsData($yearProvided,$monthProvided,$dateProvided);

?>