<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>{{ @$title ?? 'SocailUp Api Doc' }}</title>
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    <link rel="stylesheet" href={{ url('/api/doc/assets/stoplight.min.css') }} />
    @if (count(@$menuItems ?? []))
        <link rel="stylesheet" href="/api/doc/assets/header.css" />
    @endif
    <script src="/api/doc/assets/script.js"></script>
</head>

<body style="height: 100vh">
    <div id='loader' class='loader'></div>
    @if (count(@$menuItems ?? []))
        <div class='root'>
            <!-- Navbar -->
            <nav class='navbar'>
                <ul class='navbar__menu'>
                    @foreach ($menuItems as $menuItem)
                        <li class='navbar__item' data-key="{{ $menuItem['pathKey'] }}">
                            <a href='{{ $menuItem['link'] }}' class='navbar__link'>
                                {!! $menuItem['icon'] !!}
                                <span>{{ $menuItem['title'] }}</span></a>
                        </li>
                    @endforeach

                </ul>
            </nav>
            <!-- Main -->
            <main id='main' class='flexbox-col'>
                <div id='docContainer' style='height: 100vh !important; display: none'></div>
            </main>
        </div>
    @else
        <div id='docContainer' style='height: 100vh !important; display: none'></div>
    @endif

    <script>
        const data = @json($jsonData);
        setup(data);
    </script>
</body>

</html>
