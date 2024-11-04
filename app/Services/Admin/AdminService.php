<?php

namespace App\Services\Admin;

use App\Core\Helpers\Filter\FilterTableRequest;
use App\Models\Admin;
use App\Repositories\GenericRepository;
use Illuminate\Support\Facades\Hash;

class AdminService implements IAdminService
{
    protected $adminRepository;

    public function __construct(GenericRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
        $this->adminRepository->setModel(new Admin);
    }

    public function list()
    {
        return $this->adminRepository->all();
    }

    public function get(int $id)
    {
        return $this->adminRepository->find($id);
    }

    public function create(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return $this->adminRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        return $this->adminRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->adminRepository->delete($id);
    }

    public function paginate(FilterTableRequest $options)
    {
        return $this->adminRepository->paginate($options);
    }
}
