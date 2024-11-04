<?php

namespace App\Http\Resources\Mobile;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthResponseResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'accessToken' => $this["accessToken"],
            'user' => new UserResource($this["user"]),
        ];
    }
}
