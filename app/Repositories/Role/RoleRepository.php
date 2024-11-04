<?php

namespace App\Repositories\Role;

use App\Models\Role;
use App\Models\AdminRole;

class RoleRepository implements IRoleRepository
{
    public function getRolesByAdminId(int $adminId): array
    {
        $adminRoles = AdminRole::where("admin_id", $adminId)->with("role")->get();
        return $adminRoles->pluck('role.name')->toArray();
    }

    public function searchRoles(?string $search): array
    {
        return Role::where(function ($query) use ($search) {
            if ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            }
        })
            ->get(["id", "name", "description"])
            ->toArray();
    }
}
