<?php

namespace App\Http\Controllers\Backoffice;

use App\Core\Helpers\Filter\FilterTableMetaResource;
use App\Core\Helpers\Filter\FilterTableRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\AdminRequest;
use App\Http\Requests\Backoffice\AdminUpdateRequest;
use App\Http\Resources\Backoffice\AdminResource;
use App\Services\Admin\IAdminService;

/**
 * @tags Dashboard > Admin
 */
class AdminController extends Controller
{
    protected $adminService;

    public function __construct(IAdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    /**
     * List all Admins with pagination
     *
     * Bu servis yönetici listelemek için kullanılmaktadır. Sayfalanabilir bir şekilde listeler.
     */
    public function index(FilterTableRequest $request)
    {
        $result = $this->adminService->paginate($request);
        return [
            "items" => AdminResource::collection($result['items']),
            "meta" => new FilterTableMetaResource($result["meta"])
        ];
    }

    /**
     * Get a single Admin by ID
     *
     * Bu servis, belirli bir yönetici kaydını getirir.
     */
    public function show(int $id)
    {
        $admin = $this->adminService->get($id);

        if (!$admin) {
            return response()->json(['message' => 'Yönetici bulunamadı'], 404);
        }

        return new AdminResource($admin);
    }

    /**
     * Create a new Admin
     *
     * Bu servis, yeni bir yönetici oluşturur.
     */
    public function store(AdminRequest $request)
    {
        $admin = $this->adminService->create($request->all());

        return response()->json([
            'message' => 'Yönetici oluşturuldu.',
            'admin' => new AdminResource($admin)
        ], 201);
    }

    /**
     * Update an existing Admin
     *
     * Bu servis, mevcut bir yönetici kaydını günceller.
     */
    public function update(AdminUpdateRequest $request, int $id)
    {
        $admin = $this->adminService->update($id, $request->all());

        if (!$admin) {
            return response()->json(['message' => 'Yönetici bulunamadı'], 422);
        }

        return response()->json(['message' => 'Yönetici güncellendi.']);
    }

    /**
     * Delete an Admin
     *
     * Bu servis, yönetici kaydını siler.
     */
    public function destroy(int $id)
    {
        $deleted = $this->adminService->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Yönetici bulunamadı'], 404);
        }

        return response()->json(['message' => 'Yönetici silindi.']);
    }
}
