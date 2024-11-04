<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\Town;
use App\Http\Resources\TownResource;

/**
 * @tags Common
 */
class TownController extends Controller
{
    /**
     * List Town
     *
     * Bu servis verilen şehir ID'sine göre ilçeleri listelemektedir.
     * @unauthenticated
     */
    public function index($cityId)
    {
        $towns = Town::where('city_id', $cityId)->get();
        return TownResource::collection($towns);
    }
}
