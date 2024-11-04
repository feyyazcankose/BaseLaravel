<?php

namespace App\Exports;

use App\Enums\QuestionTypes;
use App\ValueObjects\AnswerValueObject;
use App\ValueObjects\ProjectValueObject;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;


class CustomSheetExport implements FromArray, WithTitle, ShouldAutoSize, WithStyles
{
    protected $title;
    protected $data;

    public function __construct(string $title, array $data)
    {
        $this->title = $title;
        $this->data = $data;
    }

    public function array(): array
    {
        return $this->data;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function styles(Worksheet $sheet)
    {
        // Satır ve sütunları dolaşarak stil uygulaması için bir döngü
        foreach ($this->data as $rowIndex => $row) {
            foreach ($row as $colIndex => $cellValue) {
                // Eğer hücrede "*" karakteri varsa
                if (strpos($cellValue, '∙') !== false) {
                    // Hücre koordinatını belirleyin (Excel'de 1 bazlı indeks, PHP'de 0 bazlı indeks)
                    $cellCoordinate = $sheet->getCellByColumnAndRow($colIndex + 1, $rowIndex + 1)->getCoordinate();

                    // Hücre stilini ayarlayın
                    $sheet->getStyle($cellCoordinate)->applyFromArray([
                        'font' => [
                            'bold' => true,
                            'color' => ['rgb' => '000000'], // Siyah renk
                        ],
                        'fill' => [
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => [
                                'rgb' => 'cfd9ec', // Açık yeşil arka plan rengi
                            ],
                        ],
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['rgb' => 'A9C3D3'], // Açık mavi kenarlık
                            ],
                        ],
                        'alignment' => [
                            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT, // Sola hizalı
                        ],
                    ]);
                }

                // Telefon numarası olan sütunları tespit et ve özel format uygula
                if ($colIndex == 2) { // Telefon numarası olan sütunları tespit et (3. sütun)
                    $cellCoordinate = $sheet->getCellByColumnAndRow($colIndex + 1, $rowIndex + 1)->getCoordinate();

                    // Özel format ayarla: Sayıları tam olarak göster
                    $sheet->getStyle($cellCoordinate)->getNumberFormat()->setFormatCode('0');
                }
            }
        }

        return [];
    }
}
