<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Http\Resources\CityResource;

/**
 * @tags Common
 */
class CityController extends Controller
{
    /**
     * List City
     *
     * Bu servis verilen ülke ID'sine göre şehirleri listelemektedir.
     * @unauthenticated
     */
    public function index($countryId)
    {
        $cities = City::where('country_id', $countryId)->get();
        return CityResource::collection($cities);
    }
}
