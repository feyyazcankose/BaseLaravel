<?php

namespace App\Core\Helpers\Filter;


use Illuminate\Http\Resources\Json\JsonResource;

class FilterTableMetaResource extends JsonResource
{
    /**
     * Kaynağı bir diziye dönüştür.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            /**
             * @var int Toplam öğe sayısı
             * @example 100
             */
            'totalItems' => $this['totalItems'],

            /**
             * @var int Bu sayfada bulunan öğe sayısı
             * @example 10
             */
            'itemCount' => $this['itemCount'],

            /**
             * @var int Sayfa başına düşen öğe sayısı
             * @example 10
             */
            'itemsPerPage' => (int) $this['itemsPerPage'],

            /**
             * @var int Toplam sayfa sayısı
             * @example 10
             */
            'totalPages' => ceil($this['totalItems'] / (int) $this['itemsPerPage']),

            /**
             * @var int Geçerli sayfa numarası
             * @example 1
             */
            'currentPage' => (int) $this['currentPage'],
        ];
    }
}
