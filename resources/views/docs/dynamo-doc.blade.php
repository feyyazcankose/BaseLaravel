<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamo Tablosu Dökümantasyonu</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>

<body class="bg-gray-50 text-gray-800 p-6">
    <div class="max-w-4xl mx-auto">
        <p class="text-lg font-medium mb-6">
            Bu dökümantasyon, Dynamo tablolarında kullanılabilecek global
            filtre tipleri ve işlemler hakkında bilgi verir. Aşağıda, bu
            filtrelerin nasıl kullanılacağını gösteren çeşitli örnekler
            bulabilirsiniz.
        </p>

        <h2 class="text-2xl font-semibold mb-4 mt-10">
            <a href="#global-filter-operation" class="text-blue-500 hover:underline">Global Filtre Tipleri</a>
        </h2>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Global filtre tipleri, tabloda uygulanabilecek farklı filtreleme
            türlerini belirtir. Aşağıda bu türlerin örneklerini
            bulabilirsiniz.
        </p>
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th class="py-3 px-6 bg-blue-500 text-white text-left text-sm uppercase font-semibold">
                        Örnek
                    </th>
                    <th class="py-3 px-6 bg-blue-500 text-white text-left text-sm uppercase font-semibold">
                        Tür
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-4 px-6">Seçim</td>
                    <td class="py-4 px-6">SELECT</td>
                </tr>
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-4 px-6">Sayı</td>
                    <td class="py-4 px-6">NUMBER</td>
                </tr>
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-4 px-6">Tarih</td>
                    <td class="py-4 px-6">DATE</td>
                </tr>
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-4 px-6">Global Arama</td>
                    <td class="py-4 px-6">SEARCH</td>
                </tr>
            </tbody>
        </table>

        <h2 class="text-2xl font-semibold mb-4 mt-10">
            <a href="#global-filter-operation" class="text-blue-500 hover:underline">Global Filtre İşlemleri</a>
        </h2>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Global filtre işlemleri, belirli bir filtre tipinin nasıl
            uygulanacağını tanımlar. Aşağıda bu işlemlerle ilgili örnekler
            bulabilirsiniz.
        </p>
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th class="py-3 px-6 bg-blue-500 text-white text-left text-sm uppercase font-semibold">
                        Örnek
                    </th>
                    <th class="py-3 px-6 bg-blue-500 text-white text-left text-sm uppercase font-semibold">
                        Tür
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-4 px-6">Eşit</td>
                    <td class="py-4 px-6">EQUAL</td>
                </tr>
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-4 px-6">Eşit Değil</td>
                    <td class="py-4 px-6">NOT_EQUAL</td>
                </tr>
            </tbody>
        </table>

        <p class="mt-8 text-lg font-semibold">Global arama filtre örneği</p>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Bu örnek, belirli kolonlarda arama yaparak sonuçları
            filtrelemeyi gösterir.
        </p>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
<code class="language-json">
{
   "id": "global_search",
   "type": "SEARCH",
   "value": "Denem",
   "columns": [
      {
         "id": "first_name",
         "type": "string"
      },
      {
         "id": "last_name",
         "type": "string"
      },
      {
         "id": "id",
         "type": "number"
      }
   ]
}
</code>
</pre>

        <p class="mt-8 text-lg font-semibold">
            Global seçim filtre örneği (eşit değil)
        </p>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Bu örnek, belirli ID'lere eşit olmayan değerleri filtrelemeyi
            gösterir.
        </p>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
<code class="language-json">
{
   "id": "id",
   "type": "SELECT",
   "operation": "NOT_EQUAL",
   "selecteds": [
      1,
      2,
      3
   ]
}
</code>
</pre>

        <p class="mt-8 text-lg font-semibold">Global seçim filtre örneği</p>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Bu örnek, belirli isimlere eşit olan değerleri filtrelemeyi
            gösterir.
        </p>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
<code class="language-json">
{
   "id": "first_name",
   "type": "SELECT",
   "selecteds": [
      "KonutKonfor",
      "Feyyaz Can"
   ]
},
{
   "id": "last_name",
   "type": "SELECT",
   "selecteds": [
      "Kör"
   ]
}
</code>
</pre>

        <p class="mt-8 text-lg font-semibold">Global sayı filtre örneği</p>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Bu örnek, belirli bir aralıktaki sayısal değerleri filtrelemeyi
            gösterir.
        </p>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
<code class="language-json">
{
   "id": "amount",
   "type": "NUMBER",
   "min": 0,
   "max": 10000
}
</code>
</pre>

        <p class="mt-8 text-lg font-semibold">Global tarih filtre örneği</p>
        <p class="mb-4 text-gray-600 dark:text-gray-300">
            Bu örnek, belirli bir aralıktaki tarihleri filtrelemeyi
            gösterir.
        </p>
        <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
<code class="language-json">
{
   "id": "created_at",
   "type": "DATE",
   "min": 2012,
   "max": 2022
}
</code>
</pre>

        <p class="text-center mt-10 text-sm text-gray-500">
            Powered by Feyyaz Can Köse
        </p>
    </div>
</body>

</html>
