<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\AdminRoleUpdateRequest;
use App\Http\Requests\Backoffice\RoleIndexRequest;
use App\Services\Role\IRoleService;
use Illuminate\Http\Request;

/**
 * @tags Dashboard > Role
 */
class RoleController extends Controller
{
    protected $roleService;

    public function __construct(IRoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    /**
     * Get Role
     *
     * Bu servis yöneticinin rollerini getirmesini sağlar
     */
    public function show(Request $request)
    {
        $adminId = intval($request->id ?? 0);
        return response()->json($this->roleService->getRolesByAdmin($adminId));
    }

    /**
     * List Role
     *
     * Bu servis rolleri listelemek için kullanılmaktadır. Tüm rolleri getirir.
     */
    public function index(RoleIndexRequest $request)
    {
        $search = $request->search;
        return response()->json($this->roleService->listRoles($search));
    }

    /**
     * Update Role
     *
     * Bu servis yöneticilerin rollerinin düzenlenmesini sağlar.
     */
    public function update(AdminRoleUpdateRequest $request)
    {
        $adminId = intval($request->id ?? 0);
        $roles = $request->roles ?? [];

        $this->roleService->updateAdminRoles($adminId, $roles);

        return response()->json(['status' => 'success'], 200);
    }
}
