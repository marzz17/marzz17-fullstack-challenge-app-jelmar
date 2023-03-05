<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redis;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'all systems are a go',
        'users' => \App\Models\User::all(),
    ]);
});

Route::get('/user-weather/{userid}/{latitude}/{longitude}', function (string $userid, string $latitude, string $longitude) {
    // Expiration would neccessary 
    // Make redis cached on middleware

    $cachedUserWeather = Redis::get('weather_' .$userid);

  if(isset($cachedUserWeather)) {
      $weather = json_decode($cachedUserWeather, FALSE);

      return response()->json([
          'status_code' => 201,
          'message' => 'Fetched from redis',
          'data' => $weather,
      ]);
  }else {

      $weather = Http::get('https://api.weather.gov/points/'.$latitude .',' .$longitude);
      Redis::set('weather_' .$userid, $weather);
    //   Redis::expire('weather_' .$userid, $weather, 10);

      return response()->json([
          'status_code' => 201,
          'message' => 'Fetched from database',
          'data' => $weather->json(),
      ]);
  }
});

