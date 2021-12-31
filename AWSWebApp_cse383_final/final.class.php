<?php 
class final_rest
{

/**
 * @api  /api/v1/setTemp/
 * @apiName setTemp
 * @apiDescription Add remote temperature measurement
 *
 * @apiParam {string} location
 * @apiParam {String} sensor
 * @apiParam {double} value
 *
 * @apiSuccess {Integer} status
 * @apiSuccess {string} message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":0,
 *              "message": ""
 *     }
 *
 * @apiError Invalid data types
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":1,
 *              "message":"Error Message"
 *     }
 *
 */
	// function for insert data into REST server
	public static function setTemp ($date, $location, $low, $high, $forecast)
	{
		if (!is_numeric($location)) {
			$retData["status"]=1;
			$retData["message"]="'$location' is not numeric";
		}
		else {
			try {
				EXEC_SQL("insert into temperature (location, date, DateRequested, Low, High, Forecast) values (?,?,CURRENT_TIMESTAMP,?,?,?)", $location, $date, $low, $high, $forecast);
				$retData["status"]=0;
				$retData["message"]="insert of High '$high', Low '$low', Forecast '$forecast' for location: '$location' at 'CURRENT_TIMESTAMP' accepted";
			}
			catch  (Exception $e) {
				$retData["status"]=1;
				$retData["message"]=$e->getMessage();
			}
		}

		return json_encode ($retData);
	}

	// function for recieveing forecast data from REST server
	public static function getTemp ($date=' ', $sort){
		try {
			if($sort == 1){
				$retData["status"] = 0;
				$retData["message"] = "success";
				$retData["result"] = 
				GET_SQL("select * from temperature where date=? order by location,dateRequested",$date);
			}else if($sort == 2){
				$retData["status"] = 0;
				$retData["message"] = "success";
				$retData["result"] =
				GET_SQL("select * from temperature where date=? order by dateRequested,location", $date);
			} else {
				$retData["status"] = 1;
				$retData["message"] = "unrecognized sort value";
			}
		} catch (exception $e){
			$retData["status"]=1;
			$retData["message"]=$e->getMessage();
		}
		return json_encode ($retData);
	}
}

