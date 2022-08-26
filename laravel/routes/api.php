<?php

use App\Http\Controllers\API\AnnonceController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\PackageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\DenominationController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource("categories", CategoryController::class);
Route::apiResource("denominations", DenominationController::class);
Route::apiResource("brands", BrandController::class);
Route::apiResource("addresses", AddressController::class);
Route::apiResource("users", UserController::class);
Route::apiResource("images", ImageController::class);
Route::apiResource("packages", PackageController::class);
Route::apiResource("annonces", AnnonceController::class);

