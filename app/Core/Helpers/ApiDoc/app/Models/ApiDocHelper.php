<?php

namespace App\Core\Helpers\ApiDoc\app\Models;


class ApiDocHelper
{
    static function getEnumValue($enumCases, string $cases = null)
    {
        try {
            if (!$cases) {
                return array_map(fn($case) => $case->value, $enumCases);
            }

            foreach ($enumCases as $case) {
                if ($case->name === $cases) {
                    return $case->value;
                }
            }

            return null;
        } catch (\Throwable $th) {
            return null;
        }
    }
}
