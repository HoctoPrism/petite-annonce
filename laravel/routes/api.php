<?php

use App\Http\Controllers\API\AnnonceController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\PackageController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('current-user', 'currentUser');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('categories', 'index');
    Route::get('categories/{category}', 'show');
    Route::post('categories', 'store')->middleware('auth:api');
    Route::patch('categories/{category}', 'update')->middleware('auth:api');
    Route::delete('categories/{category}', 'destroy')->middleware('auth:api');
});

Route::controller(DenominationController::class)->group(function () {
    Route::get('denominations', 'index');
    Route::get('denominations/{denomination}', 'show');
    Route::post('denominations', 'store')->middleware('auth:api');
    Route::patch('denominations/{denomination}', 'update')->middleware('auth:api');
    Route::delete('denominations/{denomination}', 'destroy')->middleware('auth:api');
});

Route::controller(BrandController::class)->group(function () {
    Route::get('brands', 'index');
    Route::get('brands/{brand}', 'show');
    Route::post('brands', 'store')->middleware('auth:api');
    Route::patch('brands/{brand}', 'update')->middleware('auth:api');
    Route::delete('brands/{brand}', 'destroy')->middleware('auth:api');
});

Route::controller(AddressController::class)->group(function () {
    Route::get('addresses', 'index');
    Route::get('addresses/{address}', 'show');
    Route::post('addresses', 'store')->middleware('auth:api');
    Route::patch('addresses/{address}', 'update')->middleware('auth:api');
    Route::delete('addresses/{address}', 'destroy')->middleware('auth:api');
});

Route::controller(ImageController::class)->group(function () {
    Route::get('images', 'index');
    Route::get('images/{image}', 'show');
    Route::post('images', 'store')->middleware('auth:api');
    Route::patch('images/{image}', 'update')->middleware('auth:api');
    Route::delete('images/{image}', 'destroy')->middleware('auth:api');
});

Route::controller(PackageController::class)->group(function () {
    Route::get('packages', 'index');
    Route::get('packages/{package}', 'show');
    Route::post('packages', 'store')->middleware('auth:api');
    Route::patch('packages/{package}', 'update')->middleware('auth:api');
    Route::delete('packages/{package}', 'destroy')->middleware('auth:api');
});

Route::controller(AnnonceController::class)->group(function () {
    Route::get('annonces', 'index');
    Route::get('annonces/{annonce}', 'show');
    Route::post('annonces', 'store')->middleware('auth:api');
    Route::patch('annonces/{annonce}', 'update')->middleware('auth:api');
    Route::delete('annonces/{annonce}', 'destroy')->middleware('auth:api');
});

Route::apiResource("users", UserController::class)->middleware('auth:api');

