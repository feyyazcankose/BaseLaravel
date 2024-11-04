<?php

namespace App\Services\Role;

interface IRoleService
{
    public function getRolesByAdmin(int $adminId): array;
    public function listRoles(?string $search): array;
    public function updateAdminRoles(int $adminId, array $roles): bool;
}
