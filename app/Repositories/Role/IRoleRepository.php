<?php

namespace App\Repositories\Role;

interface IRoleRepository
{
    public function getRolesByAdminId(int $adminId): array;
    public function searchRoles(?string $search): array;
}
