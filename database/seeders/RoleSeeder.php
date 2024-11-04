<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Core\Enums\RoleTypes;

class RoleSeeder extends Seeder
{
    public function run()
    {
        foreach ($this->items() as $item) {
            if (!@Role::where("name", $item["name"])->first()->id) {
                Role::create([
                    'name' => $item["name"],
                    'description' => $item["description"]
                ]);
            }
        }
    }

    private function items()
    {
        return [
            [
                "name" => RoleTypes::SURVEY_VIEW,
                "description" => "Projeleri Görüntüleme"
            ],
            [
                "name" => RoleTypes::SURVEY_CREATE,
                "description" => "Proje Oluşturma"
            ],
            [
                "name" => RoleTypes::SURVEY_DELETE,
                "description" => "Proje Silme"
            ],
            [
                "name" => RoleTypes::SURVEY_UPDATE,
                "description" => "Proje Güncelleme"
            ],

            [
                "name" => RoleTypes::USER_VIEW,
                "description" => "Kullanıcıları Görüntüleme"
            ],
            [
                "name" => RoleTypes::USER_CREATE,
                "description" => "Kullanıcı Oluşturma"
            ],
            [
                "name" => RoleTypes::USER_DELETE,
                "description" => "Kullanıcı Silme"
            ],
            [
                "name" => RoleTypes::USER_UPDATE,
                "description" => "Kullanıcı Güncelleme"
            ],


            [
                "name" => RoleTypes::ADMIN_VIEW,
                "description" => "Yöneticileri Görüntüleme"
            ],
            [
                "name" => RoleTypes::ADMIN_CREATE,
                "description" => "Yönetici Oluşturma"
            ],
            [
                "name" => RoleTypes::ADMIN_DELETE,
                "description" => "Yönetici Silme"
            ],
            [
                "name" => RoleTypes::ADMIN_UPDATE,
                "description" => "Yönetici Güncelleme"
            ],
            [
                "name" => RoleTypes::ADMIN_ROLE,
                "description" => "Yönetici Rol Güncelleme"
            ],


            [
                "name" => RoleTypes::SLIDER_VIEW,
                "description" => "Kayan İçeriklerı Görüntüleme"
            ],
            [
                "name" => RoleTypes::SLIDER_CREATE,
                "description" => "Kayan İçerik Oluşturma"
            ],
            [
                "name" => RoleTypes::SLIDER_DELETE,
                "description" => "Kayan İçerik Silme"
            ],
            [
                "name" => RoleTypes::SLIDER_UPDATE,
                "description" => "Kayan İçerik Güncelleme"
            ],

            [
                "name" => RoleTypes::CATEGORY_VIEW,
                "description" => "Kategori Görüntüleme"
            ],
            [
                "name" => RoleTypes::CATEGORY_CREATE,
                "description" => "Kategori Oluşturma"
            ],
            [
                "name" => RoleTypes::CATEGORY_DELETE,
                "description" => "Kategori Silme"
            ],
            [
                "name" => RoleTypes::CATEGORY_UPDATE,
                "description" => "Kategori Güncelleme"
            ],

        ];
    }
}
