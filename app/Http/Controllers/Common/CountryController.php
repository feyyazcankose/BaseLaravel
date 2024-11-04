<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Http\Resources\CountryResource;

/**
 * @tags Common
 */
class CountryController extends Controller
{
    /**
     * List Country
     *
     * Bu servis tüm ülkeleri listelemektedir.
     * @unauthenticated
     */
    public function index()
    {
        $countries = Country::all();
        return CountryResource::collection($countries);
    }
}
