<?php

namespace App\Http\Resources\Mobile;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            /**
             * @var int Kullanıcının id'si
             * @example 1
             */
            "id" => $this->id,

            /**
             * @var string Kullanıcının adı
             * @example Feyyaz Can
             */
            "first_name" => $this->first_name,

            /**
             * @var string Kullanıcının resmi
             * @example image.jpg
             */
            "image" => $this->image,

            /**
             * @var string Kullanıcının soyadı
             * @example Köse
             */
            "last_name" => $this->last_name,

            /**
             * @var string Kullanıcının telefon numarası
             * @example 905419232323
             */
            "phone" => $this->phone,

            /**
             * @var string Kullanıcının telefon numarasındaki telefon kodu
             * @example +90
             */
            "phone_code" => $this->phone_code,

            /**
             * @var string Kullanıcının e-posta adresi
             * @example kesemenere123@gmail.com
             */
            "email" => $this->email,


            /**
             * @var bool Kullanıcı blocklandı mı?
             * @example true
             */
            "is_blocked" => boolval($this->is_blocked),

            /**
             * @var bool Notification açık mı?
             * @example true
             */
            "is_notification" => boolval($this->is_notification),

            /**
             * @var int Kullanıcının doğum tarihi
             * @example 2001-01-23
             */
            "birthdate" => $this->birthdate,

            /**
             * @var int Kullanıcının oluşturma tarihi
             * @example 2024-07-16T16:49:41.000000Z
             */
            "created_at" => $this->created_at,

            // /**
            //  * Kullanıcının cihazları
            //  */
            // "devices" => UserDeviceResource::collection(UserDevice::where("user_id", $this->id)->orderBy('updated_at', 'desc')->get()),
        ];
    }
}
