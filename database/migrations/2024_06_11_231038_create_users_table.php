<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    protected $defaultImage;

    public function __construct()
    {
        $this->defaultImage = env("APP_URL") . "/media/users/empty-profile.jpg";
    }

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_code')->unique();
            $table->string('email')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone')->unique();
            $table->string('phone_code')->nullable();
            $table->date('birthdate')->nullable();
            $table->enum('gender', ['male',    'female',    'not_specified'])->nullable();
            $table->string('image')->default($this->defaultImage)->nullable();
            $table->string('referance_code')->nullable();
            $table->boolean('is_blocked')->default(false);
            $table->boolean('is_phone_verify')->default(false);
            $table->boolean('is_notification')->default(false);
            $table->boolean('is_email_verify')->default(false);
            $table->float('amount')->default(0);
            $table->float('point')->default(0);

            $table->foreignId('country_id')->nullable()->constrained('countries')->onDelete('cascade');
            $table->foreignId('city_id')->nullable()->constrained('cities')->onDelete('cascade');
            $table->foreignId('town_id')->nullable()->constrained('towns')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
