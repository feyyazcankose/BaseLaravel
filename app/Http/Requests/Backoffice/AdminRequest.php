<?php

namespace App\Http\Requests\Backoffice;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
{
    /**
     * Kullanıcının bu isteği yapmaya yetkili olup olmadığını belirler.
     *
     * @return bool Kullanıcının yetkili olup olmadığını belirtir.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * İstek için geçerli olan doğrulama kurallarını alır.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string> Doğrulama kurallarının dizisi.
     */
    public function rules(): array
    {
        return [
            /**
             * Yöneticinin adı.
             *
             * @var string
             * @example Ahmet
             */
            'name' => 'required|string|max:255',

            /**
             * Yöneticinin soyadı.
             *
             * @var string
             * @example Yılmaz
             */
            'surname' => 'required|string|max:255',

            /**
             * Yöneticinin telefon numarası, benzersiz olmalıdır.
             *
             * @var string
             * @example 05551234567
             */
            'phone' => 'required|string|max:255|unique:admins,phone',

            /**
             * Yöneticinin telefon kodu (opsiyonel).
             *
             * @var string
             * @example +90
             */
            'phone_code' => 'nullable|string',

            /**
             * Yöneticinin e-posta adresi, benzersiz olmalıdır.
             *
             * @var string
             * @example ahmet.yilmaz@example.com
             */
            'email' => 'required|email|unique:admins,email',

            /**
             * Yöneticinin şifresi, en az 8 karakter olmalı ve doğrulanmalıdır.
             *
             * @var string
             * @example secureP@ssw0rd
             */
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Doğrulama kuralları için hata mesajlarını döner.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Ad alanı zorunludur.',
            'surname.required' => 'Soyadı alanı zorunludur.',
            'phone.required' => 'Telefon numarası zorunludur.',
            'phone.unique' => 'Bu telefon numarası zaten kayıtlı.',
            'email.required' => 'E-posta adresi zorunludur.',
            'email.unique' => 'Bu e-posta adresi zaten kayıtlı.',
            'password.required' => 'Şifre zorunludur.',
            'password.min' => 'Şifre en az 8 karakter olmalıdır.',
            'password.confirmed' => 'Girilen şifreler eşleşmiyor.',
        ];
    }
}
