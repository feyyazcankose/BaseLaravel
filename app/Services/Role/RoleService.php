<?php

namespace App\Services\Role;

use App\Repositories\Role\IRoleRepository;
use App\Models\Admin;
use App\Models\Role;
use App\Models\Session;

class RoleService implements IRoleService
{
    protected $roleRepository;

    public function __construct(IRoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function getRolesByAdmin(int $adminId): array
    {
        return $this->roleRepository->getRolesByAdminId($adminId);
    }

    public function listRoles(?string $search): array
    {
        return $this->roleRepository->searchRoles($search);
    }

    public function updateAdminRoles(int $adminId, array $roles): bool
    {
        $admin = Admin::with('roles')->findOrFail($adminId);
        $newRoles = Role::whereIn('name', $roles)->pluck('id')->toArray();
        $admin->roles()->sync($newRoles);

        // Oturumları sonlandır
        Session::where("admin_id", $admin->id)->delete();

        return true;
    }
}
