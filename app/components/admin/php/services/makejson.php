<?php


//  func

	$uyear = array();
	$uyear = array_unique($yearAr);

	// events array which will contain the whole array tree for converting to json
	$yearData = array();

	// looping over unique years to populate further data
	foreach ($uyear as  $year) {
		// rows from the events table in this particular year
		$eventsInYear = getEventsY($year);

		// variable for storing all months(with events in the db) in this year
		$allMonths = array();

		// looping over event rows fetched from getEventsY in this particular year to populate an array of month
		foreach ($eventsInYear as $event) {
			$allMonths[] = $event['month'];
		}

		if($monthiAr){
			$allMonths=$monthiAr;
		}

		// filtering on the $allMonths array to get an array of unique months
		$umonth = array_unique($allMonths);

		// month data array to store data for each month in this particular year (to be saved as an item of monthData array)
		$monthData = array();

		// looping over unique months to populate further data
		foreach ($umonth as $month) {
			// rows from the events table in this particular year, month
			$eventsInMonth = getEventsYM($year,$month);

			// variable for storing all dates in this year, month 
			$allDates = array();

			// looping over event rows fetched from getEventsYM in this particular year and month to populate an array of date
			foreach ($eventsInMonth as $event) {
				$allDates[] = $event['date'];
			}

			if($dateiAr){
				$allDates=$dateiAr;
			}

			// filtering on the $allDates array to get an array of unique dates
			$udate = array_unique($allDates);

			// date data array to store data for each date in this particular month (to be saved as an item of monthData array)
			$dateData = array();

			// looping over unique dates to populate further data
			foreach ($udate as $date) {
		
				// rows from the events table in this particular year, month, date
				$eventsInDate = getEventsYMD($year,$month,$date);

				// variable for storing all events in this year, month and date 
				$allEvents = array();
				
				// looping over events rows fetched from getEventsYMD in this particular date to populate an array of events
				foreach ($eventsInDate as $event) {
						$eventRow = array();
						$eventRow['name'] = $event['name'];
						$eventRow['date'] = $event['date'];
						$eventRow['month'] = $event['month'];
						$eventRow['year'] = $event['year'];
						$eventRow['stock_id'] = $event['stock_id'];
						$eventRow['event_id'] = $event['event_id'];
						$eventRow['thumb'] = $event['thumb'];
						$eventRow['ea_type'] = $event['ea_type'];
						$eventRow['trending'] = $event['trending'];
						$eventRow['timestamp'] = $event['timestamp'];
						
						// array for storing all events as items in this particular date
						$allEvents[] = $eventRow;
				}

				// the data to be sent (date, month, year and the events object containing the collection of events) for a particular date 
				$eventData = array(
					'events' => $allEvents,
					'date' => $date,
					'month' => $month,
					'year' => $year

				);

				// pushing the $eventData for each date (saving it as an value of the dateData array date key )
				$dateData[(string)$date] = $eventData;

			}
			// pushing the $dateData for each month (saving it as an item of the monthData array)
			$monthData[(string)$month] = $dateData;
		}

		// pushing the $monthData for each month (saving it as an item of the yearData array)
		$yearData[(string)$year] = $monthData;
	}

	echo "<pre>";
	print_r($yearData);
	echo "</pre>";
	$dataSend = json_encode($yearData);


	// print_r(json_encode($dataSend));
	?>