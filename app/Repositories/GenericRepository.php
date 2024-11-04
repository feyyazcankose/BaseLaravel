<?php

namespace App\Repositories;

use App\Core\Helpers\Filter\FilterService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class GenericRepository implements IGenericRepository
{
    protected $model;
    protected $filterService;

    public function __construct(FilterService $filterService)
    {
        $this->filterService = $filterService;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $record = $this->find($id);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return null;
    }

    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }

    public function paginate(Request $options)
    {
        if (!empty($options['group'])) {
            return $this->filterService->getGroups($options, $this->model);
        }

        $query = $this->filterService->getWhereFilter($options, $this->model);
        $totalCount = $query->count();
        $items = $query
            ->take($this->filterService->take)
            ->skip(($this->filterService->skip - 1) * $this->filterService->take)
            ->get();

        return [
            'items' => $items,
            "meta" => [
                'totalItems' => $totalCount,
                'itemCount' => $items->count(),
                'itemsPerPage' => (int) $this->filterService->take,
                'totalPages' => ceil($totalCount / (int) $this->filterService->take),
                'currentPage' => (int) $this->filterService->skip,
            ]
        ];
    }

    public function setModel(Model $model)
    {
        $this->model = $model;
    }
}
