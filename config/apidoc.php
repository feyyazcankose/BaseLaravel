<?php

return [
    'paths' => [
        'mobile' => 'api/mobile',
        'dashboard' => 'api/backoffice',
        'cron' => 'api/cron',
        'common' => 'api/common',
    ],
    'descriptions' => [
        'mobile' => 'Mobildeki servisler, kullanıcıların cihazları üzerinden projelere erişimini sağlayan ve mobil uygulama üzerinden görevleri yerine getirebilmesi için gerekli olan servislerin yönetildiği alandır. Bu alan, mobil cihazlardan gelen isteklerin karşılandığı ve mobil kullanıcı deneyiminin optimize edildiği yerdir.',
        'dashboard' => 'Admin panelindeki servisler, proje ve görev yönetiminin merkezi olduğu ve tüm sistemin kontrol edildiği alandır. Adminler, projeleri oluşturur, görevleri tanımlar ve kullanıcıların bu görevleri yerine getirmesi için gerekli olan tüm verileri bu alandan yönetir.',
        'cron' => 'Cron servisleri, belirli zaman aralıklarında otomatik olarak çalıştırılan arka plan görevlerini içeren servislerdir. Bu servisler, sistemin sürekli olarak güncel kalmasını sağlamak ve zamanlanmış görevlerin otomatik olarak yürütülmesi için kullanılır. Örneğin, raporların oluşturulması veya veritabanı optimizasyonu gibi işler bu alanda gerçekleştirilir.',
        'common' => 'Common servisleri, hem admin paneli hem de mobil uygulama için ortak kullanılan hizmetlerin sağlandığı bir alandır. Bu servisler, uygulamanın geneli için geçerli olan ve her iki platformda da kullanılabilen işlevselliklerin yönetimini sağlar, örneğin kullanıcı doğrulama ve yetkilendirme gibi genel servisler bu alanda yer alır.',
    ],
    "menus" => [
        [
            "title" => "Mobile",
            "pathKey" => "mobile",
            "link" => "/api/doc/mobile",
            "icon" => '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M5 9c0-3.3 0-4.95 1.025-5.975S8.7 2 12 2s4.95 0 5.975 1.025S19 5.7 19 9v6c0 3.3 0 4.95-1.025 5.975S15.3 22 12 22s-4.95 0-5.975-1.025S5 18.3 5 15zm6 10h2"/><path d="m9 2l.089.534c.193 1.157.29 1.736.686 2.088C10.19 4.989 10.776 5 12 5s1.81-.01 2.225-.378c.397-.352.493-.93.686-2.088L15 2"/></g></svg>'
        ],
        [
            "title" => "Dashboard",
            "pathKey" => "dashboard",
            "link" => "/api/doc/dashboard",
            "icon" => "<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <g fill='none' stroke='currentColor'>
                    <rect width='18.5' height='18.5' x='2.75' y='2.75' stroke-width='1.5'
                        rx='6' />
                    <path stroke-linecap='round' stroke-width='1.6'
                        d='M7.672 16.222v-5.099m4.451 5.099V7.778m4.205 8.444V9.82' />
                </g>
            </svg>"
        ],
        [
            "title" => "Common",
            "pathKey" => "common",
            "link" => "/api/doc/common",
            "icon" => '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.5 13L7 11.5l5.5 5.5l-1.5 1.5c-.75.75-3.5 2-5.5 0s-.75-4.75 0-5.5M3 21l2.5-2.5m13-7.5L17 12.5L11.5 7L13 5.5c.75-.75 3.5-2 5.5 0s.75 4.75 0 5.5m-6-3l-2 2M21 3l-2.5 2.5m-2.5 6l-2 2"/></svg>'
        ],
    ]
];
