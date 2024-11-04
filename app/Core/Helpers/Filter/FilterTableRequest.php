<?php

namespace App\Core\Helpers\Filter;

use Illuminate\Foundation\Http\FormRequest;

class FilterTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Yetkilendirme gerekliyse bu değeri değiştirin
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            /**
             * Veritabanından veya bir koleksiyondan belirli bir sayıda kayıt atlamak için kullanılır.
             * Sayfalama işlemi sırasında ilk birkaç kaydı atlayarak, sonraki kayıtları getirmek için kullanılır.
             * @var string
             * @example "10"
             */
            'skip' => 'sometimes|string',

            /**
             * Veritabanından veya bir koleksiyondan belirli bir sayıda kayıt almak için kullanılır.
             * Sayfalama işlemi sırasında bir sayfada kaç kayıt gösterileceğini belirtmek için kullanılır.
             * @var string
             * @example "25"
             */
            'take' => 'sometimes|string',

            /**
             * Verilerin belirli bir kritere göre sıralanması gerektiğinde kullanılır.
             * Bir listeyi artan veya azalan şekilde sıralamak için kullanılabilir.
             * @var string
             * @example "name,asc" veya "created_at,desc"
             */
            'sort' => 'sometimes|string',

            /**
             * Listedeki alanları gruplamak için kullanılır.
             * @var string
             * @example [{"selector":"status","search":"hello",filter:[{ "id":"last_name", "type":"SELECT", "selecteds":[ "Kör" ] }]}]
             */
            'group' => 'sometimes|string',

            /**
             * Listedeki alanları filtrelemek için kullanılır.
             * @var string
             * @example [ { "id":"first_name", "type":"SELECT", "selecteds":[ "Ziya", "Feyyaz Can" ] }, { "id":"last_name", "type":"SELECT", "selecteds":[ "Kör" ] }, { "id":"amount", "type":"NUMBER", "min":0, "max":10000 }, { "id":"created_at", "type":"DATE", "min":2012, "max":2022 }, { "id":"global_search", "type":"SEARCH", "value":"Denem", "columns":[ { "id":"first_name", "type":"string" }, { "id":"last_name", "type":"string" }, { "id":"id", "type":"number" } ] } ]
             */
            'filter' => 'sometimes|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'skip.string' => 'Skip değeri bir string olmalıdır.',
            'take.string' => 'Take değeri bir string olmalıdır.',
            'sort.string' => 'Sort değeri bir string olmalıdır.',
            'status.string' => 'Status değeri bir string olmalıdır.',
            'group.string' => 'Group değeri bir string olmalıdır.',
            'filter.string' => 'Filter değeri bir string olmalıdır.',
        ];
    }
}
