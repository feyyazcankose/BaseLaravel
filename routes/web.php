<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    try {
        return file_get_contents(public_path('index.html'));
    } catch (\Throwable $th) {
        return "index.html bulunamdı";
    }
})->where('any', '^(?!.*\.(json|png|jpg)$).*$');
