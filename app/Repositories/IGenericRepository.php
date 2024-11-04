<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

interface IGenericRepository
{
    public function all();
    public function find(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function paginate(Request $options);
}
