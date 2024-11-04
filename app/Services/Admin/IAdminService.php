<?php

namespace App\Services\Admin;

use App\Core\Helpers\Filter\FilterTableRequest;

interface IAdminService
{
    public function list();
    public function get(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function paginate(FilterTableRequest $options);
}
