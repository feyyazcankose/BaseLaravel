<?php

namespace App\Core\Helpers\Filter;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class FilterService extends Controller
{
    public $softDelete = false;
    public $skip = 1;
    public $take = 10;

    public function getGroups(Request $request, $model)
    {
        $group = json_decode($request->group, true);

        if (empty($group)) {
            return response()->json([
                'items' => [],
                'totalCount' => 0
            ]);
        }

        // Extract the selector and determine if it is a relationship field
        $selector = $group[0]['selector'];
        $isRelationship = strpos($selector, '.') !== false;

        if ($isRelationship) {
            list($relation, $field) = explode('.', $selector);
        } else {
            $field = $selector;
        }

        // Build the initial query
        if (isset($group[0]['filter'])) {
            $query = $this->setFilter(json_encode($group[0]['filter']), $model);
        } else {
            $query = $model::query();
        }

        // Apply relationship logic if necessary
        if ($isRelationship) {
            $query->with($relation);
        }

        // Add search filter if present
        if (@$group[0]['search']) {
            if ($isRelationship) {
                $query->whereHas($relation, function ($q) use ($field, $group) {
                    $q->whereLike($field, 'like', '%' . $group[0]['search'] . '%');
                });
            } else {
                $query->where($field, 'like', '%' . $group[0]['search'] . '%');
            }
        }

        // Apply pagination if necessary
        if ($request->has('skip') && $request->has('take')) {
            $query->skip(($this->skip - 1) * $this->take)
                ->take($this->take);
        }

        if ($this->softDelete ?? true) {
            $query->where('deleted_at', null);
        }

        $items = $query->get();
        $totalCount = $model::count();

        if ($isRelationship) {
            $uniques = $this->getUniqueValues($items->pluck($relation . '.' . $field), $field);
        } else {
            $uniques = $this->getUniqueValues($items->pluck($field), $field);
        }

        $data = array_map(function ($item) {
            return ['key' => $item];
        }, $uniques);

        return [
            'data' => $data,
            'totalCount' => $totalCount
        ];
    }

    private function getUniqueValues($items, $field)
    {
        return $items->unique()->values()->all();
    }

    public function setFilter($filter, $query = null)
    {
        $items = json_decode($filter ?? '[]', true);
        foreach ($items as $item) {
            $query = $query->where(function (Builder $filterQuery) use ($item) {
                switch ($item['type']) {
                    case 'SEARCH':
                        foreach ($item['columns'] as $key => $column) {
                            $isRelationship = strpos($column['id'], '.') !== false;
                            if ($isRelationship) {
                                list($relation, $field) = explode('.', $column['id']);
                            } else {
                                $field = $column['id'];
                            }

                            if ($key === 0) {
                                if ($isRelationship) {
                                    $filterQuery->whereHas($relation, function ($query) use ($field, $item) {
                                        $query->where($field, 'LIKE', '%' . $item['value'] . '%');
                                    });
                                } else {
                                    $filterQuery->where($field, 'LIKE', '%' . $item['value'] . '%');
                                }
                            } else {
                                if ($isRelationship) {
                                    $filterQuery->orWhereHas($relation, function ($query) use ($field, $item) {
                                        $query->where($field, 'LIKE', '%' . $item['value'] . '%');
                                    });
                                } else {
                                    $filterQuery->orWhere($field, 'LIKE', '%' . $item['value'] . '%');
                                }
                            }
                        }
                        break;
                    case 'SELECT':
                        foreach ($item['selecteds'] as $key => $select) {
                            $isRelationship = strpos($item['id'], '.') !== false;
                            if ($isRelationship) {
                                list($relation, $field) = explode('.', $item['id']);
                            } else {
                                $field = $item['id'];
                            }

                            if ($key === 0) {
                                if ($isRelationship) {
                                    $filterQuery->whereHas($relation, function ($query) use ($field, $select) {
                                        $query->where($field, '=', $select);
                                    });
                                } else {
                                    $filterQuery->where($field, '=', $select);
                                }
                            } else {
                                if ($isRelationship) {
                                    $filterQuery->orWhereHas($relation, function ($query) use ($field, $select) {
                                        $query->where($field, '=', $select);
                                    });
                                } else {
                                    $filterQuery->orWhere($field, '=', $select);
                                }
                            }
                        }
                        break;
                    case 'NUMBER':
                        $isRelationship = strpos($item['id'], '.') !== false;
                        if ($isRelationship) {
                            list($relation, $field) = explode('.', $item['id']);
                        } else {
                            $field = $item['id'];
                        }

                        if ($isRelationship) {
                            $filterQuery->whereHas($relation, function ($query) use ($field, $item) {
                                $query->whereBetween($field, [
                                    @$item['min'] ?? 0,
                                    @$item['max'] ?? 0
                                ]);
                            });
                        } else {
                            $filterQuery->whereBetween($field, [
                                @$item['min'] ?? 0,
                                @$item['max'] ?? 0
                            ]);
                        }
                        break;
                    case 'DATE':
                        $isRelationship = strpos($item['id'], '.') !== false;
                        if ($isRelationship) {
                            list($relation, $field) = explode('.', $item['id']);
                        } else {
                            $field = $item['id'];
                        }

                        if ($isRelationship) {
                            $filterQuery->whereHas($relation, function ($query) use ($field, $item) {
                                $query->whereBetween($field, [
                                    @$item['min'] ? new \DateTime($item['min']) : new \DateTime(),
                                    @$item['max'] ? new \DateTime($item['max']) : new \DateTime()
                                ]);
                            });
                        } else {
                            $filterQuery->whereBetween($field, [
                                @$item['min'] ? new \DateTime($item['min']) : new \DateTime(),
                                @$item['max'] ? new \DateTime($item['max']) : new \DateTime()
                            ]);
                        }
                        break;
                    default:
                        break;
                }
            });
        }

        return $query;
    }


    // Get where items
    public function getWhereFilter($options, $query = null)
    {
        return $this->getOrderBy($options, $this->setFilter(@$options["filter"], $query));
    }

    // Get selector object
    public function selector($selector, $value, $type = 'where', $mode = null)
    {
        if ($type === 'select') {
            return [$selector];
        } elseif ($type === 'where') {
            return $mode ? [$selector, 'LIKE', '%' . $value . '%'] : [$selector, '=', $value];
        } elseif ($type === 'order') {
            return [$selector, $value === 'asc' ? 'asc' : 'desc'];
        }
    }

    // Get selector in value
    public function getValueBySelector($object, $selector)
    {
        $selectors = explode('.', $selector);
        $value = $object;
        foreach ($selectors as $prop) {
            if (!isset($value->$prop)) {
                return null;
            }
            $value = $value->$prop;
        }
        return $value;
    }

    //Get order by
    private function getOrderBy($options, $query)
    {
        $orderBy = [];
        try {
            $sortSplit = explode(',', @$options['sort']);
            $orderBy = $this->selector($sortSplit[0], $sortSplit[1], 'order');
        } catch (\Exception $e) {
            $orderBy = ['created_at', 'DESC'];
        }

        return  $query->orderBy(...$orderBy);
    }
}
