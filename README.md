# Bağımlılık Enjeksiyonu (DI) Prensibi

Bağımlılık Enjeksiyonu (Dependency Injection), kodunuzu daha modüler ve sürdürülebilir hale getiren bir tasarım prensibidir. Bu prensip, bir sınıfın ihtiyaç duyduğu bağımlılıkları (diğer sınıflar/nesneler) doğrudan yaratmak yerine, dışarıdan "enjeksiyon" yöntemiyle almasını sağlar.

# Temel Fikirler:

## Soyutlama (Abstraction):

Sınıflar, somut (belirli) nesnelere değil, soyutlamalara (örneğin arayüzlere) bağlı olmalıdır.
Bu sayede kodun esnekliği artar ve ihtiyaç halinde kolayca farklı işlevler eklenebilir.

## Low Level (Düşük Seviye) ve High Level (Yüksek Seviye):

Düşük seviyeli bileşenler, veritabanı gibi sistemle doğrudan etkileşimde bulunan parçalardır.
Yüksek seviyeli bileşenler ise, iş mantığı ile ilgilenirler. Bu bileşenler, düşük seviyelilere bağlı olabilirler ama doğrudan bağlı olmamalıdır. Soyutlama ile bu bağımlılığı hafifletiriz.

## Bağımlılık Enjeksiyonu Yöntemleri (DI Patterns)

Bağımlılık enjeksiyonunu kullanarak sınıfınıza dışarıdan hangi bağımlılıkların geleceğini belirlemenin birkaç yöntemi vardır:

## Constructor Injection (Yapıcı Metot Enjeksiyonu):

Sınıfa ihtiyacı olan bağımlılıklar, yapıcı metot aracılığıyla verilir. En yaygın kullanılan yöntemdir.

## Method Injection (Metot Enjeksiyonu):

Bir sınıf, bağımlılıklarını belirli bir metot aracılığıyla alır.

## Property Injection (Özellik Enjeksiyonu):

Bağımlılıklar sınıfın özellikleri olarak atanır.
