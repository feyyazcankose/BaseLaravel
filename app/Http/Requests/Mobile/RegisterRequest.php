<?php

namespace App\Http\Requests\Mobile;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
             * Bu alan kullanıcı e-postasıdır.
             * @var string
             * @example kesemenere123@gmail.com
             */
            'email' => [
                'required',
                'string',
                'email',
                function ($attribute, $value, $fail) {
                    if (User::where('email', $value)->where('deleted_at', null)->exists()) {
                        $fail('E-posta adresi veya telefon numaranız kullanımda');
                    }
                },
            ],
            /**
             * Bu alan kullanıcı telefonudur.
             * @var string
             * @example 905419322605
             */
            'phone' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (User::where('phone', $value)->where('deleted_at', null)->exists()) {
                        $fail('E-posta adresi veya telefon numaranız kullanımda');
                    }
                },
            ],
            /**
             * Bu alan kullanıcı telefon kodudur.
             * @var string
             * @example +90
             */
            'phone_code' => [
                'required',
                'string',
            ],

            /**
             * Bu alan kullanıcının adıdır.
             * @var string
             * @example John
             */
            'first_name' => [
                'required',
                'string',
            ],

            /**
             * Bu alan kullanıcının adıdır.
             * @var string
             * @example John
             */
            'referance_code' => [
                'nullable',
                'string',
                'exists:users,user_code',
            ],

            /**
             * Bu alan kullanıcının soyadıdır.
             * @var string
             * @example Doe
             */
            'last_name' => [
                'required',
                'string',
            ],

            /**
             * Bu alan kullanıcının cinsiyetidir.
             * @var string
             * @example male
             */
            'gender' => [
                'nullable',
                'in:male,female,not_specified',
            ],
            /**
             * Bu alan kullanıcının doğum tarihidir.
             * @var string
             * @example 1999-12-31
             */
            'birthdate' => [
                'nullable',
                'date',
            ],
            /**
             * Bu alan kullanıcının ülke ID'sidir.
             * @var integer
             * @example 1
             */
            'country_id' => [
                'nullable',
                'integer',
                'exists:countries,id',
            ],
            /**
             * Bu alan kullanıcının şehir ID'sidir.
             * @var integer
             * @example 34
             */
            'city_id' => [
                'nullable',
                'integer',
                'exists:cities,id',
            ],
            /**
             * Bu alan kullanıcının ilçe ID'sidir.
             * @var integer
             * @example 10
             */
            'town_id' => [
                'nullable',
                'integer',
                'exists:towns,id',
            ],
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
            'email.required' => 'E-posta adresi gereklidir.',
            'email.string' => 'E-posta adresi metin olmalıdır.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'phone.required' => 'Telefon numarası gereklidir.',
            'phone.string' => 'Telefon numarası metin olmalıdır.',
            'phone_code.required' => 'Telefon kodu gereklidir.',
            'first_name.required' => 'Ad gereklidir.',
            'first_name.string' => 'Ad metin olmalıdır.',
            'last_name.required' => 'Soyad gereklidir.',
            'last_name.string' => 'Soyad metin olmalıdır.',
            'gender.in' => 'Cinsiyet değeri geçerli değil.',
            'birthdate.date' => 'Doğum tarihi geçerli bir tarih olmalıdır.',
            'country_id.exists' => 'Seçilen ülke bulunamadı.',
            'city_id.exists' => 'Seçilen şehir bulunamadı.',
            'town_id.exists' => 'Seçilen ilçe bulunamadı.',
        ];
    }
}
