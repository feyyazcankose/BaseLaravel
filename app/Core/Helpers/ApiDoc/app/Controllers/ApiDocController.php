<?php

namespace App\Core\Helpers\ApiDoc\app\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;

/**
 * @ignore
 *
 */
class ApiDocController extends Controller
{
    /**
     * @ignoreDefaultRoutes
     *
     */
    public function index(Request $request)
    {
        Artisan::call('scramble:export');
        $jsonContent = Storage::disk('local')->get('api-doc/api.json');
        $swaggerJson = json_decode($jsonContent, true);

        $type = $request->route('type') ?? "dashboard";

        $path = config('apidoc.paths.' . $type);
        $description = config('apidoc.descriptions.' . $type);
        $title = $this->capitalizeFirstLetter($type) . " | " . env("APP_NAME") . " Api Doc";

        if (isset($swaggerJson['openapi'])) {
            $swaggerJson['openapi'] = '3.0.0';
            $swaggerJson["info"] = [
                "title" => $title,
                "description" => $description
            ];
        }

        $jsonData = $path ? $this->filterByPath($swaggerJson, $path) : $swaggerJson;
        return View::file(
            base_path('app/Core/Helpers/ApiDoc/views/stoplight.blade.php'),
            [
                'title' => $title,
                'jsonData' => $jsonData,
                'menuItems' => config('apidoc.menus')
            ]
        );
    }

    /**
     * @ignoreDefaultRoutes
     *
     */
    public function dynamoDoc()
    {
        return View::file(base_path('app/Modules/ApiDoc/views/dynamo-doc.blade.php'));
    }

    private function filterByPath($swaggerJson, $pathKey)
    {
        $filteredPaths = [];
        foreach ($swaggerJson['paths'] as $path => $value) {
            // Eğer path, aranan değeri içeriyorsa ekle
            if (strpos($path, $pathKey) !== false) {
                $filteredPaths[$path] = $value;
            }
        }

        // Mevcut swaggerJson'u güncelleyerek döndür
        $swaggerJson['paths'] = $filteredPaths;
        return $swaggerJson;
    }

    private function capitalizeFirstLetter(?string $type): string
    {
        if ($type) {
            return ucfirst(strtolower($type));
        }
        return '';
    }
}
