<?php

namespace App\Http\Resources\Mobile;

use Illuminate\Http\Resources\Json\JsonResource;

class VerificationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'message' => $this["message"],
            'credential' => $this["credential"]
        ];
    }
}
